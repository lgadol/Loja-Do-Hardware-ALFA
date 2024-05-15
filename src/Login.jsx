import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './style/Global.css'

export const Login = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const history = useHistory();

    const cond = (name.length > 3 && pass.length > 4);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = 'http://localhost:4000/users';
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Erro ao buscar os dados: ", error);
            }
        }
        fetchApi();
    }, [])

    const handleLogin = () => {
        const user = data.find(user => user.usuario === name);
        if (user) {
            if (user.senha === pass) {
                if (user.ativo === 1) {
                    localStorage.setItem('userToken', 'loggedIn');
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('userName', user.nome);
                    localStorage.setItem('isAdmin', user.admin);
                    history.push("/");
                } else {
                    alert("Usuário foi desativado.")
                }
            } else {
                alert("Senha incorreta.")
            }
        } else {
            alert("Nome de usuário não existe.")
        }
    }

    return (
        <div>
            <p>Usuário</p>
            <input
                type='text'
                onChange={({ target: { value } }) => setName(value)}
                value={name}
            />

            <p>Senha</p>
            <input
                type='password'
                onChange={({ target: { value } }) => setPass(value)}
                value={pass}
            />

            <br />
            <br />
            <button
                type="button"
                disabled={!cond}
                onClick={handleLogin}
            >
                Entrar
            </button>
        </div>
    )
}

