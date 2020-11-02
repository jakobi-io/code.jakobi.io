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
                    <div className="skeleton-box brand-blue" />
                    <div className="skeleton-profile" style={{ marginLeft: "20px" }} />
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
                    <div className="skeleton-line" style={{ width: "92%" }} />
                    <div className="skeleton-line" style={{ width: "93%" }} />
                    <div className="skeleton-line" style={{ width: "90%" }} />
                    <div className="skeleton-line" style={{ width: "80%" }} />
                </div>
            </div>
            <div className="flex column">
                <div className="skeleton-subtitle">Comments</div>
                <div className="skeleton-comment">
                    <div className="skeleton-profile" style={{ marginBottom: "20px" }} />
                    <div className="skeleton-text" style={{ marginBottom: "5px" }} />
                    <div className="skeleton-text" />
                </div>
            </div>
        </div>
    }
}

export default PasteSkeleton