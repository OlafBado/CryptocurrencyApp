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

app.get("/getNews", async (req, res) => {
    const key = await getSecretValue("NEWS_API_KEY");
    const { coin, pageSize } = req.query;
    const url = `https://newsapi.org/v2/everything?q=${coin}&apiKey=${key}&sortBy=publishedAt&language=en&pageSize=${pageSize}&page=1`;
    const coinsOptions = {
        headers: {
            "X-Api-Key": key,
            "Accept-Encoding": "*",
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
