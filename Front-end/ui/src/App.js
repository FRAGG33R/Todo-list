import logo from './logo.svg';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';

function App() {
	const { loginWithRedirect } = useAuth0();
  return (
	<button onClick={() => loginWithRedirect()}>
			Login
	</button>
  );
}

export default App;
