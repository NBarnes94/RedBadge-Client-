import React, { useEffect, useState, Component } from 'react'
import { makeStyles, CardActions, CardContent, Button, withStyles, Theme, WithStyles, Card, Typography  } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import MovieDetails from './MovieDetails'
import APIUrl from '../helpers/environment'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface MovieProps extends WithStyles<typeof styles> {
    // modalOn: boolean,
    sessionToken: string | null,
    role: string
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

const styles = (theme: Theme) => ({
    root: {
        minWidth: 275,
        marginLeft: 12, 
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#6678ad",
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/broken-noise.png")',
    /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
    minHeight: 250,
    marginBottom: 20
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        
    },
})


class MovieDisplay extends Component<MovieProps, MovieData>{
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
        const { classes } = this.props;
        return (
            <div >
                <h1>Movies: </h1>
                <div className="mediaCard">
                    {this.state.movies.map((movie, index) => {
                        return (
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" >
                                        <h4 key={index}></h4>
                                        <FontAwesomeIcon icon={faFilm} size="2x" />
                                        <h2 >{movie.title}</h2>
                                    </Typography>
                                <CardActions> 
                                <MovieDetails sessionToken={this.props.sessionToken} title={movie.title} genre={movie.genre} studio={movie.studio} runTime={movie.runTime} description={movie.description} status={movie.status} id={movie.id} fetchMovie={this.fetchMovie} role={this.props.role}
                                // modalOn={this.props.modalOn}
                                // toggle={this.state.toggle} 
                                /> 
                                </CardActions>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(MovieDisplay)