import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom"
import axios from 'axios';

class LeaderBoard extends Component {
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
            <div className="centered">
                <ol className="challenger_players">
                    {this.state.summonerDetails.map(players => 
                        <li key={players.summonerId}> 
                            <Link to={{
                                pathname: '/player',
                                search: '?name=' + players.summonerName,
                                state: {summonerName: players.summonerName}

                            }}>{players.summonerName}</Link> {' - ' + players.leaguePoints}
                        </li>
                    )}
                </ol>
            </div>
        );
    }
}

export default withRouter(LeaderBoard);