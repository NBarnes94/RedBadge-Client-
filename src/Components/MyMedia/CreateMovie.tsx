import React, { Component } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import APIUrl from "../helpers/environment"
import {Form, Input, Label} from 'reactstrap'

type MovieCProps = {
    sessionToken: string | null,
}

type MovieCDetails = {
    modal: boolean
    title: string,
    genre: string,
    studio: string,
    runTime: string,
    description: string,
    status: string,
}
export default class MovieCreate extends Component<MovieCProps, MovieCDetails>{
    constructor(props: MovieCProps) {
        super(props)
        this.state = {
            modal: false,
            title: "",
            genre: "",
            studio: "",
            runTime: "",
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
                studio: this.state.studio,
                runTime: this.state.runTime,
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
                        <Label>studio: </Label>
                        <Input onChange={(e)=> this.setState({studio: e.target.value})} name="studio" value={this.state.studio} />
                        <Label>runTime: </Label>
                        <Input onChange={(e)=> this.setState({runTime: e.target.value})} name="runTime" value={this.state.runTime} />
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