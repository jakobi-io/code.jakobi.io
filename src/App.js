import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// style
import './App.scss';

// views
import Create from './views/Create'
import Paste from "./views/Paste"
import OAuth from './views/OAuth'

// components
import Header from './components/Header'
import MyPastes from "./views/user/MyPastes";
import PublicPastes from "./views/user/PublicPastes";

class App extends React.Component
{
    componentDidMount() {
        let token = localStorage.getItem("oauth.token");

        if (token === null || token === "null") {
            return
        }

        fetch(process.env.REACT_APP_ACCOUNTS_API_BASE_URL + "user", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                // authenticate
                this.redirectAuthentication();
            }
        })
    }

    redirectAuthentication = () => {
        window.location.href = process.env.REACT_APP_ACCOUNTS_BASE_URL + "oauth/authenticate/?redirect=" + encodeURI(process.env.REACT_APP_BASE_URL + "oauth") + "&method=signin&from=code.jakobi.io"
    }

    render() {
        return (
            <div className="app">
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Create}/>
                        <Route path="/code" exact component={PublicPastes}/>
                        <Route path="/my-code" exact component={MyPastes}/>
                        <Route path="/oauth" exact component={OAuth}/>
                        <Route path="/:token" exact component={Paste}/>
                        <Route path="*" component={Create}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
