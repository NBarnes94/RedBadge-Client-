import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';


type UserInfo = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
};

type AcceptedProps = {
    updateToken: (newToken: string) => void;
}

export class Login extends Component<AcceptedProps, UserInfo>{
    constructor(props: AcceptedProps){
        super(props);
        this.state ={
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    handleSubmit= (e:any) =>{
        e.preventDefault();

        fetch(`http://localhost:3005/user/login`,{
            method: 'POST', 
            body: JSON.stringify({ email: this.state.email, password: this.state.password}),

            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(
            (res) => res.json()
        ).then((data) =>{
            this.props.updateToken(data.sessionToken)
        })
    }

    render(){
        return(
            <div>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input onChange={(e) => this.setState({email: e.target.value})} name="email" value={this.state.email}/>
                        <Label htmlFor="password">Password:</Label>
                        <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.state.password}/>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}