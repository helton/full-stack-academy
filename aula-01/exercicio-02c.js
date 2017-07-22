/*
 * [Exercício 2]
 *
 * Dado o seguinte vetor e utilizando somente map, reduce e filter.
 *
 * 2c) Gere o somatório dos sub-totais
 */

const produtos = [
  {
    id: 1,
    preco: 10.0,
    qtd: 2
  },
  {
    id: 2,
    preco: 10.0,
    qtd: 2
  },
  {
    id: 3,
    preco: 10.0,
    qtd: 2
  },
  {
    id: 4,
    preco: 10.0,
    qtd: 0
  }
]

// 2c) Gere o somatório dos sub-totais
const soma =
  produtos.map(produto => ({
    id: produto.id,
    subTotal: produto.preco * produto.qtd
  }))
  .map(produto => produto.subTotal)
  .reduce((acumulado, valor) => acumulado + valor, 0)

console.log(soma);
