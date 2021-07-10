import React, { Component } from 'react'
import { MyVG } from './MyVG'
import { MyBooks } from './MyBooks'
import { MyMovies } from "./MyMovies"
import APIUrl from '../helpers/environment'
import VGCreate from './CreateVG'
import BookCreate from './CreateBook'
import MovieCreate from './CreateMovie'


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
        fetch(`${APIUrl}/movie/create`,{
            method:"POST", 
            body: JSON.stringify({
                title: "",
                genre: "",
                studio: "",
                runTime: "",
                description: "",
                status: "",
            })
        })
    }
    createVGFetch(){
        fetch(`${APIUrl}/videoGames/create`,)
    }
    createBookFetch(){
        fetch(`${APIUrl}/book/create`,)
    }

    render() {
        return (
            <div>
                <VGCreate sessionToken={this.props.sessionToken} />
                <MovieCreate sessionToken={this.props.sessionToken}/>
                <BookCreate sessionToken={this.props.sessionToken}/>
                <MyMovies sessionToken={this.props.sessionToken} />
                <MyVG sessionToken={this.props.sessionToken} />
                <MyBooks sessionToken={this.props.sessionToken} />
            </div>
        )
    }
}