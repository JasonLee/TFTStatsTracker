const express = require('express')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.get('/api/challenger', function(req, res) {
    try {
        axios.get("https://na1.api.riotgames.com/tft/league/v1/challenger",
        {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                "Accept-Language": "en-GB,en;q=0.9,zh-MO;q=0.8,zh;q=0.7,ja;q=0.6",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": process.env.api_key
            }
        })
            .then(result => {
                res.send(result.data)
            });
    }catch (error)  {
        console.log(error);
    }
});

app.listen(8000, function() {
    console.log('Express started');
});