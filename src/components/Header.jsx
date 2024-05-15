import React from 'react';
import '../style/Header.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export const Header = () => {
  return (
    <div className='header_div'>
      <Link to="/">Loja</Link>
      <Link to="/cart">Carrinho</Link>
    </div>
  )
}

