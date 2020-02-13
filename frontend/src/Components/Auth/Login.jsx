import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const Login = props => {

    const authContext = useContext(AuthContext);
    const { login, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
    }, [isAuthenticated, props.history])

    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    const onChange = e =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()
        if (username && password) {
            login(user)
        } else {
            // eslint-disable-next-line
            Toast.fire({ icon: 'error', title: 'Please fill in all the fields.' })
        }
    }

    const { username, password } = user

    return (
        <div style={styles.container}>
            <div className="card bg-lighten px-3 pt-4 pb-5 login-form">
                <h1 className="mx-auto">
                    Account <span className="text-primary">Login</span>
                </h1>
                <form onSubmit={onSubmit}>
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
                    <div>
                        <input type="submit" value="Login" className="btn btn-primary btn-block" />
                    </div>
                    <div className="mt-2">
                        <Link className="btn btn-outline-primary btn-block" to="/register">Need an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

const styles = {
    container: {
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default Login;