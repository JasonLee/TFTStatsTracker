import React from 'react';
import { profileImages } from './Images.js';


export default function ProfileIcon(props) {
    const icon = props.id;

    if(icon) {
      return (
        <img src={profileImages[icon + '.png'].default} alt={icon} className="profile-icon" />
      );
    }else {
      return(<> </>)
    } 
}
