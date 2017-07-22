/*
 * [Exercício 2]
 *
 * Dado o seguinte vetor e utilizando somente map, reduce e filter.
 *
 * 2a) Gere um novo vetor com a lista de produtos cuja a quantidade seja maior que 0
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

// 2a) Gere um novo vetor com a lista de produtos cuja a quantidade seja maior que 0
const maiorQueZero = produtos.filter(produto => produto.qtd > 0)

console.log(maiorQueZero);
