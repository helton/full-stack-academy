/*
 * [Exercício 5 - extra]
 *
 * Dado a lista de arquivos/diretórios retornada no exercício anterior,
 * mostre quais são arquivos.
 * (utilize fs.stat(caminho, (err, stat) => stat.isFile()) para isso.)
 */

const fs = require('fs')

const readdirPromise = (path) => new Promise((resolve, reject) =>
  fs.readdir(path, (err, files) =>
    err ? reject(err) : resolve(files)
  )
)

const readFileStats = (path) => new Promise((resolve, reject) =>
  fs.stat(path, (err, stats) =>
    err ? reject(err) : resolve({ path, isFile: stats.isFile() })
  )
)

const showFilesOnly = async (path) => {
  const paths = await readdirPromise(path)
  const stats = await Promise.all(paths.map(readFileStats))
  const filesOnly = stats.filter(stat => stat.isFile)
  console.log(filesOnly);
}

showFilesOnly('./')
