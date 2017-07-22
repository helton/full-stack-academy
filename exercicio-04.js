/*
 * [Exercício 4]
 *
 * Construa uma função async que utiliza a função readdirPromise com await e
 * escreva no console a lista de arquivos/diretórios retornados.
 */

const fs = require('fs')

const readdirPromise = (path) => new Promise((resolve, reject) =>
  fs.readdir(path, (err, files) =>
    err ? reject(err) : resolve(files)
  )
)

const readdirAsync = async (path) => {
  const files = await readdirPromise(path)
  console.log(files);
}

readdirAsync('./')
