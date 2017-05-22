const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const PORT = 5000
const ROOT_URL = 'https://ethermine.org/api/miner_new'

app.use(cors())
app.get('/favicon.ico', (req, res) => res.sendStatus(200))

app.get('/:wallet', (req, res) => {
  const wallet = req.params.wallet
  const url = `${ROOT_URL}/${wallet}`

  return axios.get(url)
    .then((response) => {
      const data = response.data
      res.send(data)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.listen(PORT)
