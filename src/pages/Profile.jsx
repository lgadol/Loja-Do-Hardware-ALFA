import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { toast } from 'react-toastify';
import '../style/Global.css'
import { EstadosBrasileiros } from '../services/Vars';

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
    }, [isEditing]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let errorMessage = '';

        switch (name) {
            case 'usuario':
                if (value.length > 20 || /[^a-zA-Z0-9]/.test(value)) {
                    errorMessage = 'O usuário não pode ter mais de 20 caracteres ou conter caracteres especiais';
                }
                break;
            case 'nome':
                if (value.length > 50 || /[^a-zA-Z\s]/.test(value)) {
                    errorMessage = 'O nome não pode ter mais de 50 caracteres ou conter caracteres especiais';
                }
                break;
            case 'email':
                if (value.length > 50) {
                    errorMessage = 'O email não pode ter mais de 50 caracteres';
                }
                break;
            case 'cpf':
                if (value.length > 11 || /\D/.test(value)) {
                    errorMessage = 'O CPF não pode ter mais de 11 caracteres e só pode conter números';
                }
                break;
            case 'rua':
                if (value.length > 150 || /[^a-zA-Z\s]/.test(value)) {
                    errorMessage = 'A rua não pode ter mais de 150 caracteres e só pode conter letras';
                }
                break;
            case 'bairro':
                if (value.length > 50 || /[^a-zA-Z\s]/.test(value)) {
                    errorMessage = 'O bairro não pode ter mais de 50 caracteres ou conter caracteres especiais';
                }
                break;
            case 'numero':
                if (value.length > 20 || /\D/.test(value)) {
                    errorMessage = 'O número não pode ter mais de 20 caracteres e só pode conter números';
                }
                break;
            case 'cep':
                if (value.length > 8 || /\D/.test(value)) {
                    errorMessage = 'O CEP não pode ter mais de 8 caracteres e só pode conter números';
                }
                break;
            case 'cidade':
                if (value.length > 150 || /[^a-zA-Z\s]/.test(value)) {
                    errorMessage = 'A cidade não pode ter mais de 150 caracteres e só pode conter letras';
                }
                break;
            default:
                break;
        }

        if (errorMessage) {
            toast.error(errorMessage, {
                position: "bottom-right",
                autoClose: 2000
            });
        } else {
            setEditedUser({
                ...editedUser,
                [name]: value,
            });
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSave = async () => {

        // Verificar se o nome de usuário já existe
        const userCheckResponse = await fetch(`http://localhost:4000/checkUser/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario: editedUser.usuario }),
        });

        if (!userCheckResponse.ok) {
            const { message } = await userCheckResponse.json();
            toast.error(message, {
                position: "bottom-right",
                autoClose: 2000
            });
            return;
        }

        // Verificar se o email já existe
        const emailCheckResponse = await fetch(`http://localhost:4000/checkEmail/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: editedUser.email }),
        });

        if (!emailCheckResponse.ok) {
            const { message } = await emailCheckResponse.json();
            toast.error(message, {
                position: "bottom-right",
                autoClose: 2000
            });
            return;
        }

        // Verificar se o cpf já existe
        const cpfCheckResponse = await fetch(`http://localhost:4000/checkCpf/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf: editedUser.cpf }),
        });

        if (!cpfCheckResponse.ok) {
            const { message } = await cpfCheckResponse.json();
            toast.error(message, {
                position: "bottom-right",
                autoClose: 2000
            });
            return;
        }

        // Verificar se a senha está correta antes de salvar
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
                                value={editedUser.nome.toUpperCase()}
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
                                value={editedUser.rua.toUpperCase()}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="bairro"
                                value={editedUser.bairro.toUpperCase()}
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
                                value={editedUser.cidade.toUpperCase()}
                                onChange={handleInputChange}
                            />
                            <EstadosBrasileiros
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

