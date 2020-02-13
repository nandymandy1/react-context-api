import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from './Components/Layout/Navbar';

// Pages
import Home from './Components/pages/Home';
import About from './Components/pages/About';

// Auth Routes
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

// State Context
import AuthState from './context/auth/AuthState';
import ContactState from './context/contacts/ContactState';

import PrivateRoute from './Components/Routing/PrivateRoute';

// Styles
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Set Axios Auth Token

import { setAuthToken } from './services/api';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <>
            <Navbar />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </>
        </Router>
      </ContactState>
    </AuthState>
  );
};

export default App;
