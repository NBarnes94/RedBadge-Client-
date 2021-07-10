import React, { useEffect, useState, Component } from 'react'
import { makeStyles, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type, UserInfo } from 'os'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { render } from '@testing-library/react'
import MyBookDetails from './MyBookDetails'
import APIUrl from '../helpers/environment'


// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface BookDProps {
    sessionToken: string | null,
}

export interface BookDInfo {
    id: number,
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
}
type BookDData = {
    book: BookDInfo[]
}

export class MyBooks extends Component<BookDProps, BookDData>{
    constructor(props: BookDProps) {
        super(props)
        this.state = {
            book:[{
            id: 0,
            title: "",
            genre: "",
            author: "",
            description: "",
            status: "",
        }]
        }
    }
    fetchVG = async () => {
    fetch(`${APIUrl}/book/`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": 'application/json', 
            "Authorization": `${localStorage.getItem('token')}`
        })
    })
        .then((res) => res.json())
        .then((book) => {
            console.log(book);
            this.setState({ book: book })
        })
}

componentDidMount(){
    this.fetchVG();
    console.log(localStorage.getItem('token'));
    
}

    render() {
        return (
            <div>
                <h1>My VideoGames: </h1>
                {this.state.book.map((book, index) => {
                    return (
                        <div>
                            <Card className="card">
                                <CardTitle>
                                    <h4 key={index}>0</h4>
                                    <h2>{book.title}</h2>
                                </CardTitle>
                                
                            <MyBookDetails sessionToken={this.props.sessionToken} title={book.title} genre={book.genre} author={book.author} description={book.description} status={book.status} id={book.id}/> 
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    }
}