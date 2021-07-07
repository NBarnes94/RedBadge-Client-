
import React, { useEffect, useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@material-ui/core'

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
    owner_id: number
}

const BookDisplay: React.FC<BookProps> = props => {

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
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
    const [books, setBooks] = useState<BookInfo[]>([]);
    // ({
    //     id: null,
    //     title: null,
    //     genre: null,
    //     studio: null, 
    //     runTime: null,
    //     description: null,
    //     status: null,
    //     owner_id: null 
    // })

    const fetchBook = async () => {
        fetch(`http://localhost:3005/book/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
                // "Authorization": sessionToken={this.props.sessionToken}
            })
        })
            .then((res) => res.json())
            .then((books) => {
                setBooks(books)
                console.log(books);

            })
    }
    const classes = useStyles();

    useEffect(() => {
        fetchBook()
    }, [])

    return (
        <div>
            {books.map((book, index) => {
                return (
                    <Card className="class.root">
                        <CardContent>
                                <h4>0</h4>
                            <Typography className={classes.title}>
                                <h2>{book.title}</h2>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button >Details</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )
}

export default BookDisplay;