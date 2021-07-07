import React, { useEffect, useState, Component } from 'react'
import { makeStyles, CardActions, CardContent, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@material-ui/core'
import { render } from '@testing-library/react'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'

// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the import React from 'react'


export interface BookProps {
    sessionToken: string | null
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
        fetch(`http://localhost:3005/book/all`, {
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



    render() {
        return (
            <div>
                {this.state.books.map((book, index) => {
                    return (
                        <Card>
                            <CardTitle>
                                    <h4 key={index}>0</h4>
                                    <h2>{book.title}</h2>
                                </CardTitle>
                                <Button
                                // onClick={() => <VGDetails sessionToken={this.props.sessionToken}/>}
                                >Details</Button>
                            </Card>
                    )
                })}
            </div>
        )
    }
}

