import React from 'react';
import './style.css';

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});


const images = importAll(require.context('../Assets/champions/', true, /\.png$/));
const itemImages = importAll(require.context('../Assets/items/', true, /\.png$/));


// NOTE: TRAITS API REQUEST HAS A BUG - https://github.com/RiotGames/developer-relations/issues/330
export default function Units(props) {
    const items = props.unit.items;
    console.log(items)
    const unit = props.unit.character_id;

    let unit_color;
    switch(props.unit.rarity) {
        case 0:
            unit_color = "gray"
            break;
        case 1:
            unit_color = "green"
            break;
        case 2:
            unit_color = "blue"
            break;
        case 3:
            unit_color = "purple"
            break;
        case 4:
            unit_color = "yellow"
            break;
        default:
            unit_color = "gray"
      }

    const itemImg = items.map((itemID) => {
        const imgPath = itemID + ".png";
        const imgSrc = itemImages[imgPath].default;

        return <img src={ imgSrc } style={{ width: 32 }} />

    });

    return (
            <div style={{padding:5}}>
                <img src={images[unit + '.png'].default} alt={unit} style={{ borderColor: unit_color, width: 64}} border="4" />
                ({props.unit.tier})
                <br/>
                { itemImg }
            </div>
    );
}
