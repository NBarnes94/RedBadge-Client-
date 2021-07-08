import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useState, useEffect } from 'react'
import APIUrl from '../helpers/environment';


type UserInfo = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
};

type AcceptedProps = {
    updateToken: (newToken: string) => void;
}

export class Register extends Component<AcceptedProps, UserInfo>{
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    }


    handleSubmit = (e: any) => {
        e.preventDefault();

        fetch(`${APIUrl}/user/register`, {

            method: 'POST',

            body: JSON.stringify({ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password }),

            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then(
                (response) => response.json()
            ).then((data) => {
                this.props.updateToken(data.token)
            })
    }

    render() {
        return (
            <div>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <FormGroup>
                        <Label htmlFor="firstName">First Name:</Label>
                            <Input onChange={(e) => this.setState({firstName: e.target.value})} name="firstName" value={this.state.firstName} />
                        <Label htmlFor="lastName">Last Name: </Label>
                            <Input onChange={(e) => this.setState({lastName: e.target.value})} name="lastName" value={this.state.lastName} />
                        <Label htmlFor="email">Email:</Label>
                            <Input onChange={(e) => this.setState({email: e.target.value})} name="email" value={this.state.email} />
                        <Label htmlFor="password">Password:</Label>
                            <Input onChange={(e) => this.setState({password: e.target.value})} name="password" type="password" value={this.state.password} />
                    </FormGroup>
                    <Button type="submit">Register</Button>
                </Form>
            </div>
        )
    }
}