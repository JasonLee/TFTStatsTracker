import React from 'react';
import './Match.css';
import challenger from '../Assets/tier-icons/tier-icons-base/challenger.png';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return item });
    return images;
}


const images = importAll(require.context('../Assets/tier-icons/', false, /\.png$/));


export default function RankIcon(props) {

    let file_name = props.tier + '_' + props.division + '.png';
    file_name = file_name.toLowerCase();

    if (props.tier) {
        if (props.tier !== "CHALLENGER") {
            return (
                <img src={images[file_name].default} alt={file_name} className="rank-image" />
            );
        } else {
            return (
                <img src={ challenger } alt={file_name} className="rank-image" />
            )
            
        }
    } else {
        return (<> </>)
    }
}
