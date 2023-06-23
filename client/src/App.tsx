import React from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Callback from './components/Callback/Callback';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      authorizationParams={{ redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI as string, audience: process.env.REACT_APP_AUTH0_AUDIENCE as string, scope: "openid profile email" }}
    >
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/callback' element={<Callback />} />
        </Routes>
      </Router>
    </Auth0Provider>
  )
}

export default App;
