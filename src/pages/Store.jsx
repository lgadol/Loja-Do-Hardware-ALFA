import React, { useEffect, useState } from 'react';
import { BsFillCartPlusFill, BsFillCartCheckFill } from 'react-icons/bs';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const Store = () => {

    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoYt') || []);

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

    const handleClick = (obj) => {

        const element = cart.find((e) => e.id === obj.id);

        if (element) {
            const arrFilter = cart.filter((e) => e.id !== obj.id);
            setCart(arrFilter);
            setItem('carrinhoYt', arrFilter);
        } else {
            setCart([...cart, obj]);
            setItem('carrinhoYt', [...cart, obj]);
        }
    }

    return (
        <div>
            <Link to='/cart'>Carrinho</Link>
            <h1>Loja</h1>
            <div>
                {
                    data.map((e) => (
                        <div key={e.id}>
                            <h4>{e.nome}</h4>
                            <img src={e.imagem_url} alt="" />
                            <h3>{e.preco}</h3>
                            <p>{e.descricao}</p>
                            <button
                                onClick={() => handleClick(e)}
                            >
                                {
                                    cart.some((itemCart) => itemCart.id === e.id) ? (
                                        <BsFillCartCheckFill />
                                    ) : (
                                        <BsFillCartPlusFill />
                                    )
                                }
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
