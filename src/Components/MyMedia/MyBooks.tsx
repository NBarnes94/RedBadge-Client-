import React, { useEffect, useState, Component } from 'react'
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type, UserInfo } from 'os'
import { makeStyles, CardActions, CardContent, Button, withStyles, Theme, WithStyles, Card, Typography } from "@material-ui/core"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { render } from '@testing-library/react'
import MyBookDetails from './MyBookDetails'
import APIUrl from '../helpers/environment'
import { faBook } from '@fortawesome/free-solid-svg-icons'


// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface BookDProps extends WithStyles<typeof styles> {
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

const styles = (theme: Theme) => ({
    root: {
        minWidth: 275,
        marginLeft: 12,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#6678ad",
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/broken-noise.png")',
        /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
        minHeight: 400,
        marginBottom: 20
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,

    },
})

class MyBooks extends Component<BookDProps, BookDData>{
    constructor(props: BookDProps) {
        super(props)
        this.state = {
            book: [{
                id: 0,
                title: "",
                genre: "",
                author: "",
                description: "",
                status: "",
            }]
        }
    }
    fetchBook = async () => {
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

    componentDidMount() {
        this.fetchBook();
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <h1>My Books: </h1>
                <div className="mediaCard">
                    {this.state.book.map((book, index) => {
                        return (
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        <h4 key={index} ></h4>
                                        <FontAwesomeIcon icon={faBook} size="2x" />
                                        <h2>{book.title}</h2>
                                    </Typography>
                                    <CardActions>
                                        <MyBookDetails sessionToken={this.props.sessionToken} title={book.title} genre={book.genre} author={book.author} description={book.description} status={book.status} id={book.id} fetchBook={this.fetchBook} />
                                    </CardActions>
                                </CardContent>
                            </Card>
                        )
                    })}
                    {/* <div className="mediaCard">
                {this.state.book.map((book, index) => {
                    return (
                        <div>
                            <Card className="card">
                                <CardTitle>
                                    <h4 key={index}></h4>
                                    <FontAwesomeIcon icon={faBook} size="2x"/>
                                    <h2>{book.title}</h2>
                                </CardTitle>
                                
                            <MyBookDetails sessionToken={this.props.sessionToken} title={book.title} genre={book.genre} author={book.author} description={book.description} status={book.status} id={book.id} fetchBook={this.fetchBook}/> 
                            </Card>
                        </div>
                    )
                })} */}
                </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(MyBooks)