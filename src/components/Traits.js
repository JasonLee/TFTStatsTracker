import React from 'react';
import test from '../Assets/traits/nightbringer.png'

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});



// NOTE: TRAITS API REQUEST HAS A BUG - https://github.com/RiotGames/developer-relations/issues/330
export default function Traits(props) {
    const images = importAll(require.context('../Assets/traits/', true, /\.png$/));
    
    const traitItems = props.traits.map((trait) => {
        if (trait.tier_current > 0) {
            const imgPath = trait.name.substring(5).toLowerCase() + ".png";
            const imgSrc = images[imgPath].default;

            return <img src={ imgSrc } style={{ width: 32, padding: 5 }} key={trait.name} alt={trait.name} />
        }
    });

    return (
        <div>
            TRAITS:
           { traitItems }
           {<img src={test} style={{ width: 32, padding: 5 }} />}
        </div>
    );

}
