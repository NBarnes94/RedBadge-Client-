import React, { Component } from 'react'
import { MovieInfo } from './ShowMovie'
import {Button} from "@material-ui/core"
import MovieAdminEdit from './AdminMovieEdit'
import APIUrl from '../helpers/environment'
import { makeStyles, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

interface MovieDProps extends WithStyles<typeof styles> {
    // modalOn: boolean,
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    studio: string,
    runTime: string,
    description: string,
    status: string,
    role: string,
    fetchMovie: Function
    // toggle: boolean
}

type MovieDetail ={
    modal: boolean,
    open: boolean
}

const styles = (theme: Theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
})

class MovieDetails extends Component<MovieDProps, MovieDetail>{
    constructor(props: MovieDProps) {
        super(props)
        this.state={
            modal: false,
            open: false
        }
        this.toggle = this.toggle.bind(this)
    }

    deleteMovie(id: number) {
        fetch(`${APIUrl}/movie/delete/${id}`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            })
        })
            this.props.fetchMovie()
        
    }

    toggle() {
        this.setState({modal: !this.state.modal})
        console.log("toggle hit");
        
    }

    render() {
        const { classes } = this.props;

        const handleOpen = () => {
            this.setState({ open: true });
        };

        const handleClose = () => {
            this.setState({ open: false });
        };
        return (
            <div>
                <Button type="button" onClick={handleOpen}>
                    Details
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title" className="cardTitle" >{this.props.title}</h2>
                            <ul className="modalInfo">
                                <li>Genre: {this.props.genre}</li>
                                <li>Studio: {this.props.studio}</li>
                                <li>Run Time: {this.props.runTime}</li>
                                {/* <li>{this.props.status}</li> */}
                                <li>Description: {this.props.description}</li>
                            </ul>
                            <div>
                    {this.props.role == "admin" ? <div> <MovieAdminEdit sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre}  studio={this.props.studio}
                    runTime={this.props.runTime} status={this.props.status} description={this.props.description} id={this.props.id} fetchMovie={this.props.fetchMovie} /> <Button onClick={() => {this.deleteMovie(this.props.id)}}>Delete Movie</Button> </div> : null}
                        </div>
                        </div>
                    </Fade>
                </Modal>
            </div >
        );
    }
}


export default withStyles(styles, { withTheme: true })(MovieDetails);