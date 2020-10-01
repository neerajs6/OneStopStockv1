import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
//import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import Home from '../Home';
import NavBar from '../AppBar';

import StockGrid from '../StockGrid';
import Register from '../Register';
import Search from '../Search';
import ErrorNotFound from '../Error';
import About from '../About';
import Login from '../Login';
import Account from '../Account';
import AccountSettings from '../AccountSettings';




export default function Main() {

   return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/stocks/:symbol" component={StockGrid} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/who-we-are" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/account/:username" component={Account} />
                <Route path="/account/:username/settings" component={AccountSettings} />

                <Route path="*" component={ErrorNotFound} />
            </Switch>
        </Router>


   );
 }


