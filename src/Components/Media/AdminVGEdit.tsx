import React, { Component } from 'react'
import { Button, Select, MenuItem } from '@material-ui/core'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import APIUrl from "../helpers/environment"
import { Form, Input, Label } from 'reactstrap'

type VGEProps = {
    sessionToken: string | null,
    id: number | string,
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string
    fetchVG: any
}

type VGEDetails = {
    modal: boolean
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
}
export default class AdminVGEdit extends Component<VGEProps, VGEDetails>{
    constructor(props: VGEProps) {
        super(props)
        this.state = {
            modal: false,
            title: this.props.title,
            genre: this.props.genre,
            developer: this.props.developer,
            platform: this.props.platform,
            description: this.props.description,
            status: this.props.status,
        }
        this.toggle = this.toggle.bind(this)
    }

    handleSubmit = (e: any) => {
        e.preventDefault();


        fetch(`${APIUrl}/videoGames/${this.props.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: this.state.title,
                genre: this.state.genre,
                developer: this.state.developer,
                platform: this.state.platform,
                description: this.state.description,
                status: this.state.status,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).then((res) => res.json())
            .then((vgToEdit) => {
                this.props.fetchVG()
                this.toggle()
                console.log(vgToEdit);

            })
    }


    toggle() {
        this.setState({ modal: !this.state.modal })
        console.log("toggle hit");

    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle}>Edit this game</Button>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Modal
                        isOpen={this.state.modal} fade={true} toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>
                            <Label htmlFor="Title">Title:</Label>
                            <Input onChange={(e) => this.setState({ title: e.target.value })} name="title" value={this.state.title} defaultValue={this.props.title} />
                        </ModalHeader>
                        <ModalBody>
                            <Label>Genre: </Label>
                            <Input onChange={(e) => this.setState({ genre: e.target.value })} name="genre" value={this.state.genre} />
                            <Label>developer: </Label>
                            <Input onChange={(e) => this.setState({ developer: e.target.value })} name="developer" value={this.state.developer} />
                            <Label>platform: </Label>
                            <Input onChange={(e) => this.setState({ platform: e.target.value })} name="platform" value={this.state.platform} />
                            <Label>Description: </Label>
                            <Input onChange={(e) => this.setState({ description: e.target.value })} name="description" value={this.state.description} />
                            {/* <Label>Status</Label> */}
                            {/* <Select onChange={(e)=> this.setState({status: e.target.value})} name="status" value={this.state.status}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem></MenuItem>
                        </Select> */}
                        </ModalBody>
                        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                    </Modal>
                </Form>
            </div>
        )
    }
}
