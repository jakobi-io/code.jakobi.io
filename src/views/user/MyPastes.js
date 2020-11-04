import React from 'react'
import { Link } from 'react-router-dom'

class MyPastes extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            pastes: null
        }
    }

    componentDidMount() {
        console.log(1)
        fetch(process.env.REACT_APP_API_BASE_URL + "paste", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("oauth.token")
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                this.setState({ pastes: data.result })
            } else {
                // todo: handle error
                this.setState({ error: true })
            }
        })
    }

    decryptBase64 = (base64) => {
        return atob(base64)
    }

    render() {
        return <div className="content-wrapper container">
            <div className="content-title-wrapper">
                <div className="content-title">Your Code Pastes</div>
                <div className="content-title-actions align-right">

                </div>
            </div>
            {this.state.pastes !== null && this.state.pastes.map((paste, key) => (
                <div className="paste-wrapper">
                    <Link to={"/" + paste.token}>{paste.token}</Link>
                    <div className="paste-title">{this.decryptBase64(paste.description)}</div>
                </div>
            ))}
        </div>
    }
}

export default MyPastes;