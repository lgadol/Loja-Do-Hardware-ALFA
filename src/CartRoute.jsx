import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const CartRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('userToken') !== null;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    alert('Você precisa estar logado para acessar o carrinho de compras.'),
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default CartRoute;
