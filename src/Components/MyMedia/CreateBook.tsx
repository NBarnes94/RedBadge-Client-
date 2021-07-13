import React, { Component } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core'
import APIUrl from "../helpers/environment"
import {Form, Input, Label} from 'reactstrap'
import { makeStyles, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

interface BookCProps extends WithStyles<typeof styles> {
    sessionToken: string | null,
    createBookFetch: Function
}

type BookCDetails = {
    modal: boolean
    title: string,
    genre: string,
    author: string,
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
        height: 200,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: 'space-around'
    },
})


class BookCreate extends Component<BookCProps, BookCDetails>{
    constructor(props: BookCProps) {
        super(props)
        this.state = {
            modal: false,
            title: "",
            genre: "",
            author: "",
            description: "",
            status: "",
            open: false
        }
        this.toggle = this.toggle.bind(this)
    }

    handleSubmit = (e: any) =>{
        e.preventDefault();

        fetch(`${APIUrl}/book/create`, {
            method: "POST",
            body: JSON.stringify({
                title: this.state.title,
                genre: this.state.genre,
                author: this.state.author,
                description: this.state.description,
                status: this.state.status
            }),
            headers: new Headers({
                'Content-Type': 'application/json', 
                'Authorization': `${localStorage.getItem('token')}`
            })
        })
        .then((res) => res.json()
        ).then((books1) => {
            console.log(books1);
            this.toggle()
            this.props.createBookFetch()
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
        return(
        <div className="createModal">
                <Button className={classes.modal} onClick={this.handleOpen}>Add a Book</Button>
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
                            <h2>Add a Book</h2>
                            <Label htmlFor="Title" className="modalLabel">Title:</Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ title: e.target.value })} name="title" value={this.state.title} defaultValue={this.state.title} />
                            <Label className="modalLabel">Genre: </Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ genre: e.target.value })} name="genre" value={this.state.genre} />
                            <Label className="modalLabel">author: </Label>
                            <Input autoComplete="off" onChange={(e) => this.setState({ author: e.target.value })} name="author" value={this.state.author} />
                            <Label className="modalLabel">Description: </Label>
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

export default withStyles(styles, { withTheme: true })(BookCreate);