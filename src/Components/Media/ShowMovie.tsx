import React, { useEffect, useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface MovieProps { }

export interface MovieInfo {
    id: number,
    title: string,
    genre: string,
    studio: string,
    runTime: string,
    description: string,
    status: string,
    owner_id: number
}

const MovieDisplay: React.FC<MovieProps> = props => {

    const [movies, setMovies] = useState<MovieInfo[]>([]);
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

    const fetchMovie = async () => {
        fetch(`http://localhost:3005/movie/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((movies) => {
                setMovies(movies)
                console.log(movies);
                
            })
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    return (
        <div>
            {movies.map((movies, index )=> {
                return(
                <Card>
                    <CardContent>
                            <h4 key={index}>0</h4>
                        <h2>{movies.title}</h2>
                    </CardContent>
                </Card>
                )
            })}
        </div>
    )
}

export default MovieDisplay;