const aws = require("aws-sdk");
const secretsManager = new aws.SecretsManager();
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
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

app.listen(3000, function () {
    console.log("App started");
});

module.exports = app;
