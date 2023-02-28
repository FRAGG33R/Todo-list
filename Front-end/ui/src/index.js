import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/404";
import SideBar from "./components/SideBar";
import * as te from 'tw-elements';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Auth0Provider
      domain="dev-0yk577wbejgxl3th.us.auth0.com"
      clientId="WC8j7S33W30WeVM6Xi4gg5v6MHYbgQVl"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/app",
      }}
    >
	<BrowserRouter>
		<Routes>
		<Route exact path="/" element={<LandingPage />}></Route>
		<Route path="/app" element={<SideBar />}></Route>
		<Route path="*" element={<PageNotFound />}></Route>
		</Routes>
	</BrowserRouter>
	</Auth0Provider>
);

reportWebVitals();
