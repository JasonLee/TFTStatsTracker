import React, { Component } from 'react';
import { withRouter } from "react-router";
import axios from 'axios';
import Match from './Match';
import './Match.css';
import { Bar } from 'react-chartjs-2';

class MatchHistory extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            matches: [],
            graph_data: {}
        };
    }
    
    get_placements() {
        let placement = [0,0,0,0,0,0,0,0];

        for (const match of this.state.matches) {
            for (const player of match.info.participants) {
                if(player.puuid === this.props.puuid) {
                    placement[player.placement - 1] = placement[player.placement - 1] + 1;
                    break;
                }
            }
        }
        return placement;
    }

    build_graph(new_data) {

        this.setState({
            graph_data: {
                labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
                datasets: [
                    {
                        backgroundColor: 'rgba(40, 133, 226, 1)',
                        borderColor: 'rgba(40, 133, 226, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(26, 110, 193, 1)',
                        hoverBorderColor: 'rgba(26, 110, 193, 1)',
                        data: new_data
                    }
                ]
            }
        });
    }

    // Runs when component has been added
    componentDidMount() {
        axios.get("/api/matches", {
            params: {
                puuid: this.props.puuid
            }
        })
        .then(res => {
            let data = res.data;

            data.sort((a,b) => {
                return a.info.game_datetime - b.info.game_datetime;
            })
            
            this.setState({matches: data});
            this.build_graph(this.get_placements());
        })
    };

    // What is actually displayed
    render() {
        return (
        <div>
            <div className= "barchart">
                <Bar
                    data={this.state.graph_data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                    }}
                />
            </div>
            <div>
                <ol>
                    {this.state.matches.slice(0).reverse().map(match => 
                        <Match key={match.metadata.match_id} match_data={match} current_player={this.props.puuid}/>
                    )}
                </ol>
            </div>
        </div>
        );
    }
}

export default withRouter(MatchHistory);