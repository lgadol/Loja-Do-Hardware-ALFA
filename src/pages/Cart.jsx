import React, { useState, useEffect } from 'react';
import { BsFillCartDashFill } from 'react-icons/bs';
import { Header } from '../components/Header';
import '../style/Global.css';

export const Cart = () => {
    const [data, setData] = useState([]);

    const fetchCart = async () => {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:4000/cart/${userId}`);
        if (response.ok) {
            const cartData = await response.json();
            setData(cartData);
        } else {
            console.error('Erro ao buscar os dados do carrinho: ', await response.json());
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItem = async (obj) => {
        await fetch(`http://localhost:4000/cart/${obj.id}`, {
            method: 'DELETE',
        });

        fetchCart();
    }

    const subTotal = data.reduce((acc, cur) => acc + parseFloat(cur.preco) * cur.quantidade, 0);
    const subTotalConvert = parseFloat(subTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (
        <div>
            <Header />
            <h3>{`SubTotal: ${subTotalConvert}`}</h3>
            <div className='product_area'>
                {
                    data.map((e) => (
                        <div key={e.id} className='product_div'>
                            <h4>{e.nome}</h4>
                            <img className="img_product" src={e.imagem_url} alt="" />
                            <h3>{parseFloat(e.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                            <h3>Quantidade: {e.quantidade}</h3>
                            <button className='product_button'
                                onClick={() => removeItem(e)}
                            >
                                <BsFillCartDashFill color='red'/>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
