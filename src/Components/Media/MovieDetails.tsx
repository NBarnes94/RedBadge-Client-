import React, { Component } from 'react'
import { MovieInfo } from './ShowMovie'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"


type MovieDProps = {
    // modalOn: boolean,
    sessionToken: string | null,
    title: string,
    genre: string,
    studio: string,
    runTime: string,
    description: string,
    status: string,
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
                </Modal>
            </div>
        )
    }
}