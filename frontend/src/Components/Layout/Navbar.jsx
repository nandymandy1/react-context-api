import PropTypes from 'prop-types';
import Toggler from '../utils/Toggler';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contacts/ContactContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <>
            <li className="nav-item">
                <div className="nav-link" style={{ fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
                >
                    Hello, {user && user.name}
                </div>
            </li>
            <li className="nav-item">
                <a href="#!" className="nav-link" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm"></span>
                </a>
            </li>
        </>
    )

    const guestLinks = (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </>
    )

    return (
        <nav className="navbar navbar-expand-lg navbar-dark success">
            <Link className="navbar-brand" to="/">
                {<i className={icon}></i>} {title}
            </Link>
            <Toggler />
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    {
                        isAuthenticated ? authLinks : guestLinks
                    }
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
};

export default Navbar