import React from 'react';
import './Match.css';
import { tierImages } from './Images.js';

// TODO Use New icons
export default function RankIcon(props) {
   
    let file_name = props.tier + '_' + props.division + '.png';
    file_name = file_name.toLowerCase();

    if (props.tier) {
        return (<img src={tierImages[file_name].default} alt={file_name} className="rank-image" />)
    }else {
        return (<></>);
    }
}
