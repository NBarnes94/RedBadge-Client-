import React, { useEffect, useState, Component } from 'react'
import { makeStyles, CardActions, CardContent, Button, withStyles, Theme, WithStyles, Card, Typography  } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { render } from '@testing-library/react'
import BookDetails from './BookDetails'
import APIUrl from '../helpers/environment'
import { faBook } from '@fortawesome/free-solid-svg-icons'

// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the import React from 'react'


export interface BookProps extends WithStyles<typeof styles> {
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

const styles = (theme: Theme) => ({
    root: {
        minWidth: 275,
        marginLeft: 12, 
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#6678ad",
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/broken-noise.png")',
    /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
    minHeight: 300,
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

class BookDisplay extends Component<BookProps, BookData>{
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
        const { classes } = this.props
        return (
            <div >
                <h1>Books: </h1>
                <div className="mediaCard"> 
                {this.state.books.map((book, index) => {
                    return (
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                <h4 key={index} ></h4>
                                    <FontAwesomeIcon icon={faBook} size="2x"/>
                                    <h2>{book.title}</h2> 
                                    </Typography>
                                <CardActions>
                                <BookDetails sessionToken={this.props.sessionToken} title={book.title} genre={book.genre} author={book.author} description={book.description} status={book.status} role={this.props.role} id={book.id} fetchBook={this.props.fetchBook}/>
                                </CardActions>
                                </CardContent>
                            </Card>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(BookDisplay)