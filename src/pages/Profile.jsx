import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'

export const Profile = () => {
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
    

    return (
        <div>
            <Header />
            {user && (
                <div>
                    <h2>{user.nome}</h2>
                    <p>{user.usuario}</p>
                    {/* Outros dados do usuário */}
                </div>
            )}
        </div>
    )
}
