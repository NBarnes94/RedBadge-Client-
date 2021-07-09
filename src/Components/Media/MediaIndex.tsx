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
import APIUrl from '../helpers/environment';
import VGDetails from './DetailVG';
// main view functionality

export interface Props {
    sessionToken: string | null
}

type User = {
    firstName: string
    videogames: [],
    movies: [],
    books:[],
    modal: boolean
}

export class MediaDisplay extends Component<Props, User> {
    constructor(props: Props) {
        super(props)
        this.state = {
            firstName: "",
            videogames: [],
            movies: [],
            books: [],
            modal: false
        }
    }

    fetchMovie = async () => {
        fetch(`${APIUrl}/movie/all`, {
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
        fetch(`${APIUrl}/videoGames/all`, {
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
        fetch(`${APIUrl}/book/all`, {
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
        
        fetch(`${APIUrl}/user/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            }
        })
            .then((res)=> res.json)
            .then((user) => {
                console.log(user);
                // this.setState({  firstName: user })
                console.log(this.state.firstName);
                
                
            })
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
                    <h1>Welcome person! {this.state.firstName}</h1>
                </div>

                <MovieDisplay sessionToken={this.props.sessionToken} 
                // modalOn={this.modalOn}
                />

                <VGDisplay sessionToken={this.props.sessionToken} 
                // VGModal={this.VGModal}
                />

                <BookDisplay sessionToken={this.props.sessionToken} />
            </div>
        )
    }
}

export default MediaDisplay;