import React from 'react'
import { Link } from 'react-router-dom'

// style
import '../style/Create.scss'

class Create extends React.Component
{

    constructor(props) {
        super(props);

        // todo: prefill form
        this.state = {
            title: "",
            language: "plain",
            deleteAfter: "never",
            code: "",
            paste: null,
            created: false,
            user: null,
            loading: true
        }

        fetch(process.env.REACT_APP_ACCOUNTS_API_BASE_URL + "user", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("oauth.token")
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.setState({ user: data.result, loading: false })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    handleSubmit = () => {
        let params = {
            description: this.state.title,
            language: this.state.language,
            deleteAfter: this.state.deleteAfter,
            code: this.state.code
        }

        let formData = new URLSearchParams();

        for (let k in params) {
            formData.append(k, params[k]);
        }

        fetch(process.env.REACT_APP_API_BASE_URL + "paste", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.getItem("oauth.token")
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                let history = this.props.history;

                this.setState({ created: true, paste: data.result })
                history.push("/" + data.result.token)
            } else {
                // todo: handle error
                this.setState({ created: false, errorCode: data.status, error: data.statusText })
            }
        })
    }

    handleChange = (event) => {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        // try to catch class name out of code if description is empty
        if (name === "code") {
            let replace = value.replace(/(\r\n|\n|\r)/gm," ");
            let split = replace.split(' ')

            for (let i = 0; i < split.length; i++) {
                if (split[i] === "class") {
                    if (this.state.title !== "") {
                        break
                    }

                    this.setState({ title: split[i+1]})
                    break
                }
            }
        }

        this.setState({
            [name]: value
        });
    }

    render() {
        return <div className="content-wrapper container">
            <div className="content-title-wrapper">
                <div className="content-title">Share some code, it's free!</div>
                <div className="content-title-actions align-right">
                    { !this.state.loading && this.state.user === null &&
                        <div className="warning">
                            <span>You're not logged in</span>
                        </div>
                    }
                </div>
            </div>
            { !this.state.loading &&
                <div className="form-wrapper">
                    <div className="form-row row">
                        <div className="form-input-container col-md-4">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-input" id="title" name="title" placeholder="Class Name or Title" value={this.state.title} onChange={this.handleChange} />
                        </div>
                        <div className="form-input-container col-md-4">
                            <label htmlFor="language" className="form-label">Language</label>
                            <select className="form-input" id="language" name="language" value={this.state.language} onChange={this.handleChange}>
                                <option value="plain" selected>Plain Text</option>
                                <option value="java">Java</option>
                                <option value="php">PHP</option>
                                <option value="javascript">JavaScript</option>
                            </select>
                        </div>
                        <div className="form-input-container col-md-4">
                            <label htmlFor="deleteAfter" className="form-label">Delete After</label>
                            <select className="form-input" id="deleteAfter" name="deleteAfter" value={this.state.deleteAfter} onChange={this.handleChange}>
                                <option value="never">Never</option>
                                <option value="hour">1 Hour</option>
                                <option value="day" selected>1 Day</option>
                                <option value="week">1 Week</option>
                                <option value="month">1 Month</option>
                                <option value="year">1 Year</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-input-container full-width">
                            <label htmlFor="code" className="form-label">Code</label>
                            <textarea className="form-input" id="code" name="code" placeholder="Enter some code ..." value={this.state.code} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-input-container right">
                            <input type="submit" className="form-submit" value="Create" onClick={() => {this.handleSubmit()}}/>
                        </div>
                    </div>
                </div>
            }
            {this.state.loading &&
                <div className="landing-loading">
                    <span>Fetching all the data</span>
                </div>
            }
        </div>
    }
}

export default Create