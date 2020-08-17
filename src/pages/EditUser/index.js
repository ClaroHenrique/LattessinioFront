import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa'
import api from '../../services/api';
import "./styles.css";

export default function EditUser({ match }) {

    const history = useHistory();

    const userId = match.params.id;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [description, setDescription] = useState('');
    const [activities, setActivities] = useState([]);

    async function fetchUser() {
        const response = await api.get(`users/${userId}`);
        const user = response.data;

        setName(user.name);
        setAddress(user.address);
        setEmail(user.email);
        setTel(user.tel);
        setDescription(user.description);
        setActivities(user.activities);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    async function handleGoBack() {
        history.push(`/users/view/${userId}`);
    }

    async function handleUpdateUser(e) {
        e.preventDefault();

        const data = {
            userId,
            name,
            address,
            email,
            tel,
            description,
            activities,
        };

        try {
            await api.put(`users/${userId}`, data);
            alert('Usuário atualizado com sucesso.');
            history.push(`/users/view/${userId}`);
        } catch (err) {
            alert('Erro ao editar. Tente novamente.');
        }
    }

    function renderUserEdit() {
        return (
            <div>
                <div className="title">Informações de Contato <hr /></div>

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
                    placeholder="Endereço do usuário"
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

            </div >
        );
    }

    function handleCreateActivity(id) {
        const newActivity = {
            userId: userId,
            name: '',
            description: '',
        }
        setActivities(activities.concat(newActivity));
    }

    function handleDeleteActivity(index) {
        setActivities(activities.filter((_, i) => i != index));
    }

    function renderEditActivity(activity, index) {

        return (
            <li id={activity.id}>
                Nome da atividade:
                <input
                    placeholder="Nome da atividade"
                    value={activity.name}
                    onChange={e => {
                        var newActivity = activity;
                        newActivity.name = e.target.value;
                        setActivities(activities.map((a, i) => i == index ? newActivity : a));
                    }}
                />

                Descrição da atividade:
                <input
                    placeholder="Descrição da atividade"
                    value={activity.description}
                    onChange={e => {
                        var newActivity = activity;
                        newActivity.description = e.target.value;
                        setActivities(activities.map((a, i) => i == index ? newActivity : a));
                    }}
                />

                <button onClick={() => handleDeleteActivity(index)} type='button' title="Deletar">
                    <FaTrash size={16} />
                </button>
            </li>
        )
    }

    function renderActivitiesEdit(activities) {
        if (activities) {
            return (
                <div>
                    <div className="title">Atividades<hr /></div>
                    <ul>
                        {activities.map(renderEditActivity)}
                    </ul>
                    <div className="menu">
                        <button onClick={() => handleCreateActivity()} type='button' title="Criar">
                            <FaPlus size={24} />
                        </button>
                    </div>
                </div>
            )
        } else {
            return (<span />)
        }
    }

    return (
        <div className="edit-user-container">
            <div className="content">
                <div className="menu">
                    <button onClick={() => handleGoBack()} type='button' title="Retornar">
                        <FaArrowLeft size={32} />
                    </button>
                </div>

                <form onSubmit={handleUpdateUser}>
                    <div >
                        {renderUserEdit()}
                    </div>
                    <div>
                        {renderActivitiesEdit(activities)}
                    </div>

                    <button className="button" type="submit">Salvar Alterações</button>
                    <button className="button" type="reset" onClick={fetchUser}>Cancelar Alterações</button>
                </form>
            </div>
        </div>
    );
}
