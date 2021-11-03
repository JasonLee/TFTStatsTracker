const mongoose = require('mongoose');
const { Schema, Decimal128 } = mongoose;

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

const matchSchema = new Schema({
    metadata: {
        match_id: {
            type: String,
            unique: true
        },
        participants: [String]
    },
    info: {
        game_datetime: Number,
        game_length: Decimal128,
        game_version: String,
        queue_id: Number, 
        tft_game_type: String,
        tft_set_number: Number,
        participants: [{
            companion: {},
            gold_left: Number,
            last_round: Number,
            level: Number,
            placement: Number,
            puuid: String,
            time_elimated: Decimal128,
            traits:[{
                name: String,
                num_units: Number,
                style: Number,
                tier_current: Number,
                tier_total: Number
            }],
            units:[{
                character_id: String,
                items: [Number],
                rarity: Number,
                tier: Number
            }]
        }]
    }
    
});

module.exports = {
    playerSchema,
    matchSchema
};