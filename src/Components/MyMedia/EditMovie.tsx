import React, { Component } from 'react'
import { Button, Select, MenuItem } from '@material-ui/core'
import APIUrl from "../helpers/environment"
import {Form, Input, Label} from 'reactstrap'
import { makeStyles, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

interface MovieEProps extends WithStyles<typeof styles> {
    sessionToken: string | null,
    id: number | string,
    title: string, 
    genre: string,
    studio: string,
    runTime:string,
    description: string,
    status: string,
    fetchMovie: Function
}

type MovieEDetails = {
    modal: boolean
    title: string,
    genre: string,
    studio: string,
    runTime: string,
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

class MovieEdit extends Component<MovieEProps, MovieEDetails>{
    constructor(props: MovieEProps) {
        super(props)
        this.state = {
            modal: false,
            title: this.props.title,
            genre: this.props.genre,
            studio: this.props.studio,
            runTime: this.props.runTime,
            description: this.props.description,
            status: this.props.status,
            open: false
        }
        this.toggle = this.toggle.bind(this)
    }

    handleSubmit = (e: any) =>{
        e.preventDefault();


            fetch(`${APIUrl}/movie/${this.props.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: this.state.title,
                    genre: this.state.genre,
                    studio: this.state.studio,
                    runTime: this.state.runTime,
                    description: this.state.description,
                    status: this.state.status,
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }) 
            }).then((res) => res.json())
                .then((movieToEdit) =>{
                    this.props.fetchMovie()
                    console.log(movieToEdit);
                    this.toggle()
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
        const { classes } =this.props;
        return (
            <div className="createModal">
                <Button className={classes.modal} onClick={this.handleOpen}>Edit this Movie</Button>
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
                            <Input autoComplete="off" onChange={(e) => this.setState({ title: e.target.value })} name="title" value={this.state.title} defaultValue={this.state.title} />
                            <Label className="modalLabel" >Genre: </Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ genre: e.target.value })} name="genre" value={this.state.genre} />
                            <Label className="modalLabel" >Studio: </Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ studio: e.target.value })} name="studio" value={this.state.studio} />
                            <Label className="modalLabel" >Run Time: </Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ runTime: e.target.value })} name="runTime" value={this.state.runTime} />
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

export default withStyles(styles, { withTheme: true })(MovieEdit);