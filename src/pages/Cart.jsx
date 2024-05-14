import React, { useState } from 'react';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { BsFillCartDashFill } from 'react-icons/bs';

export const Cart = () => {
    const [data, setData] = useState(getItem('carrinhoYt') || []);

    const removeItem = (obj) => {
        const arrFilter = data.filter((e) => e.id !== obj.id)
        setData(arrFilter);
        setItem('carrinhoYt', arrFilter);
    }

    return (
        <div>
            <h1>Carrinho</h1>
            <div>
                {
                    data.map((e) => (
                        <div key={e.id}>
                            <h4>{e.nome}</h4>
                            <img src={e.imagem_url} alt="" />
                            <h3>{e.preco}</h3>
                            <p>{e.descricao}</p>
                            <button
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