import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoginRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('userToken') !== null;

    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    alert('Você já está logado!'),
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default LoginRoute;
