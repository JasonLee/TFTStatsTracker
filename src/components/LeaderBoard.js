import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom"
import axios from 'axios';
import Table from 'react-bootstrap/Table';

class LeaderBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

                player_data.sort((a, b) => {
                    return b.leaguePoints - a.leaguePoints
                })

                this.setState({ summonerDetails: player_data });
            });
    }

    // What is actually displayed
    render() {
        return (
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Player</th>
                        <th>Rank</th>
                        <th>Points</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.summonerDetails.map((players, index) =>
                        <tr key={players.summonerId}>
                            <td>{index + 1}</td>
                            <td><Link to={{
                                pathname: '/player',
                                search: '?name=' + players.summonerName,
                                state: { summonerName: players.summonerName }
                            }}>
                                {players.summonerName}
                            </Link></td>
                            <td>{"Challenger " + players.rank}</td>
                            <td>{players.leaguePoints}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}

export default withRouter(LeaderBoard);