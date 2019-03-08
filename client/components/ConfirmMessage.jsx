import React from 'react';
import '../css/styles.css';
import { Link } from 'react-router-dom';

// Components
const ConfirmMessage = ({ statey }) => {
  const bodyElement = document.querySelector('body');
  bodyElement.setAttribute('style', 'background-color: #FFFFFF');
  bodyElement.setAttribute('style', 'background-color: #8ED69E');
  console.log(bodyElement);
  return (
    <div>
      <img
        className="signin"
        alt="pigeon gif"
        src="./assets/01-c4d.gif"
        style={{ backgroundColor: '#FFF', width: '355px', align: 'center' }}
      />
      <h1 className="signin">Pigeon Messenger</h1>

      <div className="message-body">
        <div>To: {statey.messageTo}</div>
        <div>Subject: {statey.messageTitle}</div>
        <div>Body: {statey.messageBody}</div>

        <Link className="message" to="/" style={{ textDecoration: 'none' }}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default ConfirmMessage;
