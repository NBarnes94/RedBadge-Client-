import React, { Component } from 'react';
import {Login} from './Login';
import {Register} from "./Register"
import "./Auth.css"

type UserInfo = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
};
type AcceptedProps = {
    updateToken: (newToken: string) => void
}

export class Auth extends Component<AcceptedProps, UserInfo>{
    constructor(props: AcceptedProps){
        super(props)
    }
    render(){
        return(
            <div className="auth">
                <div className="authInfo" >
                    <h1 className="authHeader">Welcome to Media Warehouse</h1>
                    <p className="authBody" >This is a place for folks like yourself to keep a collection of Movies Video Games and Books that you have experienced and suggest them to others! Either log in or make a new account to get started </p>
                </div>
                <Login updateToken={this.props.updateToken} />
                <Register updateToken={this.props.updateToken}/>
            </div>
        )
    }
    }