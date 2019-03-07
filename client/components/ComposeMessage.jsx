import React from 'react';
import { Link } from "react-router-dom";
import '../css/styles.css';



// Components
const ComposeMessage = ({click, changeMessage}) => {
    return (
      <div> 
        {/* <img className="signin" src="../assets/Pigeon.gif" style={{width: '355px', align: 'center'}}/> */}
        <form>
          <input id="message-title" className="message" type="text" placeholder="Title" onChange={changeMessage} />
          <input id="message-to"className="message" type="text" placeholder="To" onChange={changeMessage} />
          <textarea id="message-body" className="message" rows="12" cols="50" placeholder="Enter Message..." onChange={changeMessage}></textarea>
          <Link to="/confirm" style={{ textDecoration: "none" }}><button className="message">Send</button></Link>
        </form>
      </div>
    )       
};

export default ComposeMessage;