import React, { Component } from 'react'
import { MovieInfo } from './ShowMovie'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"
import MovieAdminEdit from './AdminMovieEdit'
import APIUrl from '../helpers/environment'

type MovieDProps = {
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
    fetchMovie: any
    // toggle: boolean
}

type MovieDetail ={
    modal: boolean
}

export default class MovieDetails extends Component<MovieDProps, MovieDetail>{
    constructor(props: MovieDProps) {
        super(props)
        this.state={
            modal: false
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
        return (
            <div>
                <Button onClick={this.toggle}>Details</Button>
                <Modal 
                isOpen={this.state.modal} fade={true} toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        {this.props.title}
                    </ModalHeader>
                    <ModalBody>
                        <ol>
                            <li>{this.props.genre}</li>
                            <li>{this.props.studio}</li>
                            <li>{this.props.runTime}</li>
                            <li>{this.props.status}</li>
                            <li>{this.props.description}</li>
                        </ol>
                    </ModalBody>
                    {this.props.role == "admin" ? <div> <MovieAdminEdit sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre}  studio={this.props.studio}
                    runTime={this.props.runTime} status={this.props.status} description={this.props.description} id={this.props.id} fetchMovie={this.props.fetchMovie} /> <Button onClick={() => {this.deleteMovie(this.props.id)}}>Delete Movie</Button> </div> : null}
                </Modal>
            </div>
        )
    }
}