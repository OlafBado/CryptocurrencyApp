const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require('aws-sdk')
const secretsManager = new AWS.SecretsManager()
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get('/crypto/getNews', function(req, res) {
  const param = req.query.coin
  
  const getData = async () => {
    const secret = await secretsManager.getSecretValue({ SecretId: 'NEWS_API_KEY' }).promise()
    const key = JSON.parse(secret.SecretString)  
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?pageSize=10&sortBy=publishedAt&language=en&apiKey=${key['NEWS_API_KEY']}&q=${param}`)
      res.json(response.data)
    } catch (err) {
      res.send(err)
        }
    }
    getData()
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
