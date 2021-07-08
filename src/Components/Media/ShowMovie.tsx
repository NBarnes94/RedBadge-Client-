import React, { useEffect, useState, Component } from 'react'
import { makeStyles, CardActions, CardContent, Button, } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import MovieDetails from './MovieDetails'
import APIUrl from '../helpers/environment'
// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface MovieProps {
    // modalOn: boolean,
    sessionToken: string | null
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

type MovieData = {
    movies: MovieInfo[],
    toggle: boolean
}

export default class MovieDisplay extends Component<MovieProps, MovieData>{
    constructor(props: MovieProps) {
        super(props)
        this.state = {
            movies: [{
                id: 0,
                title: "",
                genre: "",
                studio: "",
                runTime: "",
                description: "",
                status: "",
            }],
            toggle: false
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
                console.log(movies);
                this.setState({ movies: movies })
            })
    }

    toggle = () => {
        // this.setState(ModalOn: !modal)
    }

    componentDidMount() {
        this.fetchMovie()
    }

    render() {
        return (
            <div>
                <h1>Movies: </h1>
                {this.state.movies.map((movie, index) => {
                    return (

                        <Card className="card">
                            <CardTitle key={index}>
                                {/* <FontAwesomeIcon icon="video" size="2x" /> */}
                                <img src="./assets/movie.png" alt="movieIcon" />
                                <h2 >{movie.title}</h2>
                            </CardTitle>
                            <MovieDetails sessionToken={this.props.sessionToken} title={movie.title} genre={movie.genre} studio={movie.studio} runTime={movie.runTime} description={movie.description} status={movie.status}
                                    // modalOn={this.props.modalOn}
                                    // toggle={this.state.toggle} 
                                    />
                        </Card>
                    )
                })}
            </div>
        )
    }
}

