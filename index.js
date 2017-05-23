const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const PORT = 5000
const ROOT_URL = 'https://ethermine.org/api/miner_new'

app.use(cors())
app.get('/favicon.ico', (req, res) => res.sendStatus(200))

const formatPayload = (payload) => {
  const avgHashrate = payload.avgHashrate
  const megaHashrate = (avgHashrate / 1000000).toFixed(1)
  let dayAvgHashrate = megaHashrate < 10 ? `0${megaHashrate}` : `${megaHashrate}`
  dayAvgHashrate += 'MH/s'

  return Object.assign({}, payload, { avgHashrate: dayAvgHashrate })
}

app.get('/:wallet', (req, res) => {
  const wallet = req.params.wallet

  const checkWallet = (str) => /^[a-zA-Z0-9]{40}$/.test(str)
  const isCorrectFormat = checkWallet(wallet)

  if (isCorrectFormat) {
    const url = `${ROOT_URL}/${wallet}`

    return axios.get(url)
    .then((response) => {
      const data = response.data
      const formattedPayload = formatPayload(data)
      res.send(formattedPayload)
    })
    .catch((err) => {
      res.send(err)
    })
  } else {
    res.send('Invalid wallet').sendStatus(400)
  }
})

app.listen(PORT)
