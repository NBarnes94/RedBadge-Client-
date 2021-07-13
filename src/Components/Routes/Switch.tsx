import React from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import App from '../../App';
import  {MyPage} from '../MyMedia/MyPage'
import MediaIndex from '../Media/MediaIndex'
import { Button } from '@material-ui/core';
import {Navbar} from 'reactstrap'


type RouterProps ={
    updateToken: (newToken: string ) => void;
    sessionToken: string | null ; 
    clearSession: any,
    getToken: any
}

const RouteDom: React.FC<RouterProps> = (props) =>{

    return(
        <div className="RouteDom">
            {/* <div className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/allMedia">View All</Link></li>
                    <li><Link to="/myPage">My Stuff</Link></li>
                </ul>
            </div> */}
            <div className="navRoute">
                <Switch>
                    <Route exact path="/home"><App /></Route>
                    <Route exact path="/allMedia"><MediaIndex getToken={props.getToken} sessionToken={props.sessionToken}/></Route>
                    <Route exact path="/myPage"><MyPage sessionToken={props.sessionToken}/></Route>
                </Switch>
            </div>
        </div>
    )
}
export default RouteDom;