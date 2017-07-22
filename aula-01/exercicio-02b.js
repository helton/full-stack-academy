/*
 * [Exercício 2]
 *
 * Dado o seguinte vetor e utilizando somente map, reduce e filter.
 *
 * 2b) Gere um novo vetor somente com o id do produto e o sub-total (preco x qtd)
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

// 2b) Gere um novo vetor somente com o id do produto e o sub-total (preco x qtd)
const idComSubtotal = produtos.map(produto => ({
  id: produto.id,
  subTotal: produto.preco * produto.qtd
}))

console.log(idComSubtotal);
