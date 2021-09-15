import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import Trait from './Traits'
import Unit from './Unit'
import './style.css';

class MatchPlayer extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            name: "",
            profileIconId: "",
            summonerLevel: ""
        };
       
    }

    componentDidMount() {
        axios.get("/api/get_name", {
            params: {
                puuid: this.props.player.puuid
            }
        })
        .then(res => {
            const data = res.data;
            this.setState({name: data.name, profileIconId: data.profileIconId, summonerLevel: data.summonerLevel});
        })
    };

    // What is actually displayed
    render() {
        return (
            this.props.player &&
            <div className="player_match">
            {/* slight problem the component doesn't update due functions calls updating it are ONMOUNT*/}
                <h3>{this.state.name} - {this.props.player.placement} - LVL {this.props.player.level}</h3>
                <Trait traits={this.props.player.traits}/>
                UNITS: 
                <div style={{display: "flex", flexDirection: "row"}}>

                    {this.props.player.units.map(function(unit,index) {
                        return (
                            <Unit unit={unit} key={index}/>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(MatchPlayer);