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
                <Login updateToken={this.props.updateToken}/>
                <Register updateToken={this.props.updateToken}/>
            </div>
        )
    }
    }