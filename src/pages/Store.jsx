import React, { useEffect, useState } from 'react';
import { BsFillCartPlusFill, BsFillCartCheckFill } from 'react-icons/bs';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import '../style/Global.css';
import { Header } from '../components/Header';

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
            <Header />
            <div className='product_area'>
                {
                    data.map((e) => (
                        <div key={e.id} className='product_div'>
                            <h4>{e.nome}</h4>
                            <img className="img_product" src={e.imagem_url} alt="" />
                            <h3>{parseFloat(e.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                            {/* <p class="description_product">{e.descricao}</p> */}
                            <button className='product_button'
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
