import React, { useEffect, useState, Component } from 'react'
import { makeStyles, CardActions, CardContent, Button, withStyles, Theme, WithStyles, Card, Typography } from "@material-ui/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { render } from '@testing-library/react'
import MyMovieDetails from './MyMovieDetails'
import APIUrl from '../helpers/environment'
import { faFilm } from '@fortawesome/free-solid-svg-icons'


// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface VGProps extends WithStyles<typeof styles> {
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

const styles = (theme: Theme) => ({
    root: {
        minWidth: 275,
        marginLeft: 12,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#6678ad",
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/broken-noise.png")',
        /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
        minHeight: 400,
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

class MyMovies extends Component<VGProps, VGData>{
    constructor(props: VGProps) {
        super(props)
        this.state = {
            movie: [{
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



    componentDidMount() {
        this.fetchMovie();

    }

    render() {
        const { classes } = this.props;
        return (
            <div >
                <h1>My Movies: </h1>
                <div className="mediaCard">
                    {this.state.movie.map((movie, index) => {
                        return (
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" >
                                        <h4 key={index}></h4>
                                        <FontAwesomeIcon icon={faFilm} size="2x" />
                                        <h2 >{movie.title}</h2>
                                    </Typography>
                                    <CardActions>
                                        <MyMovieDetails sessionToken={this.props.sessionToken} title={movie.title} genre={movie.genre} studio={movie.studio} runTime={movie.runTime} description={movie.description} status={movie.status} id={movie.id} fetchMovie={this.fetchMovie}
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
export default withStyles(styles, { withTheme: true })(MyMovies)
