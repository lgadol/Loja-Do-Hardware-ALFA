import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { toast } from 'react-toastify';
import '../style/Global.css'

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:4000/users/${userId}`);

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setEditedUser(userData);
            } else {
                console.error('Erro ao buscar os dados do usuário: ', await response.json());
            }
        }

        fetchUser();
    }, []);

    const handleInputChange = (event) => {
        setEditedUser({
            ...editedUser,
            [event.target.name]: event.target.value,
        });
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSave = async () => {

        // Verifique se a senha está correta antes de salvar
        const passwordResponse = await fetch(`http://localhost:4000/checkPassword/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        if (!passwordResponse.ok) {
            toast.error('Senha incorreta!', {
                position: "bottom-right",
                autoClose: 2000
            });
            return;
        }

        const response = await fetch(`http://localhost:4000/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUser),
        });

        if (response.ok) {
            setIsEditing(false);
            toast.success('Dados alterados com sucesso!', {
                position: "bottom-right",
                autoClose: 2000
            });

            // Refazer a solicitação para buscar os dados do usuário
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
        } else {
            console.error('Erro ao atualizar o usuário: ', await response.json());
        }
    };

    return (
        <div>
            <Header />
            {user && (
                <div>
                    {isEditing ? (
                        <div className='profile_editing_div'>
                            <h2>Editar Perfil</h2>
                            <input
                                type="text"
                                name="usuario"
                                value={editedUser.usuario}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="nome"
                                value={editedUser.nome}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="email"
                                value={editedUser.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="cpf"
                                value={editedUser.cpf}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="rua"
                                value={editedUser.rua}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="bairro"
                                value={editedUser.bairro}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="numero"
                                value={editedUser.numero}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="cep"
                                value={editedUser.cep}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="cidade"
                                value={editedUser.cidade}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="estado"
                                value={editedUser.estado}
                                onChange={handleInputChange}
                            />
                            <br />
                            <h3>Confirme com sua senha:</h3>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    ) : (
                        <div className='profile_information_div'>
                            <h2>Informações do Perfil</h2>
                            <p>{user.usuario}</p>
                            <p>{user.nome}</p>
                            <p>{user.email}</p>
                            <p>{user.cpf}</p>
                            <p>{user.rua}</p>
                            <p>{user.bairro}</p>
                            <p>{user.numero}</p>
                            <p>{user.cep}</p>
                            <p>{user.cidade}</p>
                            <p>{user.estado}</p>
                        </div>
                    )}
                    <button onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancelar' : 'Editar Perfil'}
                    </button>
                    {isEditing && (
                        <button onClick={handleSave} disabled={JSON.stringify(user) === JSON.stringify(editedUser) || password === ''}>
                            Salvar
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

