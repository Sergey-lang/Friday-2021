import React from 'react';
import './App.css';
import NotFound from './Components/NotFound/NotFound';
import NavBar from './Components/NavBar/NavBar';
import {Redirect, Route, Switch} from 'react-router-dom';
import AllComponents from './AllComponents';
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import Profile from './Components/Profile/Profile';
import {useSelector} from 'react-redux';
import {RootStateType} from './Redux/store';
import ProgressBar from './Components/SuperComponents/ProgressBar/ProgressBar';
import {RequestStatusType} from './Redux/reducers/appReducer';
import {ResetPassword} from './Components/Password/ResetPassword';
import {PasswordRecovery} from './Components/Password/PasswordRecovery';
import CardPacks from './Components/CardPacks/CardPacks';

export const path = {
    LOGIN: '/login',
    REG: '/registration',
    PASSWORD: '/newPassword/:token?',
    PASS_REC: '/passwordRecovery',
    PROFILE: '/profile',
    ALL_COMPONENTS: '/allComponents',
    CARD_PACKS: '/CARD_PACKS',
    CARDS: '/CARDS'
}

function App() {

    const statusApp = useSelector<RootStateType, RequestStatusType>(state => state.app.statusResponse)

    return <div>
        <NavBar/>
        {statusApp === 'loading' ? <ProgressBar/> : null}

        <Switch>
            <Route path={'/'} exact render={() => <AllComponents/>}/>
            <Route path={path.LOGIN} exact render={() => <Login/>}/>
            <Route path={path.REG} exact render={() => <Registration statusApp={statusApp}/>}/>
            <Route path={path.PASSWORD} exact render={() => <ResetPassword/>}/>
            <Route path={path.PASS_REC} exact render={() => <PasswordRecovery/>}/>
            <Route path={path.PROFILE} exact render={() => <Profile/>}/>
            <Route path={path.CARD_PACKS} exact render={() => <CardPacks/>}/>
            {/*<Route path={path.CARDS} exact render={() => <Cards/>}/>*/}

            <Route path={'/404'} render={() => <NotFound/>}/>
            <Redirect from={'*'} to={'/404'}/>
        </Switch>

    </div>
}

export default App;
