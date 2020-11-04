import React from 'react'
import qs from 'qs';

const AUTH_KEY = "oauth.token";

class OAuth extends React.Component
{
    componentDidMount() {
        let history = this.props.history;
        let apiToken = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).oauth;

        if (apiToken === null) {
            history.push("/")
            return
        }

        localStorage.setItem(AUTH_KEY, apiToken);
        history.push("/")
    }

    render() {
        return <div>hey</div>;
    }
}

export default OAuth