import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NewUser from './pages/NewUser';
import Home from './pages/Home';
import ViewUser from './pages/ViewUser';
import EditUser from './pages/EditUser';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/users/view/:id" component={ViewUser} />
                <Route path="/users/edit/:id" component={EditUser} />
                <Route path="/users/register" component={NewUser} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}