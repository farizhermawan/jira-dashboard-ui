import React, {useEffect, useState} from 'react';
import {hot} from 'react-hot-loader'
import {BrowserRouter as Router} from 'react-router-dom';

import AppLayout from 'layout/default';
import {RoutedContent} from 'routes';
import {AuthContext} from 'contexts/auth'
import {AUTH_KEY} from "constants/Environment";
import {ToastContainer} from "react-toastify";
import AuthService from "services/AuthService";

const basePath = process.env.BASE_PATH || '/';

const AppClient = () => {

  const existingTokens = JSON.parse(localStorage.getItem(AUTH_KEY));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    if (data == null) localStorage.removeItem(AUTH_KEY);
    else localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    setAuthTokens(data);
  };

  useEffect(() => {
    if (authTokens) {
      AuthService.fetchIdentity(authTokens.token).then((response) => {
        if (!response) setTokens(null);
        else setAuthTokens(prevState => ({...prevState, user: response}));
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router basename={basePath}>
        <AppLayout>
          <RoutedContent/>
        </AppLayout>
      </Router>
      <ToastContainer
        autoClose={5000}
        draggable={false}
        hideProgressBar={true}
      />
    </AuthContext.Provider>
  );
};

export default hot(module)(AppClient);
