import React from 'react';

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});


const images = importAll(require.context('../Assets/profileicon/', true, /\.png$/));


export default function ProfileIcon(props) {
    const icon = props.id;

    return (
        <img src={images[icon + '.png']} alt={icon} className="profile-icon" />
    );
}
