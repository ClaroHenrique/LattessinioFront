import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi'
import api from '../../services/api';

import "./styles.css";

var USERS_EXAMPLE = [
    { id: 1, name: 'Maria da Silva', email: 'mama@r.com', description: 'mestre' },
    { id: 2, name: 'Joao Ferreira', email: 'joao@g.com', description: 'graduando' },
    { id: 3, name: 'Jotaro Kujo', email: 'jojo@b.com', description: 'doutor' },
    { id: 4, name: 'Maria da Silva', email: 'mama@r.com', description: 'mestre' },
    { id: 5, name: 'Caroço Maroto', email: 'coco@g.com', description: 'graduando' },
]
var USERS_EXAMPLE2 = [
    { id: 1, name: 'Mario da Silva', email: 'mama@r.com', description: 'mestre' },
]

export default function Home() {

    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [activityName, setActivityName] = useState('');
    var [usersData, setUsersData] = useState([]);

    async function fetchUsers() {
        console.log(`users?userName=${userName}&activityName=${activityName}`);
        const response = await api.get(`users?userName=${userName}&actityName=${activityName}`);
        console.log(response.data);
        setUsersData(response.data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function handleViewUser(id) {
        history.push(`users/view/${id}`);
    }

    function renderUser(user) {
        return (
            <li key={user.id} onClick={() => handleViewUser(user.id)}>
                <div>
                    <span className="user-name">{user.name} </span>
                    <span className="user-email">{user.email}</span>
                </div>
                <div className="user-description">{user.description}</div>
            </li>
        );
    }

    async function handleSearch(e) {
        e.preventDefault();
        fetchUsers()
    }


    async function handleRegisterUser() {
        history.push('users/register/')
    }

    return (
        <div className="home-container">
            <div className="users-search">
                <h1>Usuários Cadastrados</h1>

                <div>
                    Opções para Pesquisa
                    <form onSubmit={handleSearch}>
                        <div>
                            nome do usuario:
                            <input
                                placeholder="Nome do usuário"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>

                        <div>
                            nome da atividade:
                        <input
                                placeholder="Nome da atividade"
                                value={activityName}
                                onChange={e => setActivityName(e.target.value)}
                            />
                        </div>

                        <button className="button" type="submit">Pesquisar</button>

                    </form>
                </div>

                <ul>
                    {usersData.map(renderUser)}
                </ul>
                <button onClick={() => handleRegisterUser()} type='button' title="Criar">
                    <FiPlus size={16} />
                </button>

            </div>
        </div>
    );
}
