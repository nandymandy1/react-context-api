import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContent from '../../context/auth/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContent = useContext(AuthContent);
    const { isAuthenticated, loading } = authContent
    return (
        <Route {...rest}
            render={props => !isAuthenticated && !loading ?
                (<Redirect to="/login" />) : (<Component {...props} />)
            }
        />
    )
}

export default PrivateRoute