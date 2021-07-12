import React, { useEffect, useState, Component } from 'react'
import { makeStyles, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type, UserInfo } from 'os'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { render } from '@testing-library/react'
import MyMovieDetails from './MyMovieDetails'
import APIUrl from '../helpers/environment'


// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface VGProps {
    sessionToken: string | null,
}

export interface MovieInfo {
    id: number,
    title: string,
    genre: string,
    studio: string,
    runTime: string,
    description: string,
    status: string,
}
type VGData = {
    movie: MovieInfo[]
}

export class MyMovies extends Component<VGProps, VGData>{
    constructor(props: VGProps) {
        super(props)
        this.state = {
            movie:[{
            id: 0,
            title: "",
            genre: "",
            studio: "",
            runTime: "",
            description: "",
            status: "",
        }]
        }
    }
    fetchMovie = async () => {
    fetch(`${APIUrl}/movie/`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": 'application/json', 
            "Authorization": `${localStorage.getItem('token')}`
        })
    })
        .then((res) => res.json())
        .then((movie) => {
            console.log(movie);
            this.setState({ movie: movie })
        })
}



componentDidMount(){
    this.fetchMovie();
    
}

    render() {
        return (
            <div>
                <h1>My movies : </h1>
                {this.state.movie.map((movie, index) => {
                    return (
                        <div>
                            <Card className="card">
                                <CardTitle>
                                    <h4 key={index}></h4>
                                    <img src="" alt="" />
                                    <h2>{movie.title}</h2>
                                </CardTitle>
                                
                            <MyMovieDetails sessionToken={this.props.sessionToken} title={movie.title} genre={movie.genre} studio={movie.studio} runTime={movie.runTime} description={movie.description} status={movie.status} id={movie.id} fetchMovie={this.fetchMovie} /> 
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    }
}