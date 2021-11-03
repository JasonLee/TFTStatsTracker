const mongoose = require('mongoose');

const  { playerSchema, matchSchema } = require('./dbSchemas'); 

main(console.log('Connected to Database')).then().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.CONNECTION_STRING);
}

const Player = mongoose.model('players', playerSchema);
const Match = mongoose.model('matches', matchSchema);

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

exports.updatePlayer = async (criteria, plr) => {
    player = await this.getPlayer(criteria);

    player = plr;
    this.addPlayer(player);
}

exports.getMatch = async (criteria) => {
    const match = await Match.findOne(criteria).exec();
    return match;
}

exports.addMatch = (mth) => {
    const instance = new Match(mth);

    instance.save(function (err) {
        if (!err) console.log('Success!');
        if (err) console.err(err);
    });
}

exports.getPlayerMatches = async (puuid) => {
    const matches = await Match.find({"metadata.participants": puuid}).exec();
    return matches;
}