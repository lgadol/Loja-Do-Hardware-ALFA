import React, { useEffect, useState } from 'react';
import { BsFillCartPlusFill, BsTrash3Fill, BsPlusCircle } from 'react-icons/bs';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import '../style/Global.css';
import { toast } from 'react-toastify';

export const Store = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoYt') || []);
    const [quantities, setQuantities] = useState({});

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

    useEffect(() => {
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
        const quantity = quantities[obj.id] || '0';

        if (quantity === '0') {
            toast.error('O valor mínimo para adicionar é 1.', {
                autoClose: 2000,
                position: 'bottom-right'
            });
            return;
        }

        setCart([...cart, obj]);
        setItem('carrinhoYt', [...cart, obj]);

        // Adicionar item ao carrinho no banco de dados
        const response = await fetch('http://localhost:4000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: userId,
                id_produto: obj.id,
                quantidade: Number(quantity),
            }),
        });

        if (response.ok) {
            toast.success('Produto adicionado ao carrinho com sucesso!', {
                autoClose: 2000,
                position: 'bottom-right'
            });
        } else {
            toast.error('Houve um problema ao adicionar o produto ao carrinho.', {
                autoClose: 2000,
                position: 'bottom-right'
            });
        }
    }

    const handleDelete = async (obj) => {
        const confirmation = window.confirm("Você quer excluir este produto?");
        if (confirmation) {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:4000/product/${obj.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_usuario: userId,
                    ativo: 0,
                }),
            });

            if (response.ok) {
                toast.success("Produto excluído com sucesso!", {
                    position: "bottom-right",
                    autoClose: 2000
                });
                fetchApi();
            } else {
                toast.error("Erro ao excluir o produto.", {
                    position: "bottom-right",
                    autoClose: 2000
                });
            }
        }
    }

    return (
        <div>
            <Header />
            {localStorage.getItem('isAdmin') === '1' &&
                <div className='add_product_div'>
                    <Link to="/product">
                        <p><BsPlusCircle /> Adicionar produto</p>
                    </Link>
                </div>
            }
            <div className='product_area'>
                {
                    data.map((e) => (
                        <div key={e.id} className='product_div'>
                            <p className='trash_button'>{localStorage.getItem('isAdmin') === '1' && <BsTrash3Fill color='red' onClick={() => handleDelete(e)} />}</p>
                            <h4>{e.nome}</h4>
                            <img className="img_product" src={e.imagem_url} alt="" />
                            <h3>{parseFloat(e.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                            <div className='cart_div'>
                                <input className='cartQuanty_input'
                                    type="number"
                                    min="1"
                                    value={quantities[e.id] || '0'}
                                    onChange={(event) => handleQuantityChange(e.id, event.target.value)}
                                />
                                <button className='product_button' onClick={() => handleClick(e)}>
                                    <BsFillCartPlusFill color='green' />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
