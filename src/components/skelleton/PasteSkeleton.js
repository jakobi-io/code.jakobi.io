import React from 'react'

// style
import './Skeleton.scss'

class PasteSkeleton extends React.Component
{
    render() {
        return <div className="skeleton-wrapper column container">
            <div className="flex" style={{ borderBottom: "4px solid #e3e3e3", paddingBottom: "20px" }}>
                <div className="skeleton-text" />
                <div className="flex right">
                    <div className="skeleton-box views" />
                    <div className="skeleton-box date" style={{ marginLeft: "10px" }} />
                    <div className="skeleton-box" style={{ marginLeft: "10px" }} />
                </div>
            </div>
            <div className="flex column" style={{ paddingTop: "20px" }}>
                <div className="skeleton-subtitle">Code</div>
                <div className="skeleton-code">
                    <div className="skeleton-line" style={{ width: "90%" }} />
                    <div className="skeleton-line" style={{ width: "80%" }} />
                    <div className="skeleton-line" style={{ width: "95%" }} />
                    <div className="skeleton-line" style={{ width: "92%" }} />
                    <div className="skeleton-line" style={{ width: "88%" }} />
                    <div className="skeleton-line" style={{ width: "97%" }} />
                    <div className="skeleton-line" style={{ width: "90%" }} />
                    <div className="skeleton-line" style={{ width: "90%" }} />
                    <div className="skeleton-line" style={{ width: "92%" }} />
                    <div className="skeleton-line" style={{ width: "88%" }} />
                    <div className="skeleton-line" style={{ width: "94%" }} />
                    <div className="skeleton-line" style={{ width: "96%" }} />
                    <div className="skeleton-line" style={{ width: "98%" }} />
                    <div className="skeleton-line" style={{ width: "57%" }} />
                    <div className="skeleton-line" style={{ width: "92%" }} />
                    <div className="skeleton-line" style={{ width: "93%" }} />
                    <div className="skeleton-line" style={{ width: "90%" }} />
                    <div className="skeleton-line" style={{ width: "80%" }} />
                </div>
            </div>
        </div>
    }
}

export default PasteSkeleton