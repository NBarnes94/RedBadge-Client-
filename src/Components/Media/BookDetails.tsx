import React, { Component } from 'react'
import { VGProps } from './ShowVG'
import { BookInfo } from './ShowBook'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Button} from '@material-ui/core'


type BookDProps = {
    sessionToken: string | null,
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
}
type BookDetail= {
    modal: boolean
}

export default class BookDetails extends Component<BookDProps, BookDetail>{
    constructor(props: BookDProps) {
        super(props)
        this.state={
            modal:false
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
                    <ModalHeader toggle={this.toggle}>
                        {this.props.title}
                    </ModalHeader>
                    <ModalBody>
                        <ol>
                            <li>{this.props.genre}</li>
                            <li>{this.props.author}</li>
                            <li>{this.props.status}</li>
                            <li>{this.props.description}</li>
                        </ol>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}