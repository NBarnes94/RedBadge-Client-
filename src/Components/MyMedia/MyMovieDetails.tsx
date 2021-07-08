import React, {Component} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"


type MyMovieDProps = {
    sessionToken: string | null,
    title: string,
    genre: string,
    studio: string,
    runTime: string,
    description: string,
    status: string,
}
type MyMovieDetail={
    modal:boolean
}

export default class MyVGDetails extends Component<MyMovieDProps, MyMovieDetail>{
    constructor(props: MyMovieDProps) {
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
                        </ol>
                    </ModalBody>
                </Modal> 
            </div>
        )
    }
}
