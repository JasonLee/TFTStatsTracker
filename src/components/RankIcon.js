import React from 'react';
import './Match.css';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}


const images = importAll(require.context('../Assets/tier-icons/', false, /\.png$/));


export default function RankIcon(props) {
    
    let file_name = props.tier + '_' + props.division + '.png';
    file_name = file_name.toLowerCase();

    console.log(file_name)

    if(props.tier) {
        return (
            <img src={images[file_name].default} alt={file_name} className="rank-image"/>
        );
      }else {
        return( <> </>)
      } 
}
