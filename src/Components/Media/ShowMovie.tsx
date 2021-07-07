import React, { useEffect, useState, Component } from 'react'
import { makeStyles, CardActions, CardContent, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'
// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface MovieProps {
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
    movies: MovieInfo[]
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
            }]
        }
    }

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

    fetchMovie = async () => {
        fetch(`http://localhost:3005/movie/all`, {
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

    componentDidMount() {
        this.fetchMovie()
    }

    render() {
        return (
            <div>
                {this.state.movies.map((movie, index) => {
                    return (
                        <Card>
                            <CardTitle>
                                <h4 key={index}>0</h4>
                                <h2>{movie.title}</h2>
                            </CardTitle>
                            <Button
                            // onClick={() => <VGDetails sessionToken={this.props.sessionToken}/>}
                            >Details</Button>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

