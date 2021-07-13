import React, { Component } from 'react'
import { Button, Select, MenuItem } from '@material-ui/core'
// import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import APIUrl from "../helpers/environment"
import { Form, Input, Label } from 'reactstrap'
import { makeStyles, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

interface VGEProps extends WithStyles<typeof styles> {
    sessionToken: string | null,
    id: number | string,
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string
    fetchVG: Function
}

type VGEDetails = {
    modal: boolean
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
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

class AdminVGEdit extends Component<VGEProps, VGEDetails>{
    constructor(props: VGEProps) {
        super(props)
        this.state = {
            modal: false,
            title: this.props.title,
            genre: this.props.genre,
            developer: this.props.developer,
            platform: this.props.platform,
            description: this.props.description,
            status: this.props.status,
            open: false
        }
        this.toggle = this.toggle.bind(this)
    }

    handleSubmit = (e: any) => {
        e.preventDefault();


        fetch(`${APIUrl}/videoGames/${this.props.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: this.state.title,
                genre: this.state.genre,
                developer: this.state.developer,
                platform: this.state.platform,
                description: this.state.description,
                status: this.state.status,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).then((res) => res.json())
            .then((vgToEdit) => {
                this.props.fetchVG()
                this.toggle()
                console.log(vgToEdit);
                this.handleClose()
            })
    }


    toggle() {
        this.setState({ modal: !this.state.modal })
        console.log("toggle hit");

    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button className={classes.modal} onClick={this.handleOpen}>Edit this game</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <Label className="modalLabel"  htmlFor="Title">Title:</Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ title: e.target.value })} name="title" value={this.state.title} defaultValue={this.props.title} />
                            <Label className="modalLabel" >Genre: </Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ genre: e.target.value })} name="genre" value={this.state.genre} />
                            <Label className="modalLabel" >developer: </Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ developer: e.target.value })} name="developer" value={this.state.developer} />
                            <Label className="modalLabel" >platform: </Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ platform: e.target.value })} name="platform" value={this.state.platform} />
                            <Label className="modalLabel" >Description: </Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ description: e.target.value })} className='textInput' name="description" type="textarea" value={this.state.description} />
                            {/* <Label>Status</Label> */}
                            {/* <Select onChange={(e)=> this.setState({status: e.target.value})} name="status" value={this.state.status}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem></MenuItem>
                        </Select> */}
                            <Button type="submit" onClick={this.handleSubmit} className="modalButtons" >Submit</Button>
                        </div>
                    </Fade>
                </Modal>
            </div >
        );
    }
}

export default withStyles(styles, { withTheme: true })(AdminVGEdit);
