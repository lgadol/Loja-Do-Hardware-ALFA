import React from 'react'
import { Header } from '../components/Header'
import '../style/Global.css';
import { Link } from 'react-router-dom';

export const Product = () => {
    const saveData = () => {
        // Código para salvar os dados no banco de dados
    }

    return (
        <div>
            <Header />
            <h1>Adicionar Produto</h1>
            <div className='edit_product_div'>
                <div className="input_group">
                    <label>Nome: </label>
                    <input
                        type="text"
                        name="nome"
                    />
                </div>
                <div className="input_group">
                    <label>Descrição: </label>
                    <input
                        type="text"
                        name="descricao"
                    />
                </div>
                <div className="input_group">
                    <label>Preço: </label>
                    <input
                        type="text"
                        name="preco"
                    />
                </div>
                <div className="input_group">
                    <label>Imagem: </label>
                    <input
                        type="text"
                        name="imagem"
                    />
                </div>
                <button onClick={saveData}>Salvar</button>
                <Link to="/">
                    <button>Cancelar</button>
                </Link>
            </div>
        </div>
    )
}
