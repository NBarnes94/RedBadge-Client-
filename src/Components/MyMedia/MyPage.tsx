import React, { Component } from 'react'
import  MyVG  from './MyVG'
import  MyBooks  from './MyBooks'
import  MyMovies  from "./MyMovies"
import APIUrl from '../helpers/environment'
import VGCreate from './CreateVG'
import BookCreate from './CreateBook'
import MovieCreate from './CreateMovie'
import './MyPage.css'


type PageProps = {
    sessionToken: string | null
}
type VGCInfo = {
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
}
type MovieCInfo = {
    title: string,
    genre: string,
    studio: string,
    runTime: string,
    description: string,
    status: string,
}
type BookCInfo = {
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
}

type mediaData = {
    movieData: MovieCInfo[],
    bookData: BookCInfo[],
    vGData: VGCInfo[]
}

export class MyPage extends Component<PageProps, mediaData>{
    constructor(props: PageProps) {
        super(props)
        this.state = {
            movieData: [{
                title: "",
                genre: "",
                studio: "",
                runTime: "",
                description: "",
                status: "",
            }],
            bookData: [{
                title: "",
                genre: "",
                author: "",
                description: "",
                status: "",
            }],
            vGData: [{
                title: "",
                genre: "",
                developer: "",
                platform: "",
                description: "",
                status: "",
            }]
        }
    }

    
    createMovieFetch(){
        fetch(`${APIUrl}/movie/`,{
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((movies) => {
                console.log(movies);
            })
    }
    createVGFetch(){
        fetch(`${APIUrl}/videoGames/`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Authorization": `${localStorage.getItem('token')}`
            })
        })
            .then((res) => res.json())
            .then((videogames) => {
                console.log(videogames);
            })
    }
    createBookFetch(){
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
            })
    }
    
    

    render() {
        return (
            <div>
                <div className="createButtons">
                <VGCreate sessionToken={this.props.sessionToken} createVGFetch={this.createVGFetch}/>
                <MovieCreate sessionToken={this.props.sessionToken} createMovieFetch={this.createMovieFetch}/>
                <BookCreate sessionToken={this.props.sessionToken} createBookFetch={this.createBookFetch} />
                </div>
                <MyMovies sessionToken={this.props.sessionToken} />
                <MyVG sessionToken={this.props.sessionToken} />
                <MyBooks sessionToken={this.props.sessionToken} />
            </div>
        )
    }
}