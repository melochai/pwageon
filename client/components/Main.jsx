import React from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';

// Components
const Main = ({ changeMessageBody, displayPigi, incrementPigi }) => {
  return (
    <div>
      <div className="pigeon-holder">
        <img className="pigeon-image" src={displayPigi.image_url} alt="ugly pigeon" />

        <button
          onClick={incrementPigi}
          type="button"
          style={{ width: '10vw', justifySelf: 'center', alignSelf: 'center' }}
        >
          Next Pigeon
        </button>
      </div>

      <h1 className="signin">{displayPigi.pigeon_name}</h1>
      <div className="stats">
        <p>Speed : {displayPigi.speed}</p>
        <p>Stamina : {displayPigi.stamina}</p>
        <p>Success : {displayPigi.durability}</p>
      </div>
      <div>
        <Link className="message" to="/compose" style={{ textDecoration: 'none' }}>
          Prepare Message
        </Link>
        <Link to="/map" style={{ textDecoration: "none" }}>
          <button >Show Map</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
