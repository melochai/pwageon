import React from 'react';
import '../css/styles.css';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

function responseGoogle(type, response) {}
const SignIn = ({ click }) => {
  return (
    <div>
      <img
        className="signin"
        alt="cute pigeon holding message"
        src="../assets/courier_pidgeon.jpg"
        style={{ width: '355px', align: 'center' }}
      />
      <h1 className="signin">Pigeon Messenger</h1>
      <div>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={() => {
            console.log('on Success');
            responseGoogle();
            click();
          }}
          onFailure={() => {
            responseGoogle();
            console.log('on Failure');
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
