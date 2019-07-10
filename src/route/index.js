
import React, { Component } from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'

import App from '../component/App'

const Routes = () => {
    return <HashRouter>
        <Switch>
                <Route exact path='/' component={App}/>
        </Switch>
    </HashRouter>
}

export default Routes