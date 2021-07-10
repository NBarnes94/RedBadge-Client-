import React, {Component} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"
import APIUrl from '../helpers/environment'

type MyBookDProps = {
    sessionToken: string | null,
    id: number
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
}
type MyBookDDetail={
    modal:boolean
}

export default class MyBookDetails extends Component<MyBookDProps, MyBookDDetail>{
    constructor(props: MyBookDProps) {
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

    deleteBook() {
        fetch(`${APIUrl}/book/delete/${this.props.id}`,{
            method: "DELETE",
            headers: new Headers({
                'Content-Type': "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            })
        })

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
                            <li>{this.props.author}</li>
                            <li>{this.props.status}</li>
                            <li>{this.props.description}</li>
                        </ol>
                    </ModalBody>
                    <Button onClick={this.deleteBook}>Delete Book</Button>
                </Modal> 
            </div>
        )
    }
}
