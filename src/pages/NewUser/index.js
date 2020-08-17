import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import "./styles.css";

export default function NewUser() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [description, setDescription] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            address,
            email,
            tel,
            description,
        };

        try {
            await api.post('users', data);
            alert('Cadastro realizado com sucesso.');
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro. Tente novamente.');
        }
    }

    return (
        <div className="register-user-container">
            <div className="content">
                <div>
                    <h1>Cadastro de Usuário</h1>
                    <p>Cadastre um usuário, entre na plataforma.</p>
                </div>

                <form onSubmit={handleRegister}>
                    Nome:
                    <input
                        placeholder="Nome do usuário"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    E-mail:
                    <input
                        type="email"
                        placeholder="Endereço de e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    Endereço:
                    <input
                        placeholder="Endereço do usuário AAAAA"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    Telefone:
                    <input
                        placeholder="Telefone do usuário"
                        value={tel}
                        onChange={e => setTel(e.target.value)}
                    />
                    Resumo:
                    <input className="register-input"
                        type="text"
                        placeholder="Resumo sobre o usuário"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
