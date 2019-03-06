import React from 'react';
import '../css/styles.css';



// Components
const ComposeMessage = ({click}) => {
    return (
      <div> 
        {/* <img className="signin" src="../assets/Pigeon.gif" style={{width: '355px', align: 'center'}}/> */}
        <form>
          <input className="message" type="text" placeholder="Title"/>
          <input className="message" type="text" placeholder="To" />
          <textarea className="message" rows="12" cols="50" placeholder="Enter Message..."></textarea>
          <button className="message">Send</button>
        </form>
      </div>
    )       
};

export default ComposeMessage;