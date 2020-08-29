const cron = require('node-cron');
const axios = require('axios')
const db = require('../backend/db.js');

require('dotenv').config()
 
let jsonHeader = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        "Accept-Language": "en-GB,en;q=0.9,zh-MO;q=0.8,zh;q=0.7,ja;q=0.6",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": process.env.api_key
    }
};

cron.schedule('*/1 * * * *', () => {
    console.log('running a task every minute');
    let name = 'Krmx';

    axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}`, jsonHeader)
    .then(result => {
        let return_data = result.data;
        let summonerId = result.data.id;

        axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}`, jsonHeader)
        .then(result => {
            let data = result.data[0];
            return_data["tier"] = data.tier;
            return_data["rank"] = data.rank;
            return_data["leaguePoints"] = data.leaguePoints;
            return_data["datetime"] = Date.now();

            delete return_data["id"];
            delete return_data["accountId"];
            delete return_data["profileIconId"];
            delete return_data["revisionDate"];
            delete return_data["summonerLevel"];


            db.test_add(return_data, (acknowledged , insertedId ) => {
                console.log("acknowledged: " + acknowledged);
                console.log("insertedId: " + insertedId);
            });

        }).catch(function (error) {
            console.log(error);
        });

    }).catch(function (error) {
        console.log(error);
    });
});
