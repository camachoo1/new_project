import React from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain='dev-dam6nv2t6440c6cl.us.auth0.com'
      clientId='jDq3fRkv3vwEJLhcluJ9nbN5VQwz5TNM'
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <div className='App'>
        <Homepage />
      </div>
    </Auth0Provider>
  );
}

export default App;
