require('dotenv').config()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()

const port = 3000
const mongoUri = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST_NODE_01},${process.env.MONGO_DB_HOST_NODE_02},${process.env.MONGO_DB_HOST_NODE_03}/${process.env.MONGO_DB_NAME}?ssl=${process.env.MONGO_DB_SSL}&replicaSet=${process.env.MONGO_DB_REPLICA_SET}&authSource=${process.env.MONGO_DB_AUTH_SOURCE}`

const functions = {
  formatCurrency: currency => {
    let formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    // Contornando o problema do separador decimal não ser exibido corretamente
    return (
      formatter
        .format(currency)
        .replace(/\./g, '#')
        .replace(/,/g, '.')
        .replace(/#/g, ',')
    )
  },
  sum: (collection, fn) => collection.reduce((acc, val) => acc + fn(val), 0)
}

const render = (response, view, data={}) => {
  response.render(view, Object.assign(data, { functions }))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  render(res, 'home')
})

app.get('/calculadora', (req, res) => {
  const calculoJuros = (p, i, n) => p * Math.pow(1 + i, n)

  const resultado = { calculado: false } 

  let { valorInicial, taxa, tempo } = req.query

  if (valorInicial && taxa && tempo) {
    valorInicial = parseFloat(valorInicial)
    taxa = parseFloat(taxa)/100
    tempo = parseInt(tempo)

    const meses = Array.from(new Array(tempo), (tempo, i) => i)

    resultado.totais = meses.map(mes => ({ 
      mes: mes + 1,
      valor: calculoJuros(valorInicial, taxa, mes + 1)
    }))

    resultado.calculado = true
  }
  render(res, 'calculadora', { resultado })
})

const findAll = (db, collectionName) => {
  const collection = db.collection(collectionName)
  const cursor = collection.find({})
  const documents = []
  return new Promise((resolve, reject) => {
    cursor.forEach(
      doc => documents.push(doc),
      () => resolve(documents)
    )
  })
}

const insert = (db, collectionName, doc) => {
  const collection = db.collection(collectionName)
  return new Promise((resolve, reject) => {
    collection.insert(doc, (err, res) => err ? reject(err) : resolve(res))
  })
}

app.get('/operacoes', async (req, res) => {
  const operacoes = await findAll(app.db, 'operacoes')
  render(res, 'operacoes', { titulo: 'Todas', operacoes, functions })
})

app.get('/operacoes-entrada', async (req, res) => {
  const todasOperacoes = await findAll(app.db, 'operacoes')
  const operacoes = todasOperacoes.filter(o => o.valor >= 0)
  render(res, 'operacoes', { titulo: 'Entradas', operacoes, functions })
})

app.get('/operacoes-saida', async (req, res) => {
  const todasOperacoes = await findAll(app.db, 'operacoes')
  const operacoes = todasOperacoes.filter(o => o.valor < 0)
  render(res, 'operacoes', { titulo: 'Saídas', operacoes, functions })
})

app.get('/nova-operacao', (req, res) => {
  render(res, 'nova-operacao')
})

app.post('/nova-operacao', async (req, res) => {
  const descricao = req.body.descricao,
        valor     = parseFloat(req.body.valor)
  const operacao = { descricao, valor }
  
  try {
    const result = await insert(app.db, 'operacoes', operacao)
    console.log(result)
    res.redirect('/operacoes')
  } catch (ex) {
    console.error(ex)
    res.redirect('/')
  }
})

MongoClient.connect(mongoUri, (err, db) => {
  if (err) {
    console.error(err)
  } else {
    app.db = db 
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}...`))
  }
})