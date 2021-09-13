import React from 'react';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return item});
  return images;
}

const images = importAll(require.context('../Assets/profileicon/', false, /\.png$/));


export default function ProfileIcon(props) {
    const icon = props.id;

    if(icon) {
      return (
        <img src={images[icon + '.png'].default} alt={icon} className="profile-icon" />
      );
    }else {
      return(<> </>)
    } 
}
