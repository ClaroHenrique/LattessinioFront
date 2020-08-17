import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
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

        console.log('Create User: ', data);
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
                <section>
                    <h1>Cadastro de Usuário</h1>
                    <p>Cadastre um usuário, entre na plataforma.</p>
                </section>

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
                        onChange={e => setEmail(e.target.email)}
                    />
                    Endereço:
                    <input
                        placeholder="Endereço do usuário"
                        value={address}
                        onChange={e => setAddress(e.target.address)}
                    />
                    Telefone:
                    <input
                        placeholder="Telefone do usuário"
                        value={tel}
                        onChange={e => setTel(e.target.tel)}
                    />
                    Resumo:
                    <input className="register-input"
                        type="text"
                        placeholder="Resumo sobre o usuário"
                        value={description}
                        onChange={e => setDescription(e.target.description)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}