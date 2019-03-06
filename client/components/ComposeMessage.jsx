import React from 'react';
import '../css/styles.css';



// Components
const ComposeMessage = ({click}) => {
    return (
      <div> 
        {/* <img className="signin" src="../dist/assets/Pigeon.gif" style={{width: '355px', align: 'center'}}/> */}
        <form>
        <input className="message" type="text" placeholder="Title"/>
        <input className="message" type="text" placeholder="To" />
        <textarea className="message" rows="12" cols="50" placeholder="Enter Message..."></textarea>
        <button className="message">Send</button>
        </form>
        <h1 className="signin">Pigeon Messenger</h1>
        <div>
            <button className="signin" onClick={click}><img src="./assets/GoogleSiginBtn/btn_google_signin_light_normal_web@2x.png"/></button>
        </div>
      </div>
    )       
};

export default ComposeMessage;