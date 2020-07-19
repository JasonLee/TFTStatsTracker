import React, { Component } from 'react';
import { withRouter } from "react-router";

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {search: ''};

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.history.push({
            pathname: '/player',
            search: '?name=' + this.state.search,
            state: {
              summonerName: this.state.search
            }
          });
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit(e);
        }
    }

    // What is actually displayed
    render() {
        return (
            <div>
                <input type="text" value={this.state.search} onChange={this.handleChange} onKeyDown={this._handleKeyDown} />
                <input type="submit" onClick={this.onSubmit} value="Submit" />
            </div>
        );
    }
}

export default withRouter(SearchPage);