import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header';
import { AiFillCheckCircle } from 'react-icons/ai';
import '../style/Global.css';

export const Payment = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:4000/users/${userId}`);

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.error('Erro ao buscar os dados do usuário: ', await response.json());
            }
        }

        fetchUser();
    }, []);

    const { params: { price } } = props.match
    const convertPrice = parseFloat(price)
    const formattedPrice = convertPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div>
            <Header />
            {user && (
                <div className='payment_div'>
                    <h2>Sua Compra foi concluída com sucesso!!</h2>
                    <span><AiFillCheckCircle /></span>
                    <h4>{`Valor: ${formattedPrice}`}</h4>
                    <h4>{`Comprador: ${user.nome}`}</h4>
                    <h4>{`Prazo: ${Math.ceil(Math.random() * 15) + 2} dias`}</h4>
                </div>
            )}
        </div>
    )
}
