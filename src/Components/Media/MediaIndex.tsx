import React, {useState, useEffect, Component} from 'react'
import {makeStyles, Card, CardActions, CardContent, Button } from "@material-ui/core"
import {VGInfo} from './ShowVG';
import {BookInfo} from './ShowBook';
import {MovieInfo} from './ShowMovie'
import MovieDisplay from './ShowMovie'
import VGDisplay from './ShowVG'
import BookDisplay  from './ShowBook';
import { render } from '@testing-library/react';
// main view functionality

interface Props {
    getToken(): string | null
}

export class MediaDisplay extends Component <Props, {}> {
    constructor(props: Props){
        super(props)

    }
    fetchMovie = async () =>{
        fetch(`http://localhost:3005/movie/all`, {
            method: "GET", 
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
        .then((res) => res.json())
        .then((movies) =>{
            this.setState(movies)
            console.log(movies);
            
        })
    }
    fetchVG = async () =>{
        fetch(`http://localhost:3005/videoGames/all`, {
            method: "GET", 
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
        .then((res) => res.json())
        .then((videogames) =>{
            this.setState(videogames)
            console.log(videogames);
            
        })
    }
    fetchBook = async () =>{
        fetch(`http://localhost:3005/Books/all`, {
            method: "GET", 
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
        .then((res) => res.json())
        .then((books) =>{
            this.setState(books)
        })
    }

    fetchUser = async () =>{
        fetch(`http://localhost:3005/user/get`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.getToken
            })
        })
    }

    componentDidMount(){
        this.fetchMovie()
        this.fetchVG()
        this.fetchBook()
        this.fetchUser()
    }


    render(){
    return(
        <div>

            <MovieDisplay />
            <VGDisplay />
            <BookDisplay />
        </div>
    )
}
}

export default MediaDisplay;