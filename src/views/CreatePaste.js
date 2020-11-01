import React from 'react'

// style
import '../style/Create.scss'

class CreatePaste extends React.Component
{

    constructor(props) {
        super(props);

        // todo: prefill form
        this.state = {
            title: "",
            language: "null",
            deleteAfter: "null",
            code: "",
            paste: null,
            created: false,
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
                    this.setState({ title: split[i+1], language: "JavaScript", deleteAfter: "1 Day"})
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
                <div className="landing-title">Create Paste</div>
                <div className="form-wrapper">
                    <div className="form-row row">
                        <div className="form-input-container col-md-4">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-input" id="title" name="title" placeholder="Class Name or Title" value={this.state.title} onChange={this.handleChange} />
                        </div>
                        <div className="form-input-container col-md-4">
                            <label htmlFor="language" className="form-label">Language</label>
                            <input type="text" className="form-input" id="language" name="language" value={this.state.language} onChange={this.handleChange} />
                        </div>
                        <div className="form-input-container col-md-4">
                            <label htmlFor="deleteAfter" className="form-label">Delete After</label>
                            <input type="text" className="form-input" id="deleteAfter" name="deleteAfter" value={this.state.deleteAfter} onChange={this.handleChange} />
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

export default CreatePaste