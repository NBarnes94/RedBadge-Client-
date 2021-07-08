
import React, { useEffect, useState, Component } from 'react'
import { makeStyles, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type, UserInfo } from 'os'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { render } from '@testing-library/react'
import VGDetails from './DetailVG'
import APIUrl from '../helpers/environment'


// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface VGProps {
    sessionToken: string | null,
    // VGModal: []
}

export interface VGInfo {
    id: number,
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
}
type VGData = {
    videogames: VGInfo[]
}

export class VGDisplay extends Component<VGProps, VGData>{
    constructor(props: VGProps) {
        super(props)
        this.state = {
            videogames:[{
            id: 0,
            title: "",
            genre: "",
            developer: "",
            platform: "",
            description: "",
            status: "",
        }]
        }
    }
    fetchVG = async () => {
    fetch(`${APIUrl}/videoGames/all`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": 'application/json'
        })
    })
        .then((res) => res.json())
        .then((videogames) => {
            console.log(videogames);
            this.setState({ videogames: videogames })
        })
}

componentDidMount(){
    this.fetchVG();
}

    render() {
        return (
            <div>
                <h1>VideoGames: </h1>
                {this.state.videogames.map((videogame, index) => {
                    return (
                        <div>
                            <Card className="card" key={index}>
                                <CardTitle>
                                    <img src="./assets/videogame.png" alt="videoGameIcon"/>
                                    <h2>{videogame.title}</h2>
                                </CardTitle>
                                
                            <VGDetails sessionToken={this.props.sessionToken} title={videogame.title} genre={videogame.genre} developer={videogame.developer} platform={videogame.platform} description={videogame.description} status={videogame.status} /> 
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    }
}

