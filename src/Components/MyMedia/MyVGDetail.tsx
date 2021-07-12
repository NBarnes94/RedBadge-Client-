import React, {Component} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"
import APIUrl from '../helpers/environment'
import VGEdit from './EditVG'


type MyVGDProps = {
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
    fetchVG: any
}
type MyVGDetail={
    modal:boolean
}

export default class MyVGDetails extends Component<MyVGDProps, MyVGDetail>{
    constructor(props: MyVGDProps) {
        super(props)
        this.state={
            modal: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({modal: !this.state.modal})
        console.log("toggle hit");
        
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
                    <Button onClick={()=> {this.deleteVG(this.props.id)}}>Delete</Button>
                    <VGEdit sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre} developer={this.props.developer} platform={this.props.platform} status={this.props.status} description={this.props.description} id={this.props.id} fetchVG={this.props.fetchVG}/>
                </Modal> 
            </div>
        )
    }
}
