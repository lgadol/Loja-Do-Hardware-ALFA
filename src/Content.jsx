import React from "react";
import { Switch, Route } from 'react-router-dom';
import CartRoute from './CartRoute';
import ProtectedRoute from './ProtectedRoute';
import LoginRoute from './LoginRoute';
import { Store } from "./pages/Store";
import { Cart } from "./pages/Cart";
import { Profile } from "./pages/Profile";
import { Product } from "./pages/Product";
import { Payment } from "./pages/Payment";
import { Login } from "./Login";

export const Content = () => {
    return (
        <Switch>
            <Route exact path='/' component={Store} />
            <CartRoute exact path='/cart' component={Cart} />
            <ProtectedRoute exact path='/profile' component={Profile} />
            <ProtectedRoute exact path='/product' component={Product} />
            <ProtectedRoute exact path='/payment/:price' component={Payment} />
            <LoginRoute exact path='/login' component={Login} />
        </Switch>
    )
}
