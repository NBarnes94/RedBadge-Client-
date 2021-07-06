import React from 'react'
import {Route, Link, Switch} from 'react-router-dom';
import Auth from '../Auth/Auth';
import App from '../../App';
import  MyPage from '../MyMedia/MyPage'
import MediaIndex from '../Media/MediaIndex'

type RouterProps ={
    updateToken: (newToken: string ) => void;
    getToken(): (token: string | null) =>void 
}

const RouteDom: React.FC<RouterProps> = (props) =>{

    return(
        <div className="RouteDom">
            <div className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/allMedia">View All</Link></li>
                    <li><Link to="/myPage">My Stuff</Link></li>
                </ul>
            </div>
            <div className="navRoute">
                <Switch>
                    <Route exact path="/home"><App /></Route>
                    <Route exact path="/allMedia"><MediaIndex/></Route>
                    <Route exact path="/myPage"><MyPage /></Route>
                </Switch>
            </div>
        </div>
    )
}