import React, { Component } from 'react';
import { withRouter } from "react-router";
import axios from 'axios';
import MatchHistory from './MatchHistory';
import ProfileIcon from './ProfileIcon';
import RankIcon from './RankIcon';
import './style.css';

const queryString = require('query-string');

class PlayerDetailsBanner extends Component {
    constructor(props) {
        super(props);
        
        this.state  = {
            id: '',
            accountId: '',
            name: '',
            puuid: '',
            profileIconId: '',
            summonerLevel: '',
            tier: '',
            rank: '',
            lp: '',
            wins: '',
            losses: '',
            winrate: ''
        }
    }

    // Runs when component has been added
    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        axios.get("/api/player", {
            params: {
                name: parsed.name
            }
        })
        .then(res => {
            const data = res.data;
            let winrate = (data.wins * 100.00)/ (data.wins + data.losses) 
            winrate = winrate.toFixed(2)

            this.setState({ 
                id: data.id,
                accountId: data.accountId,
                name: data.name,
                puuid: data.puuid,
                profileIconId: data.profileIconId, 
                summonerLevel: data.summonerLevel,
                tier: data.tier,
                rank: data.rank,
                lp: data.leaguePoints,
                wins: data.wins,
                losses: data.losses,
                winrate: winrate
            });
            
        });
    }

    componentDidUpdate(nextProps) {
        const languageChanged = this.props.location.search !== nextProps.location.search;
        if (languageChanged) {

        }
    }


    // What is actually displayed
    render() {
        return (
            <div className="player-page">
                <div className="player-banner">
                    <div>
                        <h1><ProfileIcon id={this.state.profileIconId} /> {this.state.name} </h1> <br />
                        LVL: {this.state.summonerLevel} 
                    </div>
                    <div>
                        <RankIcon tier={this.state.tier} division={this.state.rank}/> <br />
                        <b> {this.state.tier} {this.state.rank} <br /> </b>
                        ID: {this.state.id} <br />
                        PUUID: {this.state.puuid} <br />
                        ACCOUNT ID: {this.state.accountId} <br />
                        
                        FIRST PLACE: {this.state.wins} <br />
                        WINRATE:  {this.state.winrate}% <br />
                        GAMES PLAYED: {this.state.wins + this.state.losses}
                    </div>
                </div>
                <div>
                    {this.state.puuid !== '' ? <MatchHistory puuid={this.state.puuid}/>: <h1>Loading</h1>}
                </div>
           </div>
            
        );
    }
}

export default withRouter(PlayerDetailsBanner);