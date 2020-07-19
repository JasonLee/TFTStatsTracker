import React from 'react';
import './Match.css';

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});


const images = importAll(require.context('../Assets/ranks/', true, /\.png$/));


export default function RankIcon(props) {
    let division = '';

    switch(props.division.toLowerCase()) {
        case "i":
            division = "1"
            break;
        case "ii":
            division = "2"
            break;
        case "iii":
            division = "3"
            break;
        case "iv":
            division = "4"
            break;
        default:
            division = "1"
      }
    
    let file_name = props.tier + '_' + division + '.png';

    return (
        <img src={images[file_name.toLowerCase()]} alt={file_name} className="rank-image"/>
    );
}
