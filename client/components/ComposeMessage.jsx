import React from 'react';
import '../css/styles.css';



// Components
const ComposeMessage = ({click}) => {
    return (
      <div> 
        <img className="signin" src="../dist/assets/Pigeon.gif" style={{width: '355px', align: 'center'}}/>
        <input className="message" type="text" value="Title"/>
        <input className="message" type="text" value="To" />
        <h1 className="signin">Pigeon Messenger</h1>
        <div>
            <button className="signin" onClick={click}><img src="../dist/assets/GoogleSiginBtn/btn_google_signin_light_normal_web@2x.png"/></button>
        </div>
      </div>
    )       
};

export default ComposeMessage;