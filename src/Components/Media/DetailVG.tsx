import React, { Component } from 'react'
import { VGProps } from './ShowVG'
import { VGInfo } from './ShowVG'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'




export default class VGDetails extends Component<{}, VGInfo>{
    constructor(props: {}) {
        super(props)
    }

    render() {
        return (
            <div>
                <Modal isOpen={modal} fade={true} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        {videogame.title}
                    </ModalHeader>
                    <ModalBody>
                        <ol>
                            <li>{videogame.genre}</li>
                            <li>{videogame.platform}</li>
                            <li>{videogame.developer}</li>
                            <li>{videogame.status}</li>
                            <li>{videogame.description}</li>
                            {/* <li>{videogame.}</li> 
                        </ol>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
