import React, { Component } from 'react'
import { VGProps } from './ShowVG'
import { VGInfo } from './ShowVG'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"
import APIUrl from '../helpers/environment'
import AdminVGEdit from './AdminVGEdit'

type VGDProps = {
    sessionToken: string | null,
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
    fetchVG: any,
    role: string,
    id: number
}
type VGDetail={
    modal:boolean
}

export default class VGDetails extends Component<VGDProps, VGDetail>{
    constructor(props: VGDProps) {
        super(props)
        this.state={
            modal: false
        }
        this.toggle = this.toggle.bind(this)
    }

    deleteVG(id: number) {
        fetch(`${APIUrl}/videoGames/delete/${id}`,{
            method: "DELETE",
            headers: new Headers({
                'Content-Type': "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            })
        })
        this.props.fetchVG()
    }

    toggle() {
        this.setState({modal: !this.state.modal})
        console.log("toggle hit");
        
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle}>Details</Button>
                <Modal 
                isOpen={this.state.modal} fade={true} toggle={this.toggle}
                >
                    <ModalHeader 
                    toggle={this.toggle}
                    >
                        {this.props.title}
                    </ModalHeader>
                    <ModalBody>
                        <ol>
                            <li>{this.props.genre}</li>
                            <li>{this.props.platform}</li>
                            <li>{this.props.developer}</li>
                            <li>{this.props.status}</li>
                            <li>{this.props.description}</li>
                        </ol>
                    </ModalBody>
                    {this.props.role == "admin" ? <div> <AdminVGEdit sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre}  developer={this.props.developer}
                    platform={this.props.platform} status={this.props.status} description={this.props.description} id={this.props.id} fetchVG={this.props.fetchVG} /> <Button onClick={() => {this.deleteVG(this.props.id)}}>Delete Movie</Button> </div> : null}
                </Modal> 
            </div>
        )
    }
}
