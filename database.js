const mongoose = require('mongoose');
const { Schema } = mongoose;

main(console.log('Connected to Database')).then().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/tft');
}

const playerSchema = new Schema({
    id: String,
    summonerId: String,
    accountId: String,
    puuid: String, 
    profileIconId: Number,
    summonerLevel: Number,
    name:  String,
    region: String,
    tier: String,
    rank: String,
    leaguePoints: String, 
    wins: Number,
    losses: Number
}, {
    timestamps: true
});

const Player = mongoose.model('players', playerSchema, );

// const instance = new Player({playerName: "Doublelift"});

// instance.save(function (err) {
//     if (!err) console.log('Success!');
// });

exports.getPlayer = async (criteria) => {
    const player = await Player.findOne(criteria).exec();
    return player;
}

exports.addPlayer = (plr) => {
    const instance = new Player(plr);

    instance.save(function (err) {
        if (!err) console.log('Success!');
    });
}