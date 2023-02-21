import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	 <Auth0Provider
		domain="dev-0yk577wbejgxl3th.us.auth0.com"
		clientId="YsupPYNDoLZtCtHSuyxydLn1wqkPIE2O"
		authorizationParams={{
		redirect_uri: window.location.origin
    }}
  >
	<NavBar />
	<LandingPage />
  </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
