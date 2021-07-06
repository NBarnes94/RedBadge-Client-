import React, { useEffect, useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the import React from 'react'

export interface BookProps { }

export interface BookInfo{
    id: number, 
    title: string, 
    genre: string,
    author: string, 
    description: string,
    status: string,
    owner_id: number 
}

const BookDisplay: React.FC<BookProps> = props => {

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
        fetch(`http://localhost:3005/movie/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((books) => {
                setBooks(books)
            })
    }

    useEffect(() => {
        fetchBook()
    }, [])

    return (
        <div>
            {books.map(books => {
                <Card>
                    <CardContent>
                            <h4>0</h4>
                        <h2>{books.title}</h2>
                    </CardContent>
                </Card>
            })}
        </div>
    )
}

export default BookDisplay;