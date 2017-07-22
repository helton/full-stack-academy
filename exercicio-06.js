/*
 * [Exercício 6]

 * Utilizando o ExpressJS, crie uma rota que some 2 números enviados como
 * parâmetros na URL. Exemplo, ao executar no navegador:
 * http://localhost:3000/somar?num1=10&num2=30
 * deverá ser retornado na tela A soma é: 40.
 */

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  if (req.query && req.query.num1 && req.query.num2) {
    const soma = parseInt(req.query.num1) + parseInt(req.query.num2)
    res.send(`A soma é: ${soma}`)
  }
  res.end()
})

app.listen(port, () => console.log(
  `Servidor rodando na porta ${port}. Abra http://localhost:3000/?num10=1&num2=30 no seu navegador`
))
