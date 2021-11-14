const axios = require('axios');
require('dotenv').config()

const jsonHeader = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        "Accept-Language": "en-GB,en;q=0.9,zh-MO;q=0.8,zh;q=0.7,ja;q=0.6",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": process.env.API_KEY
    }
};

const getChallenger = () => {
    return axios.get("https://na1.api.riotgames.com/tft/league/v1/challenger", jsonHeader).then( ({data}) => {
        return data
    }).catch( err => {
        console.error(err);
    });
}

const getPlayerMatches = (puuid) => {
    const numMatches = 3

    return axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=${numMatches}`, jsonHeader).then( ({data}) => {
        return data
    }).catch( err => {
        console.error(err);
    });
}

const getMatchData = (id) => {
    return axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${id}`, jsonHeader).then( ({data}) => {
        return data
    }).catch( err => {
        console.error(err);
    });
}

const getSummonerDataByName = (name) => {
    return axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}`, jsonHeader).then( ({data}) => {
        return data
    }).catch( err => {
        console.error(err);
    });
}

const getSummonerDatabyID = (summonerID) => {
    return axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerID}`, jsonHeader).then( ({data}) => {
        return data
    }).catch( err => {
        console.error(err);
    });
}

const getSummonerDatabyPUUID = (summonerPUUID) => {
    return axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${summonerPUUID}`, jsonHeader).then( ({data}) => {
        return data
    }).catch( err => {
        console.error(err);
    });
}


module.exports = {
    getChallenger,
    getPlayerMatches,
    getMatchData,
    getSummonerDataByName,
    getSummonerDatabyID,
    getSummonerDatabyPUUID
}