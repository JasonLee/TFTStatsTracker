const express = require('express')
const axios = require('axios')
const db = require('./db.js');

require('dotenv').config()


const app = express()

let jsonHeader = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        "Accept-Language": "en-GB,en;q=0.9,zh-MO;q=0.8,zh;q=0.7,ja;q=0.6",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": process.env.api_key
    }
};

app.get('/api/challenger', function(req, res) {
    axios.get("https://na1.api.riotgames.com/tft/league/v1/challenger", jsonHeader)
    .then(result => {
        res.send(result.data)
    }).catch(function (error) {
        console.log(error);
    });
});

app.get('/api/player', function(req, res) {
        let name = req.query.name;
        axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}`, jsonHeader)
        .then(result => {
            let return_data = result.data;
            let summonerId = result.data.id;

            axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}`, jsonHeader)
            .then(result => {
                const data = result.data[0];
                return_data["tier"] = data.tier;
                return_data["rank"] = data.rank;
                return_data["leaguePoints"] = data.leaguePoints;
                return_data["wins"] = data.wins;
                return_data["losses"] = data.losses;
                
                res.send(return_data)
            }).catch(function (error) {
                console.log(error);
            });

        }).catch(function (error) {
            console.log(error);
        });
});

app.get('/api/matches', function(req, res) {
    let puuid = req.query.puuid;
    axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=5`, jsonHeader)
    .then(result => {
        let matches = [];
        let promises = [];

        result.data.forEach(match_id =>  {
            promises.push(
                axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${match_id}`, jsonHeader).then(response => {
                    matches.push(response.data);
                })
            );
        });

        Promise.all(promises).then(() => res.send(matches));
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.get('/api/get_name', function(req, res) {
    let puuid = req.query.puuid;
    axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}`, jsonHeader)
    .then(result => {
        let return_data = {"name":result.data.name, "profileIconId":result.data.profileIconId, "summonerLevel":result.data.summonerLevel};

        res.send(return_data)
    }).catch(function (error) {
        console.log(error);
    });
});

app.get('/api/rank', function(req, res) {
    let summonerId = req.query.summonerId;
    axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}`, jsonHeader)
    .then(result => {
        const data = result.data;
        let return_data = {"tier": data.tier, "rank":data.rank, "leaguePoints": data.leaguePoints, "wins": 72, "losses": data.losses};

        res.send(return_data)
    }).catch(function (error) {
        console.log(error);
    });
});

app.get('/api/test', function(req, res) {
    db.test((err, documents) => {
        res.send(documents);
    });
});

app.listen(8000, function() {
    console.log('Express started');
});