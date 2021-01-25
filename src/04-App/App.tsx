import React from 'react';
import NotFound from '../03-Components/NotFound/NotFound';
import NavBar from '../03-Components/NavBar/NavBar';
import {Redirect, Route, Switch} from 'react-router-dom';
import AllComponents from './AllComponents';
import Login from '../02-Pages/01-Login/Login';
import Registration from '../02-Pages/02-Registration/Registration';
import Profile from '../02-Pages/04-Profile/Profile';
import {useSelector} from 'react-redux';
import {RootStateType} from './store';
import ProgressBar from '../03-Components/SuperComponents/ProgressBar/ProgressBar';
import {ResetPassword} from '../02-Pages/03-Password/ResetPassword';
import {PasswordRecovery} from '../02-Pages/03-Password/PasswordRecovery';
import CardPacks from '../02-Pages/05-CardPacks/CardPacks';
import Cards from '../02-Pages/06-Cards/Cards';

import './App.css';
import LearningPage from '../02-Pages/07-Learning/LearningPage';

export const path = {
    LOGIN: '/login',
    REG: '/registration',
    PASSWORD: '/newPassword/:token?',
    PASS_REC: '/passwordRecovery',
    PROFILE: '/profile',
    ALL_COMPONENTS: '/allComponents',
    CARD_PACKS: '/card_packs',
    CARDS: '/cards',
    LEARNING: '/learning',
}

const App: React.FC = () => {

    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)

    return <div>
        <NavBar/>
        {appStatus === 'loading' ? <ProgressBar/> : null}

        <Switch>
            <Route path={'/'} exact render={() => <AllComponents/>}/>

            <Route path={path.LOGIN} exact render={() => <Login/>}/>
            <Route path={path.REG} exact render={() => <Registration/>}/>
            <Route path={path.PASSWORD} exact render={() => <ResetPassword/>}/>
            <Route path={path.PASS_REC} exact render={() => <PasswordRecovery/>}/>
            <Route path={path.PROFILE} exact render={() => <Profile/>}/>
            <Route path={path.CARD_PACKS} exact render={() => <CardPacks/>}/>
            <Route path={path.CARDS + '/:id'} exact render={() => <Cards/>}/>
            <Route path={path.LEARNING + '/:id'} exact render={() => <LearningPage/>}/>

            <Route path={'/404'} render={() => <NotFound/>}/>
            <Redirect from={'*'} to={'/404'}/>
        </Switch>

    </div>
}

export default App;
