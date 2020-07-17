import React, { Component } from 'react';
import axios from 'axios';

export default class MatchHistory extends Component {
    constructor(props) {
        super(props);

        this.state  = {
            summonerDetails: []
        };
    }

    // Runs when component has been added
    componentDidMount() {
        // GET Request to backend
        axios.get("/api/challenger")
        .then(res => {
            const data = res.data;
            
            let player_data = data['entries'];

            player_data.sort((a,b) => {
                return b.leaguePoints - a.leaguePoints
            })


            this.setState({ summonerDetails: player_data });
        });
    }

    // What is actually displayed
    render() {
        return (
            <div>
                <ol className="challenger_players">
                    {this.state.summonerDetails.map(players => 
                        <li>{ players.summonerName  + ' - ' + players.leaguePoints}</li>
                    )}
                </ol>
            </div>
        );
    }
}