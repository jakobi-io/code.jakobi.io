import React from "react"
import Prism from "prismjs"

class PrismCode extends React.Component {

    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidMount() {
        this.highlight()
    }

    componentDidUpdate() {
        this.highlight()
    }

    highlight = () => {
        if (this.ref && this.ref.current) {
            Prism.highlightElement(this.ref.current)
        }
    }

    render() {
        const spacer = <div className="spacer">&nbsp;</div>
        const { code, plugins, language } = this.props
        return (
            <pre className={!plugins ? "" : plugins.join(" ")}>
                {code.split("\n").map(line => (
                    <code key={line} ref={this.ref} className={`language-${language}`} style={{ height: "1.4rem" }}>
                        {line === "" ? spacer : line}
                    </code>
                ))}
            </pre>
        )
    }
}

export default PrismCode