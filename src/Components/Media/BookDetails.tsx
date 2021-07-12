import React, { Component } from 'react'
import { VGProps } from './ShowVG'
import { BookInfo } from './ShowBook'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Button} from '@material-ui/core';
import APIUrl from '../helpers/environment'
import BookEdit from './AdminBookEdit'


type BookDProps = {
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
    role: string,
    fetchBook: any

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
    deleteBook(id: number) {
        fetch(`${APIUrl}/book/delete/${id}`,{
            method: "DELETE",
            headers: new Headers({
                'Content-Type': "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            })
        })
        .then((bookToDelete) =>{
            this.props.fetchBook()
            this.toggle()
            console.log(bookToDelete);
            
        })
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
                    {this.props.role == "admin" ? <div> <BookEdit sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre}  author={this.props.author} status={this.props.status} description={this.props.description} id={this.props.id} fetchBook={this.props.fetchBook} /> <Button onClick={() => {this.deleteBook(this.props.id)}}>Delete Book</Button> </div> : null}
                </Modal>
            </div>
        )
    }
}