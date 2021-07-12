import React, {Component} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"
import APIUrl from '../helpers/environment'
import BookEdit from './EditBook'

type MyBookDProps = {
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
    fetchBook: any
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
                    <BookEdit sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre}  author={this.props.author} status={this.props.status} description={this.props.description} id={this.props.id} fetchBook={this.props.fetchBook} />
                    <Button onClick={() => {this.deleteBook(this.props.id )}}>Delete Book</Button>
                </Modal> 
            </div>
        )
    }
}
