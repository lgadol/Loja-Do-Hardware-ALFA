import React, { useEffect, useState } from 'react';
import { BsFillCartPlusFill, BsFillCartCheckFill } from 'react-icons/bs';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { Header } from '../components/Header';
import '../style/Global.css';

export const Store = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoYt') || []);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = 'http://localhost:4000/';
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Erro ao buscar os dados: ", error);
            }
        }
        fetchApi();
    }, [])

    const handleQuantityChange = (id, quantity) => {
        setQuantities({
            ...quantities,
            [id]: quantity,
        });
    };

    const handleClick = async (obj) => {
        const userId = localStorage.getItem('userId');
        const quantity = quantities[obj.id] || 1;

        setCart([...cart, obj]);
        setItem('carrinhoYt', [...cart, obj]);

        // Adicionar item ao carrinho no banco de dados
        await fetch('http://localhost:4000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: userId,
                id_produto: obj.id,
                quantidade: quantity,
            }),
        });
    }

    return (
        <div>
            <Header />
            <div className='product_area'>
                {
                    data.map((e) => (
                        <div key={e.id} className='product_div'>
                            <h4>{e.nome}</h4>
                            <img className="img_product" src={e.imagem_url} alt="" />
                            <h3>{parseFloat(e.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                            <div className='cart_div'>
                                <input className='cartQuanty_input'
                                    type="number"
                                    min="1"
                                    value={quantities[e.id] || ''}
                                    onChange={(event) => handleQuantityChange(e.id, event.target.value)}
                                />
                                <button className='product_button' onClick={() => handleClick(e)}>
                                    <BsFillCartPlusFill  />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
