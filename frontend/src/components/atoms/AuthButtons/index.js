import React from 'react';
import './authbutton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AuthButtons = ({ title, icon, style, action }) => (
  <div className="auth-button-container" onClick={action}>
    <FontAwesomeIcon style={style} className="icon" icon={icon}/>
    <p className="auth-button-text">{title}</p>
  </div>
);

export default AuthButtons;