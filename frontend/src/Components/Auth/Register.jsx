/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const Register = props => {
    const authContext = useContext(AuthContext);

    const { register, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        contact: '',
        username: '',
        password: '',
        password2: '',
    })

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
    }, [isAuthenticated, props.history])

    const onChange = e =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()
        if (name === '' || email === '' || password === '' || contact === '') {
            Toast.fire({ icon: 'error', title: 'Please fill in all fields.' })
        } else if (password !== password2) {
            Toast.fire({ icon: 'error', title: 'Passwords do not match.' })
        } else if (password.length < 6) {
            Toast.fire({ icon: 'error', title: 'Password should be atleast 6 characters long.' })
        } else {
            register(user);
        }
    }

    const { name, email, password, password2, contact, username } = user
    return (
        <div className="row">
            <div className="col-md-6 col-sm-12 mx-auto mt-4">
                <div className="card bg-lighten px-3 pt-4 pb-3">
                    <h1 className="mx-auto">
                        Account <span className="text-primary">Register</span>
                    </h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Name"
                                onChange={onChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={onChange}
                                placeholder="Username"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Email"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact</label>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                value={contact}
                                onChange={onChange}
                                placeholder="Contact Number"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            <input
                                id="password2"
                                type="password"
                                name="password2"
                                value={password2}
                                onChange={onChange}
                                className="form-control"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div>
                            <input type="submit" value="Register" className="btn btn-primary btn-block" />
                        </div>
                        <div className="mt-2">
                            <Link className="btn btn-outline-primary btn-block" to="/login">Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;