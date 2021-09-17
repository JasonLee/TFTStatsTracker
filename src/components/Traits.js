import React from 'react';
import { traitImages } from './Images.js';

export default function Traits(props) {
    
    const traitItems = props.traits.map((trait) => {
        if (trait.tier_current > 0) {
            const imgPath = trait.name.substring(5).toLowerCase() + ".png";
            const imgSrc = traitImages[imgPath].default;

            return <img src={ imgSrc } style={{ width: 32, padding: 5 }} key={trait.name} alt={trait.name} />
        }
    });

    return (
        <div>
            TRAITS:
           { traitItems }
        </div>
    );

}
