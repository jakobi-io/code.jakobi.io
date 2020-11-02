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
            deleteAfter: "day",
            code: "",
            paste: null,
            created: false,
            user: null
        }
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

        fetch("http://localhost:8000/paste", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Authorization": "Bearer 111" // todo: bearer
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
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
        return <div className="landing-wrapper">
            <div className="header">

            </div>

            <div className="landing-content container">
                <div className="landing-header">
                    <div className="landing-title">Create Paste</div>
                    <div className="landing-header-right">
                        {this.state.user !== null &&
                            <Link to={ "/user/" + (this.state.user.username ?? this.state.user.email) } className="user">
                                <span className="user-username">{this.state.user.username ?? this.state.user.email}</span>
                                <div className="user-profile-image" style={{backgroundImage: "url('" + this.state.user.profile_image_url + "')"}}/>
                            </Link>
                        }
                        {this.state.user === null &&
                        <div className="warning">
                            <span>You're not logged in</span>
                        </div>
                        }
                    </div>
                </div>
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
            </div>
        </div>
    }
}

export default Create