import React from 'react';
import '../css/styles.css';



// Components
const ConfirmMessage = ({statey}) => {
    const bodyElement = document.querySelector('body');
    bodyElement.setAttribute("style", "background-color: #FFFFFF");
    bodyElement.setAttribute("style", "background-color: #8ED69E");
    console.log(bodyElement)
    return (
      <div>
        <p>this is confirm</p>
        <img className="signin" src="./assets/01-c4d.gif" style={{backgroundColor: '#FFF', width: '355px', align: 'center'}}/>
        <h1 className="signin">Pigeon Messenger</h1>
        <p>{statey.messageBody}</p>
        <div>
            {/* <button className="signin" onClick={click}><img src="./assets/GoogleSiginBtn/btn_google_signin_light_normal_web@2x.png"/></button> */}
        </div>
      </div>
    )       
};

export default ConfirmMessage;