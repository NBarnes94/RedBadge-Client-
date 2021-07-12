import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Button } from "@material-ui/core"
import APIUrl from "../helpers/environment"
import MovieEdit from './EditMovie'

type MyMovieDProps = {
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    studio: string,
    runTime: string,
    description: string,
    status: string,
    fetchMovie: any,
}
type MyMovieDetail = {
    modal: boolean,
    edit: boolean
}

export default class MyMovieDetails extends Component<MyMovieDProps, MyMovieDetail>{
    constructor(props: MyMovieDProps) {
        super(props)
        this.state = {
            modal: false,
            edit: false
        }
        this.toggle = this.toggle.bind(this)
    }
    
    

    toggle() {
        this.setState({ modal: !this.state.modal })
        console.log("toggle hit");

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
    
    componentDidMount(){
        console.log(this.props.id);
    }
    render() {
        return (
            <div>
                <Button onClick={this.toggle}>Details</Button>
                <Modal
                    isOpen={this.state.modal} fade={true} toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >
                        {this.props.title}
                    </ModalHeader>
                    <ModalBody>
                        <ol>
                            <li>{this.props.genre}</li>
                            <li>{this.props.studio}</li>
                            <li>{this.props.runTime}</li>
                            <li>{this.props.status}</li>
                            <li>{this.props.description}</li>
                            <li>{this.props.id}</li>
                        </ol>
                    </ModalBody>
                    <MovieEdit sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre} studio={this.props.studio} runTime={this.props.runTime} status={this.props.status} description={this.props.description} id={this.props.id} fetchMovie={this.props.fetchMovie} />
                    <Button onClick={()=>{this.deleteMovie(this.props.id)}}> Delete Movie</Button>
                </Modal>
            </div>
        )
    }
}
