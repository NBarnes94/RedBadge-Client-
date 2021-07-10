import React, { Component } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import APIUrl from "../helpers/environment"
import {Form, Input, Label} from 'reactstrap'

type BookCProps = {
    sessionToken: string | null,
}

type BookCDetails = {
    modal: boolean
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
}
export default class BookCreate extends Component<BookCProps, BookCDetails>{
    constructor(props: BookCProps) {
        super(props)
        this.state = {
            modal: false,
            title: "",
            genre: "",
            author: "",
            description: "",
            status: "",
        }
        this.toggle = this.toggle.bind(this)
    }

    handleSubmit = (e: any) =>{
        e.preventDefault();

        fetch(`${APIUrl}/videoGames/create`, {
            method: "POST",
            body: JSON.stringify({
                title: this.state.title,
                genre: this.state.genre,
                author: this.state.author,
                description: this.state.description,
                status: this.state.status
            }),
            headers: new Headers({
                'Content-Type': 'application/json', 
                'Authorization': `${localStorage.getItem('token')}`
            })
        })
        .then((res) => res.json()
        ).then((videogames1) => {
            console.log(videogames1);
            
        })
    }

    toggle() {
        this.setState({ modal: !this.state.modal })
        console.log("toggle hit");

    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle}>Add a Movie</Button>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                <Modal
                    isOpen={this.state.modal} fade={true} toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        <Label htmlFor="Title">Title:</Label>
                        <Input onChange={(e) => this.setState({title: e.target.value})} name="title" value={this.state.title} />
                    </ModalHeader>
                    <ModalBody>
                        <Label>Genre: </Label>
                        <Input onChange={(e)=> this.setState({genre: e.target.value})} name="genre" value={this.state.genre} />
                        <Label>author: </Label>
                        <Input onChange={(e)=> this.setState({author: e.target.value})} name="author" value={this.state.author} />
                        <Label>Description: </Label>
                        <Input onChange={(e)=> this.setState({description: e.target.value})} name="description" value={this.state.description} />
                        {/* <Label>Status</Label> */}
                        {/* <Select onChange={(e)=> this.setState({status: e.target.value})} name="status" value={this.state.status}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem></MenuItem>
                        </Select> */}
                    </ModalBody>
                <Button type="submit" onClick={this.toggle}>Submit</Button>
                </Modal>
                </Form>
            </div>
        )
    }
}