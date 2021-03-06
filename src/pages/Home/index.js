import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'
import api from '../../services/api';
import "./styles.css";

import logoImg from '../../assets/logo.png'

export default function Home() {

    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [activityName, setActivityName] = useState('');
    var [usersData, setUsersData] = useState([]);

    async function fetchUsers() {
        const response = await api.get(`users?userName=${userName}&activityName=${activityName}`);
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
            <div className="content">
                <img src={logoImg} alt="lattessinio" />
                <div>

                    <form onSubmit={handleSearch}>
                        <h1>Opções de Pesquisa</h1>
                        <div>
                            Nome do usuario:
                            <input
                                placeholder="Nome do usuário"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>

                        <div>
                            Nome da atividade:
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
                    {usersData.sort((a, b) => a.name < b.name ? -1 : 1).map(renderUser)}
                </ul>
                <div className="menu">
                    <button onClick={() => handleRegisterUser()} type='button' title="Criar">
                        <FaPlus size={24} />
                    </button>
                </div>

            </div>
        </div>
    );
}
