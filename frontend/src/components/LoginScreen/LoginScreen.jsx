import React, { useState } from 'react';
import './LoginScreen.scss';

import GoogleLogin from 'react-google-login';
import MicrosoftLogin from 'react-microsoft-login';
import LoginButton from './LoginButton';

import cityLogo from '../../assets/SanJoseCityLogo.png';
import CustomButton from './CustomButton';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import authSchema from '../../schema/authSchema';

function AdminLogin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(authSchema),
  });

  const onSubmit = (data) => {
    console.log('Login Data: ', data);
  };
  const onError = (error) => {
    console.warn('Login Error: ', error);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };
  const responseMicrosoft = (err, data) => {
    console.log(err, data);
  };

  return (
    <div className="login-wrapper">
      <img className="login-logo" src={cityLogo} alt="Logo of the City of San José" />

      <div className="login-box">
        <div className="login-text">
          Welcome to the City of San José
          <br />
          City Council Meeting Virtual Agenda
        </div>

        <hr />

        <div className="login-buttons-wrapper">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            render={(renderProps) => (
              <LoginButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                Google
              </LoginButton>
            )}
          />

          <MicrosoftLogin
            clientId={process.env.REACT_APP_MICROSOFT_CLIENT_ID}
            authCallback={responseMicrosoft}
            // buttonTheme="dark"
            isSignedIn={true}
            children={<LoginButton>Microsoft</LoginButton>}
          />
        </div>

        <div className="login-screen-or">
          <hr />
          <span>or</span>
          <hr />
        </div>

        <div className="login-screen-auth-input-container">
          <input
            type="text"
            placeholder="Enter username"
            className="login-screen-auth-input"
            {...register('username')}
          />
          <p className="login-screen-auth-input-error">{errors.username?.message}</p>
          <input
            type="text"
            placeholder="Enter password"
            className="login-screen-auth-input"
            {...register('password')}
          />
          <p className="login-screen-auth-input-error">{errors.password?.message}</p>
        </div>

        <div className="login-screen-auth-button-container">
          <CustomButton
            type="submit"
            onClick={handleSubmit(onSubmit, onError)}
            style={{ justifyContent: 'center' }}
          >
            Sign In
          </CustomButton>
          <a href="#" className="login-screen-need-help-link">
            Need help signing in?
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
