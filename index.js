const express = require('express')
const axios = require('axios')
const app = express()

const PORT = 5000
const ROOT_URL = 'https://ethermine.org/api/miner_new'
const WALLET = 'be6Ab449bBa5E9e8E5A81d76D860EFcB4Acaa10F'
const FETCH_URL = `${ROOT_URL}/${WALLET}`

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/favicon.ico', (req, res) => res.sendStatus(200))

app.get('/', (req, res) => {
  console.log('request..');
  console.log('fetch', FETCH_URL);
  return axios.get(FETCH_URL)
    .then((response) => {
      const data = response.data
      console.log('data', data);
      res.send(data)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.listen(PORT)
