import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class RegionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.regions = {
            "NA":"na1", 
            "EUW":"euw1", 
            "KR":"kr1"
        }

        console.log(Object.keys(this.regions))
    }


    // What is actually displayed
    render() {
        let regionOptions = [];

        Object.keys(this.regions).forEach(key => {
            regionOptions.push(<Dropdown.Item>{key}</Dropdown.Item>);
        });

        return (
            <DropdownButton id="dropdown-basic-button" title="Region">
                {regionOptions}
            </DropdownButton>    
        );
    }
}

export default RegionSelect;