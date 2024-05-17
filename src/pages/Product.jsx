import React, { useState } from 'react';
import { Header } from '../components/Header';
import '../style/Global.css';
import { Link } from 'react-router-dom';

export const Product = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem_url, setImagem] = useState('');

    const saveData = async () => {
        const response = await fetch(`http://localhost:4000/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                descricao,
                preco,
                imagem_url
            })
        });

        if (response.ok) {
            console.log('Dados salvos com sucesso');
        } else {
            console.error('Erro ao salvar os dados: ', await response.json());
        }
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
                        value={nome.toUpperCase()}
                        onChange={e => setNome(e.target.value)}
                    />
                </div>
                <div className="input_group">
                    <label>Descrição: </label>
                    <input
                        type="text"
                        name="descricao"
                        value={descricao.toUpperCase()}
                        onChange={e => setDescricao(e.target.value)}
                    />
                </div>
                <div className="input_group">
                    <label>Preço: </label>
                    <input
                        type="text"
                        name="preco"
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                    />
                </div>
                <div className="input_group">
                    <label>Imagem: </label>
                    <input
                        type="text"
                        name="imagem"
                        value={imagem_url}
                        onChange={e => setImagem(e.target.value)}
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
