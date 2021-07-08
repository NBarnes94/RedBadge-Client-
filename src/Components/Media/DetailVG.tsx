import React, { Component } from 'react'
import { VGProps } from './ShowVG'
import { VGInfo } from './ShowVG'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"


type VGDProps = {
    sessionToken: string | null,
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
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
                </Modal> 
            </div>
        )
    }
}