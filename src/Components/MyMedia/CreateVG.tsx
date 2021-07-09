import React, { Component } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import APIUrl from "../helpers/environment"
import {Form, Input, Label} from 'reactstrap'

type VGCProps = {
    sessionToken: string | null,
}

type VGCDetails = {
    modal: boolean
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
}
export default class VGCreate extends Component<VGCProps, VGCDetails>{
    constructor(props: VGCProps) {
        super(props)
        this.state = {
            modal: false,
            title: "",
            genre: "",
            developer: "",
            platform: "",
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
                developer: this.state.developer,
                platform: this.state.platform,
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
                <Button onClick={this.toggle}>Add a Video Game</Button>
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
                        <Label>Developer: </Label>
                        <Input onChange={(e)=> this.setState({developer: e.target.value})} name="developer" value={this.state.developer} />
                        <Label>Platform: </Label>
                        <Input onChange={(e)=> this.setState({platform: e.target.value})} name="platform" value={this.state.platform} />
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