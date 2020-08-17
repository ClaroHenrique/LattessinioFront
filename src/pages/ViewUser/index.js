import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash, FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';

import "./styles.css";



export default function ViewUser({ match }) {


    const history = useHistory();
    const userId = match.params.id;
    var [userData, setUserData] = useState([]);

    async function fetchUser() {
        const response = await api.get(`users/${userId}`);
        setUserData(response.data);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    async function handleGoBack() {
        history.push('/');
    }

    async function handleEditUser(id) {
        history.push(`/users/edit/${id}`);
    }

    async function handleDeleteUser(id, userName, activityName) {
        try {
            await api.delete(`users/${id}`);
            history.push('/')
        } catch{
            alert('Erro ao deletar usuário. Tente novamente.')
        }
    }

    function renderUserInfo(user) {
        return (
            <div className="user-info">

                <div className="user-name">{user.name}</div>

                <div className="user-description">
                    {user.description}
                </div>

                <div className="title">Informações de Contato <hr /></div>

                <div className='attribute'>
                    <div className='label'>Nome:</div>
                    <div className='value'>{user.name}</div>
                </div>

                <div className='attribute'>
                    <div className='label'>E-mail:</div>
                    <div className='value'>{user.email}</div>
                </div>

                <div className='attribute'>
                    <div className='label'>Telefone:</div>
                    <div className='value'>{user.tel}</div>
                </div>

                <div className='attribute'>
                    <div className='label'>Endereço:</div>
                    <div className='value'>{user.address}</div>
                </div>
            </div>
        );
    }

    function renderActivity(activity) {
        return (
            <li key={activity.id}>

                <div className='attribute'>
                    <div className='label'>{activity.name}</div>
                    <div className='value'>{activity.description}</div>
                </div>

            </li>
        );
    }

    function renderActivities(activities) {
        if (activities) {
            return (
                <span>
                    <div className="title">Atividades <hr /></div>
                    <ul>{activities.map(renderActivity)}</ul>
                </span>
            )
        }
        return (<span />);
    }

    function renderMenu(userId) {
        return (<div className="menu">
            <button onClick={() => handleGoBack()} type='button' title="Retornar">
                <FiArrowLeft size={32} />
            </button>
            <button onClick={() => handleEditUser(userId)} type='button' title="Editar">
                <FiEdit size={32} />
            </button>
            <button onClick={() => handleDeleteUser(userId)} type='button' title="Deletar">
                <FiTrash size={32} />
            </button>
        </div>);
    }

    return (
        <div className="view-user-container">
            <div className="content">

                {renderMenu(userData.id)}

                {renderUserInfo(userData)}

                <div className="activities-info">
                    <ul>
                        {renderActivities(userData.activities)}
                    </ul>
                </div>
            </div>

        </div>
    );
}
