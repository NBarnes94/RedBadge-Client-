
import React, { useEffect, useState, Component } from 'react'
import { makeStyles, CardActions, CardContent, Button, withStyles, Theme, WithStyles, Card, Typography } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { render } from '@testing-library/react'
import VGDetails from './DetailVG'
import APIUrl from '../helpers/environment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { faGamepad as fasFaGamepad } from '@fortawesome/free-solid-svg-icons'


// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the npm

export interface VGProps extends WithStyles<typeof styles> {
    sessionToken: string | null,
    role: string
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

class VGDisplay extends Component<VGProps, VGData>{
    constructor(props: VGProps) {
        super(props)
        this.state = {
            videogames: [{
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

    componentDidMount() {
        this.fetchVG();
    }

    render() {
        const { classes } = this.props
        // const gamepadLookup: IconLookup ={ prefix: 'fas', iconName: 'gamepad'}
        // const gamepadIconDefinition: IconDefinition = findIconDefinition(gamepadLookup)
        return (
            <div  >
                <h1>VideoGames: </h1>
                <div className="mediaCard">
                    {this.state.videogames.map((videogame, index) => {
                        return (
                            <div>
                                <Card className={classes.root} >
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            <h4 key={index}></h4>
                                            < FontAwesomeIcon icon={fasFaGamepad} className="vgIcon" size="2x" />
                                            <h2>{videogame.title}</h2></Typography>
                                        <CardActions>
                                            <VGDetails sessionToken={this.props.sessionToken} title={videogame.title} genre={videogame.genre} developer={videogame.developer} platform={videogame.platform} description={videogame.description} status={videogame.status} role={this.props.role} fetchVG={this.fetchVG} id={videogame.id} />
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(VGDisplay)