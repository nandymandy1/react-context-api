import React from 'react'

const Toggler = () => {
    return (
        <button
            type="button"
            aria-expanded="false"
            data-toggle="collapse"
            className="navbar-toggler"
            aria-label="Toggle navigation"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
    )
}

export default Toggler