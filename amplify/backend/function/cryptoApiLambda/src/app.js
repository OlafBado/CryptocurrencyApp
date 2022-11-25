// /*
// Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
//     http://aws.amazon.com/apache2.0/
// or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and limitations under the License.
// */

// const express = require('express')
// const bodyParser = require('body-parser')
// const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// // declare a new express app
// const app = express()
// app.use(bodyParser.json())
// app.use(awsServerlessExpressMiddleware.eventContext())

// // Enable CORS for all methods
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "*")
//   next()
// });

// /**********************
//  * Example get method *
//  **********************/

// app.get('/test', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// app.get('/test/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// /****************************
// * Example post method *
// ****************************/

// app.post('/test', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// app.post('/test/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example put method *
// ****************************/

// app.put('/test', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// app.put('/test/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example delete method *
// ****************************/

// app.delete('/test', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.delete('/test/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.listen(3000, function() {
//     console.log("App started")
// });

// // Export the app object. When executing the application local this does nothing. However,
// // to port it to AWS Lambda we will create a wrapper around that will load the app from
// // this file
// module.exports = app

const aws = require("aws-sdk");
const secretsManager = new aws.SecretsManager();
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

const getSecretValue = async (name) => {
    const secret = await secretsManager
        .getSecretValue({ SecretId: name })
        .promise();
    return JSON.parse(secret.SecretString)[name];
};

app.get("/globalStats", async function (req, res) {
    const key = await getSecretValue("COINS_API_KEY");

    const options = {
        headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.get(
            "https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl",
            options
        );
        res.json({
            success: "get call succeed!",
            url: req.url,
            body: response.data,
        });
    } catch (err) {
        res.send(err);
    }
});

app.get("/top10", async (req, res) => {
    const key = await getSecretValue("COINS_API_KEY");
    const coinsOptions = {
        headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
    };
    try {
        const response = await axios.get(
            "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=10&offset=0",
            coinsOptions
        );
        res.json({
            success: "get call succeed!",
            url: req.url,
            body: response.data,
        });
    } catch (err) {
        res.send(err);
    }
});

const COINS_BASE_URL =
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1";

app.get("/coins", async (req, res) => {
    const key = await getSecretValue("COINS_API_KEY");
    const { sortBy, direction, offset, input } = req.query;
    const url = `${COINS_BASE_URL}&orderBy=${sortBy}&orderDirection=${direction}&limit=10&offset=${offset}&search=${input}`;
    const coinsOptions = {
        headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.get(url, coinsOptions);
        res.json({
            success: "get call succeed!",
            url: req.url,
            body: response.data,
        });
    } catch (err) {
        res.send(err);
    }
});

app.get("/coinDetails", async (req, res) => {
    const key = await getSecretValue("COINS_API_KEY");
    const { id } = req.query;
    const coinsOptions = {
        headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
    };
    const url = `https://coinranking1.p.rapidapi.com/coin/${id}`;
    try {
        const response = await axios.get(url, coinsOptions);
        res.json({
            success: "get call succeed!",
            url: req.url,
            body: response.data,
        });
    } catch (err) {
        res.send(err);
    }
});

app.get("/coinHistory", async (req, res) => {
    const key = await getSecretValue("COINS_API_KEY");
    const { id, timePeriod } = req.query;
    const url = `https://coinranking1.p.rapidapi.com/coin/${id}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`;
    const coinsOptions = {
        headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
    };
    try {
        const response = await axios.get(url, coinsOptions);
        res.json({
            success: "get call succeed!",
            url: req.url,
            body: response.data,
        });
    } catch (err) {
        res.send(err);
    }
});

app.listen(3000, function () {
    console.log("App started");
});

module.exports = app;
