import React from 'react'
import { Link } from 'react-router-dom'

// style
import '../style/Paste.scss'

class Paste extends React.Component
{

    constructor(props) {
        super(props);

        this.state = {
            token: this.props.match.params.token,
            paste: null
        }

        this.fetchData(this.props.match.params.token)
    }

    fetchData = (token) => {
        fetch("http://localhost:8000/paste/" + token, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState( {
                        token: token,
                        paste: data.result
                    })
                }
            })
    }

    formatTimestamp = (timestamp) => {
        const time = new Date(timestamp);
        return time.toLocaleString()
    }

    decryptBase64 = (base64) => {
        return atob(base64)
    }

    render() {
        let paste = this.state.paste;
        let spacer = <span>&nbsp;</span>;

        console.log(paste)

        if (paste === null) {
            return null;
        } else {
            return <div className="paste-wrapper container">
                <div className="paste-details-container">
                    <div className="paste-title">{ this.decryptBase64(paste.description) }</div>
                    <div className="paste-right">
                        <div className="paste-created">{ this.formatTimestamp(paste.created_at) }</div>
                        {paste.language !== null &&
                        <Link to={ "/language/" + paste.language.toLowerCase() } className="paste-language">
                            <span>{paste.language}</span>
                        </Link>
                        }
                        {paste.user !== null &&
                        <Link to={ "/user/" + paste.userId }  className="paste-user">
                            <span>L</span>
                        </Link>
                        }
                    </div>
                </div>
                <div className="paste-code">
                    <div className="form-label">Code</div>
                    <div className="code">
                        {this.decryptBase64(paste.code).split('\n').map((line, key) => (
                            <div className="line" key={key}>{ line === "" ? spacer : line }</div>
                        ))}
                    </div>
                </div>
                <div className="paste-comments">
                    <div className="form-label">Comments</div>
                    <div className="comments-wrapper">
                        {paste.comments.map((comment, key) => (
                            <div className="comment" key={key}>
                                <div className="comment-header">
                                    <div className="comment-user">
                                        <div className="user-profile-image">
                                            <span>L</span>
                                        </div>
                                        <div className="flex column">
                                            <div className="user-profile-name">Lukas Jakobi</div>
                                            <div className="user-profile-pastes">32 Pastes</div>
                                        </div>
                                    </div>
                                    <div className="comment-created">
                                        { this.formatTimestamp(comment.created_at) }
                                    </div>
                                </div>
                                <div className="comment-content">
                                    <span>{ this.decryptBase64(comment.message) }</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>;
        }
    }
}

export default Paste