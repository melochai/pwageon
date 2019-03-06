import React from 'react';

import TestComp1 from './TestComp1.jsx';
import '../css/styles.css';



// Components
const Main = ({showCompose, displayPigi, incrementPigi}) => {
    return (
      <div>
        <div className="header"></div>
        <img className="signin" src={displayPigi.image} style={{width: '355px', align: 'center'}}/>
        <button onClick={incrementPigi}>Next Pigeon</button>
        <h1 className="signin">{displayPigi.name}</h1>
        <div className="stats">
          <p>Speed : {displayPigi.speed}</p>
          <p>Stamina : {displayPigi.stamina}</p>
          <p>Success : {displayPigi.success}</p>
        </div>
        <div>
            <button className="message" onClick={showCompose}>Prepare Message</button>
        </div>
      </div>
    )       
};

export default Main;