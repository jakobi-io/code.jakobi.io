import React from 'react'
import { Link } from 'react-router-dom'
import Prism from 'prismjs'

// style
import '../style/Paste.scss'
import "../style/prism.css";

// components
import PasteSkeleton from '../components/skelleton/PasteSkeleton.js'

class Paste extends React.Component
{

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            token: this.props.match.params.token,
            paste: null
        }

        this.fetchData(this.props.match.params.token)
    }

    componentDidMount() {
        Prism.highlightAll();
    }

    fetchData = (token) => {
        fetch(process.env.REACT_APP_API_BASE_URL + "paste/" + token, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState( {
                        token: token,
                        paste: data.result
                    })

                    // change window title
                    document.title = (data.result.description !== "" ? this.decryptBase64(data.result.description) : "Untitled") + " | Code | by jakobi.io";
                } else {
                    // todo: handle error
                    this.setState({ error: true })
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

        if (paste === null) {
            return <PasteSkeleton />
        } else {
            if (this.state.error) {
                return <div className="error">

                </div>
            }

            return <div className="content-wrapper container">
                <div className="content-title-wrapper">
                    <div className="content-title">{ paste.description !== "" ? this.decryptBase64(paste.description) : "Untitled" }</div>
                    <div className="content-title-actions align-right">
                        <div className="paste-created">{ this.formatTimestamp(paste.created_at) }</div>
                        {paste.language !== null &&
                            <div className="paste-language">
                                <span>{paste.language.displayname}</span>
                            </div>
                        }
                        {paste.user !== null && paste.user !== undefined &&
                            <a href={process.env.REACT_APP_ACCOUNTS_BASE_URL + "@" + paste.user.username } target="_blank" className="paste-user" style={{ backgroundImage: "url('" + paste.user.profile_picture_url + "')" }} />
                        }
                    </div>
                </div>
                <div className="paste-code">
                    <div className="form-label">Code</div>
                    <div className="code">
                        <pre className="language-javascript">
                            {this.decryptBase64(paste.code).split('\n').map((line, key) => (
                                <code className="language-javascript" key={key}>
                                    {line === "" ? spacer : line}
                                </code>
                            ))}
                        </pre>
                    </div>
                </div>
                { paste.comments.length > 0 &&
                <div className="paste-comments">
                    <div className="form-label">Comments</div>
                    <div className="comments-wrapper">
                        {paste.comments.map((comment, key) => (
                            <div className="comment" key={key}>
                                <div className="comment-header">
                                    <div className="comment-user">
                                        <div className="user-profile-image" style={{ backgroundImage: "url('" + (comment.user !== null ? (comment.user.profile_picture_url ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png") : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png") + "')" }} />
                                        <div className="flex column">
                                            <div className="user-profile-name">{ comment.user.username ?? comment.user.email }</div>
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
                }
            </div>
        }
    }
}

export default Paste