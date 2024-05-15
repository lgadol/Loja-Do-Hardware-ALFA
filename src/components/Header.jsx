import React, { useState, useEffect } from 'react';
import '../style/Header.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaCrown, FaUser, FaSignInAlt, FaShoppingCart, FaStore } from 'react-icons/fa';

export const Header = () => {
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const isAdmin = localStorage.getItem('isAdmin');

    useEffect(() => {
        setUserName(localStorage.getItem('userName'));
    }, []);

    return (
        <div className='header_div'>
            <Link to="/"><FaStore /> Loja</Link>
            <Link to="/cart"><FaShoppingCart /> Carrinho</Link>
            {userName ? (
                <p className='header_p'>
                    Bem-vindo
                    <br />
                    {isAdmin === '1' ? <FaCrown color='yellow' /> : <FaUser color='white' />}
                    {" "} <Link to="/profile">{userName}</Link>
                </p>
            ) : (
                <Link to="/login"><FaSignInAlt /> Entrar</Link>
            )}
        </div>
    )
}
