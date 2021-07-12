import React, { useEffect, useState, Component } from 'react'
import { makeStyles, CardActions, CardContent, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@material-ui/core'
import { render } from '@testing-library/react'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import BookDetails from './BookDetails'
import APIUrl from '../helpers/environment'

// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the import React from 'react'


export interface BookProps {
    sessionToken: string | null,
    role: string,
    fetchBook: any
}

export interface BookInfo {
    id: number,
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
}

type BookData = {
    books: BookInfo[]
}

export default class BookDisplay extends Component<BookProps, BookData>{
    constructor(props: BookProps) {
        super(props)
        this.state = {
            books: [{
                id: 0,
                title: "",
                genre: "",
                author: "",
                description: "",
                status: ""
            }]
        }
    }

    fetchBook = async () => {
        fetch(`${APIUrl}/book/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((books) => {
                this.setState({books: books})
                console.log(books);

            })
    }

    

componentDidMount(){
    this.fetchBook()
}


    render() {
        return (
            <div>
                <h1>Books: </h1>
                {this.state.books.map((book, index) => {
                    return (
                        <Card className="card" key={index}>
                            <CardTitle>
                                    {/* <img src={"./assets/book.pgn"} alt="bookIcon"/> */}
                                    <h2>{book.title}</h2>
                                </CardTitle>
                                <BookDetails sessionToken={this.props.sessionToken} title={book.title} genre={book.genre} author={book.author} description={book.description} status={book.status} role={this.props.role} id={book.id} fetchBook={this.props.fetchBook}/>
                            </Card>
                    )
                })}
            </div>
        )
    }
}

