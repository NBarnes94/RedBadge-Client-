import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import { Navbar } from 'reactstrap'
import {Link, Route} from 'react-router-dom'
import './Navbar.css'

type NavProps = {
    updateToken: (newToken: string) => void;
    sessionToken: string | null;
    clearSession: any
}

export default class BigNavbar extends Component<NavProps>{
    constructor(props: NavProps) {
        super(props)
    }

    render() {
        return (
            <div>
                <Navbar className="nav">
                    <ul className="links" >
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/allMedia">View All</Link></li>
                        <li><Link to="/myPage">My Stuff</Link></li>
                    </ul>
                    <Button onClick={this.props.clearSession} className="logOut">Log Out</Button>                    
                </Navbar>
            </div>
        )
    }
}

