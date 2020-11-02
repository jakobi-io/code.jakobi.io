import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// style
import './App.scss';

// views
import Create from './views/Create'
import Paste from "./views/Paste";

function App() {
  return (
    <div className="app">
        <div className="header"/>
        <Router>
            <Switch>
                <Route path="/" exact component={Create}/>
                <Route path="/:token" exact component={Paste}/>
                <Route path="*" component={Create}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
