import React from 'react'

// style
import '../style/Create.scss'

// font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

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
            loading: false
        }
    }

    componentDidMount() {
        document.title = 'Share some code «» jakobi.io';
    }

    handleSubmit = () => {
        if (this.state.title.length > 32) {
            this.setState({title: this.state.title.substr(0, 32)});
        }

        // todo: error handling
        if (this.state.code.length <= 0) {
            console.error("code cannot be empty")
            return
        }

        this.setState({ loading: true })

        fetch(process.env.REACT_APP_API_BASE_URL + "paste", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: this.state.title,
                language: this.state.language,
                deleteAfter: this.state.deleteAfter,
                code: this.state.code
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                let history = this.props.history;

                this.setState({ created: true })
                history.push("/" + data.result.token)
            } else {
                // todo: handle error
                this.setState({ created: false, errorCode: data.statusCode, error: data.statusText })
            }
        })
    }

    handleChange = (event) => {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        // try to catch class name out of code if description is empty
        if (name === "code" && this.state.title === "") {
            let replace = value.replace(/(\r\n|\n|\r)/gm," ");
            let split = replace.split(' ')

            for (let i = 0; i < split.length; i++) {
                if (split[i] === "class") {
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
                <div className="content-title">Paste your paste</div>
            </div>
            <div className="form-wrapper">
                <div className="form-row row">
                    <div className="form-input-container col-md-4">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-input" id="title" name="title" placeholder="Class Name or Title" maxLength={32} value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className="form-input-container col-md-4">
                        <label htmlFor="language" className="form-label">Language</label>
                        <select className="form-input" id="language" name="language" value={this.state.language} onChange={this.handleChange}>
                            <option value="plain" selected>Plain Text</option>
                            <option value="java">Java</option>
                            <option value="php">PHP</option>
                            <option value="javascript">JavaScript</option>
                        </select>
                        <FontAwesomeIcon icon={faAngleDown} />
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
                        <FontAwesomeIcon icon={faAngleDown} />
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
                        { !this.state.loading &&
                            <input type="submit" className="form-submit" value="Create" onClick={() => {this.handleSubmit()}}/>
                        }
                        { this.state.loading &&
                            <div className="form-submit">
                                <FontAwesomeIcon icon={faCircleNotch} spin />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Create