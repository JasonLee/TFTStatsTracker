import React, { Component } from 'react';
import { withRouter } from "react-router";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
            <Form>
                <Form.Group as={Col} xs={6}>
                    <InputGroup size="lg" onSubmit={this.onSubmit}>
                        <Form.Control
                            type="text"
                            placeholder="Search here.."
                            onChange={this.handleChange}
                            onKeyDown={this._handleKeyDown}
                        />
                         <InputGroup.Text>
                                <FontAwesomeIcon icon={faPaperPlane} />
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Form>
        );
    }
}

export default withRouter(SearchPage);