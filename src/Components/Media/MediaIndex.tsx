import React, { useState, useEffect, Component } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button } from "@material-ui/core"
import { VGInfo } from './ShowVG';
import { BookInfo } from './ShowBook';
import { MovieInfo } from './ShowMovie'
import MovieDisplay from './ShowMovie'
import {VGDisplay} from './ShowVG'
import BookDisplay from './ShowBook';
import { render } from '@testing-library/react';
import { getTokenSourceMapRange } from 'typescript';
import userEvent from '@testing-library/user-event';
// main view functionality

export interface Props {
    sessionToken: string | null
}

type User = {
    firstName: string
}

export class MediaDisplay extends Component<Props, User> {
    constructor(props: Props) {
        super(props)
        this.state = {
            firstName: ""
        }
    }

    fetchMovie = async () => {
        fetch(`http://localhost:3005/movie/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((movies) => {
                this.setState(movies)
                console.log(movies);

            })
    }
    fetchVG = async () => {
        fetch(`http://localhost:3005/videoGames/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((videogames) => {
                this.setState(videogames)
                console.log(videogames);

            })
    }
    fetchBook = async () => {
        fetch(`http://localhost:3005/Books/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((books) => {
                this.setState(books)
            })
    }
    
    fetchUser = async () => {
        console.log("Function working");
        console.log(localStorage.getItem('token'));
        
        fetch(`http://localhost:3005/user/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            }
        })
            .then(console.log)
            // .then((user) => {
            //     console.log(user);
            //     this.setState({ firstName: user })
            //     console.log(this.state.firstName);
                
                
            // })
    }

    componentDidMount() {
        this.fetchMovie()
        this.fetchVG()
        this.fetchBook()
        this.fetchUser()
        console.log(this.props.sessionToken);

    }


    render() {
        return (
            <div>
                <div>
                    <h1>Welcome {this.state.firstName}</h1>
                </div>

                <h3>Movies: </h3>
                <MovieDisplay sessionToken={this.props.sessionToken} />
                <h3>Video Games: </h3>
                <VGDisplay sessionToken={this.props.sessionToken} />
                <h3>Books: </h3>
                <BookDisplay sessionToken={this.props.sessionToken} />
            </div>
        )
    }
}

export default MediaDisplay;