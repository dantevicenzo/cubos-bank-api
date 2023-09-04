const { obterContaPeloNumero, registrarDeposito, registrarSaque, registrarTransferencia } = require("../servico")

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body

    registrarDeposito(numero_conta, valor)

    return res.status(204).send()
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    let conta = obterContaPeloNumero(Number(numero_conta))

    conta.saldo -= Number(valor)

    registrarSaque(numero_conta, valor)

    return res.status(204).send()
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    let contaOrigem = obterContaPeloNumero(Number(numero_conta_origem))
    let contaDestino = obterContaPeloNumero(Number(numero_conta_destino))

    contaOrigem.saldo -= Number(valor)
    contaDestino.saldo += Number(valor)

    registrarTransferencia(numero_conta_origem, numero_conta_destino, valor)

    return res.status(204).send()
}

module.exports = {
    depositar,
    sacar,
    transferir
}