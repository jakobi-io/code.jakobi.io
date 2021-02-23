import React from 'react'

// style
import "../style/prism.css"
import '../style/Paste.scss'
import '../style/Dark.scss'

// components
import PasteSkeleton from '../components/skelleton/PasteSkeleton.js'
import PrismCode from '../components/PrismCode';

// font awesome icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faCalendarAlt, faKeyboard} from '@fortawesome/free-solid-svg-icons'

class Paste extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            token: this.props.match.params.token,
            paste: null,
            user: null,
            comment: ""
        }
    }

    componentDidMount() {
        this.fetchData(this.props.match.params.token)
    }

    formatNumber = (x) => {
        x = x.toString();
        let pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1.$2");
        return x;
    }

    fetchData = (token) => {
        fetch(process.env.REACT_APP_API_BASE_URL + "paste/" + token, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.setState({
                    token: token,
                    paste: data.result
                })

                // change window title
                document.title = (data.result.description !== "" ? this.decryptBase64(data.result.description) : "Untitled") + ' «» jakobi.io';
            } else {
                // todo: handle error
                this.setState({error: true})
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

    onChange = (event) => {
        this.setState({comment: event.target.value})
    }

    render() {
        let paste = this.state.paste;

        if (paste === null) {
            if (this.state.error) {
                return <div className="error">
                    <div className="container center flex column">
                        <svg width="512" height="421" viewBox="0 0 512 421" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path
                                    d="M176 250.333C170.283 250.333 164.886 247.262 162.006 242.099L138.667 200.094V234.333C138.667 243.165 131.499 250.333 122.667 250.333C113.835 250.333 106.667 243.165 106.667 234.333V138.333C106.667 131.037 111.595 124.659 118.656 122.845C125.696 120.947 133.12 124.168 136.662 130.547L160 172.573V138.333C160 129.501 167.168 122.333 176 122.333C184.832 122.333 192 129.501 192 138.333V234.333C192 241.629 187.072 248.008 180.011 249.821C178.667 250.163 177.323 250.333 176 250.333V250.333Z"
                                    fill="#222222"/>
                                <path
                                    d="M261.333 250.333H250.666C230.08 250.333 213.333 233.587 213.333 213V159.667C213.333 139.08 230.08 122.333 250.666 122.333H261.333C281.92 122.333 298.666 139.08 298.666 159.667V213C298.666 233.587 281.92 250.333 261.333 250.333ZM250.666 154.333C247.722 154.333 245.333 156.723 245.333 159.667V213C245.333 215.944 247.722 218.333 250.666 218.333H261.333C264.277 218.333 266.666 215.944 266.666 213V159.667C266.666 156.723 264.277 154.333 261.333 154.333H250.666Z"
                                    fill="#1A73E8"/>
                                <path
                                    d="M362.667 250.333C353.835 250.333 346.667 243.165 346.667 234.333V138.333C346.667 129.501 353.835 122.333 362.667 122.333C371.499 122.333 378.667 129.501 378.667 138.333V234.333C378.667 243.165 371.499 250.333 362.667 250.333Z"
                                    fill="#222222"/>
                                <path
                                    d="M389.333 154.333H336C327.168 154.333 320 147.165 320 138.333C320 129.501 327.168 122.333 336 122.333H389.333C398.165 122.333 405.333 129.501 405.333 138.333C405.333 147.165 398.165 154.333 389.333 154.333Z"
                                    fill="#222222"/>
                                <path
                                    d="M474.667 421H442.667C433.835 421 426.667 413.832 426.667 405V309C426.667 300.168 433.835 293 442.667 293H474.667C495.254 293 512 309.747 512 330.333V383.667C512 404.253 495.254 421 474.667 421ZM458.667 389H474.667C477.611 389 480 386.611 480 383.667V330.333C480 327.389 477.611 325 474.667 325H458.667V389Z"
                                    fill="#222222"/>
                                <path
                                    d="M16 421C7.168 421 0 413.832 0 405V330.333C0 309.747 16.7467 293 37.3333 293H69.3333C78.1653 293 85.3333 300.168 85.3333 309C85.3333 317.832 78.1653 325 69.3333 325H37.3333C34.3893 325 32 327.389 32 330.333V405C32 413.832 24.832 421 16 421Z"
                                    fill="#222222"/>
                                <path
                                    d="M69.3333 378.333H16C7.168 378.333 0 371.165 0 362.333C0 353.501 7.168 346.333 16 346.333H69.3333C78.1653 346.333 85.3333 353.501 85.3333 362.333C85.3333 371.165 78.1653 378.333 69.3333 378.333Z"
                                    fill="#222222"/>
                                <path
                                    d="M389.333 421C383.616 421 378.219 417.928 375.339 412.765L352 370.739V404.979C352 413.811 344.832 420.979 336 420.979C327.168 420.979 320 413.832 320 405V309C320 301.704 324.928 295.325 331.989 293.512C339.051 291.656 346.453 294.835 349.995 301.213L373.333 343.24V309C373.333 300.168 380.501 293 389.333 293C398.165 293 405.333 300.168 405.333 309V405C405.333 412.296 400.405 418.675 393.344 420.488C392 420.829 390.656 421 389.333 421V421Z"
                                    fill="#222222"/>
                                <path
                                    d="M154.667 421H144C123.414 421 106.667 404.253 106.667 383.667V330.333C106.667 309.747 123.414 293 144 293H154.667C175.254 293 192 309.747 192 330.333V383.667C192 404.253 175.254 421 154.667 421ZM144 325C141.056 325 138.667 327.389 138.667 330.333V383.667C138.667 386.611 141.056 389 144 389H154.667C157.611 389 160 386.611 160 383.667V330.333C160 327.389 157.611 325 154.667 325H144Z"
                                    fill="#222222"/>
                                <path
                                    d="M261.333 421H250.666C230.08 421 213.333 404.253 213.333 383.667V309C213.333 300.168 220.501 293 229.333 293C238.165 293 245.333 300.168 245.333 309V383.667C245.333 386.611 247.722 389 250.666 389H261.333C264.277 389 266.666 386.611 266.666 383.667V309C266.666 300.168 273.834 293 282.666 293C291.498 293 298.666 300.168 298.666 309V383.667C298.666 404.253 281.92 421 261.333 421Z"
                                    fill="#1A73E8"/>
                                <path
                                    d="M496 59.9467V75.9467H16V59.9467C16 26.88 42.88 0 75.9467 0H436.053C469.12 0 496 26.88 496 59.9467V59.9467Z"
                                    fill="#C4C4C4" fillOpacity="0.2"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="512" height="421" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span>Paste Not Found</span>
                        <p>Maybe it was deleted?</p>
                    </div>

                </div>
            }

            return <PasteSkeleton/>
        } else {
            return <div className="content-wrapper container">
                <div className="content-title-wrapper">
                    <div
                        className="content-title">{paste.description !== "" ? this.decryptBase64(paste.description) : "Untitled"}</div>
                    <div className="content-title-actions align-right">
                        <div className="paste-created">
                            {this.formatNumber(paste.views ?? 0)}
                            <FontAwesomeIcon icon={faEye} style={{marginLeft: "6px"}}/>
                        </div>
                        <div className="paste-created">
                            <FontAwesomeIcon icon={faCalendarAlt} style={{marginRight: "15px"}}/>
                            <span>{this.formatTimestamp(paste.created_at)}</span>
                        </div>
                        {paste.language !== null &&
                        <div className="paste-language">
                            <FontAwesomeIcon icon={faKeyboard} style={{marginRight: "10px"}}/>
                            <span>{paste.language}</span>
                        </div>
                        }
                    </div>
                </div>
                <div className="paste-code">
                    <div className="form-label">Code</div>
                    <div className="code">
                        <PrismCode
                            code={this.decryptBase64(paste.code)}
                            language="js"
                            plugins={["line-numbers"]}
                        />
                    </div>
                </div>
            </div>
        }
    }
}

export default Paste