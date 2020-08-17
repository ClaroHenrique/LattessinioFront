import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { FiTrash, FiPlus, FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';
import "./styles.css";

const ACTIVITIES_EXAMPLE = [
    { id: 13, userId: 1, name: 'Javaskrito', description: 'basico do kakasrcrito', category: 'curso' },
    { id: 14, userId: 1, name: 'Python', description: 'basico do pai ton', category: 'curso' },
    { id: 15, userId: 1, name: 'Teddy Ed', description: 'ensinei muito la kkj', category: 'palestra' },
]
const USERS_EXAMPLE = {
    id: 1,
    name: 'Mario da Silva',
    email: 'mama@r.com',
    tel: '93420948203',
    description: 'Professora assistente da Universidade Federal do Ceará no Campus de Quixadá. Iniciou seu doutorado na Universidade Federal do Ceará em março de 2016. Em 2018 foi estudante de doutorado sanduíche na Univeristé de Versailles Saint-Quentin, em Versalhes, França Sua proposta de tese é sobre predição de trajetórias.',
    address: 'rua da esquina ',
    activities: ACTIVITIES_EXAMPLE,
}

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

        console.log(response);

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
    //console.log('Update User: ', { name, address, email, tel, description, activities });

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
        console.log('Update User: ', data);
        try {
            await api.put(`users/${userId}`, data);
            alert('Usuário atualizado com sucesso.');
            history.push(`/users/view/${userId}`);
        } catch (err) {
            console.log(err);
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

    function handleDeleteActivity(id) {
        console.log(activities);
        setActivities(activities.filter(activity => activity.id != id));
        console.log(activities);
    }

    function renderEditActivity(activity, index) {

        console.log(tel);
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

                <button onClick={() => handleDeleteActivity(activity.id)} type='button' title="Deletar">
                    <FiTrash size={16} />
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
                    <button onClick={() => handleCreateActivity()} type='button' title="Criar">
                        <FiPlus size={32} />
                    </button>
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
                        <FiArrowLeft size={32} />
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
