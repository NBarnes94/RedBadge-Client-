import React, { Component } from 'react';
import {Login} from './Login';
import {Register} from "./Register"

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
            <div>
                <div>
                    <h1>Welcome to whatever this is!</h1>
                    <p>This is a place for folks like yourself to keep a collection of Movies Video Games and Books that you have experienced and suggest them to others! Either log in or make a new account to get started </p>
                </div>
                <Login updateToken={this.props.updateToken}/>
                <Register updateToken={this.props.updateToken}/>
            </div>
        )
    }
    }