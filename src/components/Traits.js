import React, { Component } from 'react';


// NOTE: TRAITS API REQUEST HAS A BUG - https://github.com/RiotGames/developer-relations/issues/330
class Traits extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            activeTraits: {}
        };
       
    }

    // What is actually displayed
    render() {
        return (
            <div>
                TRAITS: <ul>
                            {this.props.traits.map(trait => 
                                (trait.tier_current > 0) &&
                                    <li key={trait.name}>{trait.name}({trait.tier_current}) {trait.num_units}</li>
                            )}
                        </ul>
            </div>
        );
    }
}

export default Traits;