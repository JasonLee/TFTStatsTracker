import React, { Component } from 'react';
import MatchPlayer from './MatchPlayer';
import './style.css';

const { DateTime } = require("luxon");

class Match extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            players: this.props.match_data.info.participants,
            showResults: false,
            time_since: ""
        };

        this.showMore = this.showMore.bind(this);
    }

    componentDidMount() {
        let match_time = this.props.match_data.info.game_datetime;
        let date = DateTime.fromMillis(match_time);
        let time_ago = date.toRelative();

        this.setState({
            players: this.state.players.sort((a,b) => {
                return a.placement - b.placement;
            }),
            time_since: time_ago
        });
    };

    showMore() {
        this.setState({showResults: !this.state.showResults});
    }

    // What is actually displayed
    render() {
        let current_player;
        let game_type;
        // Game version has a number in version which denotes ranked or normal game.
        let queue_id = this.props.match_data.info.queue_id;

        for (const player of this.state.players) {
            if(player.puuid === this.props.current_player) {
                current_player = player;
                break;
            }
        }

        if(queue_id === 1090){
            game_type = "Normal";
        }else{
            game_type = "Ranked";
        }

        for (const player of this.state.players) {
            if(player.puuid === this.props.current_player) {
                current_player = player;
                break;
            }
        }

        return (
            <div className="match-container">
                <div className="current_player_match">
                    <MatchPlayer player={current_player} key={current_player.placement}/>
                    Game Type: {game_type} <br />
                    {this.state.time_since} <br />

                    <input type="button" value="SHOW MORE" onClick={this.showMore}/>
                </div>
                <div className="more-matches">
                    {this.state.showResults && this.state.players.map(player => 
                        <MatchPlayer player={player} key={player.placement}/>
                    )}
                    <br />
                </div>
            </div>
        );
    }
}

export default Match;