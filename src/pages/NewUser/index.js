import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'
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

        if (!name || !email) {
            alert('Os campos obrigatórios não foram preenchidos.');
            return;
        }

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

    async function handleGoBack() {
        history.push('/');
    }

    return (
        <div className="register-user-container">
            <div className="content">

                <div className="menu">
                    <button onClick={() => handleGoBack()} type='button' title="Retornar">
                        <FaArrowLeft size={32} />
                    </button>
                </div>

                <div>
                    <h1>Cadastro de Usuário</h1>
                </div>

                <form onSubmit={handleRegister}>
                    Nome <span className="advice">*</span>
                    <input
                        placeholder="Nome do usuário"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    E-mail <span className="advice">*</span>
                    <input
                        type="email"
                        placeholder="Endereço de e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    Endereço
                    <input
                        placeholder="Endereço do usuário"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    Telefone
                    <input
                        placeholder="Telefone do usuário"
                        value={tel}
                        onChange={e => setTel(e.target.value)}
                    />
                    Resumo
                    <input className="register-input"
                        type="text"
                        placeholder="Resumo sobre o usuário"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <span className="advice">* Campos obrigatórios.</span>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
