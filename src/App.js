import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// style
import './App.scss';

// views
import Create from './views/Create'
import Paste from './views/Paste'

class App extends React.Component
{
    componentDidMount() {

    }

    render() {
        return (
            <div className="app">
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
}

export default App;
