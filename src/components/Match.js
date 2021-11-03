import React, { Component } from 'react';
import MatchPlayer from './MatchPlayer';
import './style.css';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

const { DateTime } = require("luxon");

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.match_data.info.participants,
            time_since: ""
        };

    }

    componentDidMount() {
        let match_time = this.props.match_data.info.game_datetime;
        let date = DateTime.fromMillis(match_time);
        let time_ago = date.toRelative();

        this.setState({
            players: this.state.players.sort((a, b) => {
                return a.placement - b.placement;
            }),
            time_since: time_ago
        });
    };

    // What is actually displayed
    render() {
        let current_player;
        let game_type;
        // Game version has a number in version which denotes ranked or normal game.
        let queue_id = this.props.match_data.info.queue_id;

        if (queue_id === 1090) {
            game_type = "Normal";
        } else {
            game_type = "Ranked";
        }

        for (const player of this.state.players) {
            if (player.puuid === this.props.current_player) {
                current_player = player;
                break;
            }
        }

        return (
            <Accordion>
                <Accordion.Item eventKey="0" className="match-container">
                    <Accordion.Header>
                        {/* <div className="current_player_match"> */}
                        <MatchPlayer player={current_player} key={current_player.placement} />
                        Game Type: {game_type} <br />
                        {this.state.time_since} <br />
                        {/* </div> */}
                    </Accordion.Header>
                    <Accordion.Body>
                        {/* <div className="more-matches"> */}
                        <ListGroup>
                            {this.state.players.map(player =>
                                <ListGroup.Item key={player.placement} variant={current_player === player ? "primary" : undefined} >
                                    <MatchPlayer player={player}  />
                                </ListGroup.Item>
                            )}
                            <br />
                        </ListGroup>
                        {/* </div> */}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}

export default Match;