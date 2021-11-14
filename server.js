const express = require('express')
const axios = require('axios')
require('dotenv').config()

const db = require('./database.js');
const { getChallenger, 
    getPlayerMatches, 
    getMatchData, 
    getSummonerDataByName, 
    getSummonerDatabyID, 
    getSummonerDatabyPUUID 
} = require('./routes.js')
const { DateTime } = require("luxon");

const app = express()

app.get('/api/challenger', async (req, res) => {
    const data = await getChallenger();

    res.send(data);
});

app.get('/api/player', async (req, res) => {
    const name = req.query.name;
    let doUpdate = false;

    const existingPlayer = await db.getPlayer({name: name});

    if (existingPlayer) {
        const date = DateTime.fromJSDate(existingPlayer.updatedAt);
        console.log(date.diffNow("minutes").toObject())

        // Last updated 5 mins ago
        if (date.diffNow("minutes").toObject().minutes > -5) {
            console.log("Printing from DB")
            console.log("Timestamp", existingPlayer.updatedAt)
            res.send(existingPlayer)
            return
        }else {
            doUpdate = true;
        }
    }

    const summonerData = await getSummonerDataByName(name); 
    const summonerID = summonerData.id;
    const moreSummonerData = await getSummonerDatabyID(summonerID);
    const data = moreSummonerData[0];
    
    // console.log(data)
    summonerData["summonerId"] = summonerID;
    summonerData["name"] = data.summonerName;
    summonerData["tier"] = data.tier;
    summonerData["rank"] = data.rank;
    summonerData["leaguePoints"] = data.leaguePoints;
    summonerData["wins"] = data.wins;
    summonerData["losses"] = data.losses;
    
    
    if (doUpdate) {
        console.log("Update player")
        db.updatePlayer({name: name}, summonerData);
    }else {
        console.log("Adding to DB")
        db.addPlayer(summonerData);
    }
    
    res.send(summonerData)

});

app.get('/api/matches', async (req, res) => {
    const puuid = req.query.puuid;
    let matches = [];
    // matches = await db.getPlayerMatches(puuid);
    // console.log(matches);

    // res.send(matches);

    const matchesData = await getPlayerMatches(puuid);

    for (const id of matchesData) {
        const existingMatch = await db.getMatch({'metadata.match_id': id});
        
        if (existingMatch) {
            console.log("Printing from DB")
            matches.push(existingMatch);
            continue;
        }

        const match = await getMatchData();
        db.addMatch(match);
        matches.push(match);    
    }
    
    res.send(matches);

});

app.get('/api/get_name', async (req, res) => {
    const puuid = req.query.puuid;
    let doUpdate = false;

    const existingPlayer = await db.getPlayer({puuid: puuid});

    if (existingPlayer) {
        const date = DateTime.fromJSDate(existingPlayer.updatedAt);

        // Last updated 5 mins ago
        if (date.diffNow("minutes").toObject().minutes > -5) {
            res.send({
                "name": existingPlayer.name, 
                "profileIconId": existingPlayer.profileIconId, 
                "summonerLevel": existingPlayer.summonerLevel
            });
            return;

        }else {
            doUpdate = true;
        }
    }

    // TODO: Future issues with half completed player entries in DB
    const summonerData = await getSummonerDatabyPUUID(puuid);    
    if (doUpdate) {
        console.log("Update player")
        db.updatePlayer({"puuid": puuid}, summonerData);
    }else {
        console.log("Adding to DB")
        db.addPlayer(summonerData);
    }

    res.send({
        "name": summonerData.name,
        "profileIconId": summonerData.profileIconId,
        "summonerLevel": summonerData.summonerLevel
    });
});

// UNUSED
// app.get('/api/rank', async (req, res) => {
//     let summonerId = req.query.summonerId;

//     const existingPlayer = await db.getPlayer({summonerId: summonerId});

//     if (existingPlayer) {
//         console.log("Printing from DB")
//         res.send(existingPlayer)
//         return
//     }
    
//     axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}`, jsonHeader)
//     .then(result => {
//         let return_data = {}
//         const data = result.data[0];
//         // console.log(data)
//         return_data["summonerId"] = summonerId;
//         return_data["name"] = data.summonerName;
//         return_data["tier"] = data.tier;
//         return_data["rank"] = data.rank;
//         return_data["leaguePoints"] = data.leaguePoints;
//         return_data["wins"] = data.wins;
//         return_data["losses"] = data.losses;
        
//         console.log("Adding to DB")
//         db.addPlayer(return_data);

//         res.send(data)
//     }).catch(function (error) {
//         console.log(error);
//     });
    
// });

app.get('/api/',  (req, res) => {
    res.send("Hello World")
});

app.listen(8000, () => {
    console.log('Express started');
});

module.exports = app