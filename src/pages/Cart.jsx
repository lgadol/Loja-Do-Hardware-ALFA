import React, { useState } from 'react';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { BsFillCartDashFill } from 'react-icons/bs';
import '../style/Global.css';
import { Header } from '../components/Header';

export const Cart = () => {
    const [data, setData] = useState(getItem('carrinhoYt') || []);

    const removeItem = (obj) => {
        const arrFilter = data.filter((e) => e.id !== obj.id)
        setData(arrFilter);
        setItem('carrinhoYt', arrFilter);
    }

    const subTotal = data.reduce((acc, cur) => acc + cur.price ,0)

    return (
        <div>
            <Header />
            <h3>{`Subtotal: ${subTotal}`}</h3>
            <div className='product_area'>
                {
                    data.map((e) => (
                        <div key={e.id} className='product_div'>
                            <h4>{e.nome}</h4>
                            <img className="img_product" src={e.imagem_url} alt="" />
                            <h3>{parseFloat(e.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                            {/* <p class="description_product">{e.descricao}</p> */}
                            <button className='product_button'
                                onClick={() => removeItem(e)}
                            >
                                <BsFillCartDashFill />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}