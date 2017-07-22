/*
 * [Exercício 1]
 *
 * Dado o seguinte vetor e utilizando somente map e reduce,
 * somar todos os valores de produtos e utilize o console.log para ver o valor na tela.
 */

const produtos = [
  {
    nome: 'Bicicleta',
    preco: 1200.0
  },
  {
    nome: 'Capacete',
    preco: 450.0
  }
]

console.log(
  produtos
    .map(produto => produto.preco)
    .reduce((acumulado, valor) => acumulado + valor, 0)
);
