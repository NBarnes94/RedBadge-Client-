import React, { Component } from 'react'
import { VGProps } from './ShowVG'
import { BookInfo } from './ShowBook'
import {Button} from '@material-ui/core';
import APIUrl from '../helpers/environment'
import BookEdit from './AdminBookEdit'
import { makeStyles, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


interface BookDProps extends WithStyles<typeof styles>{
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
    role: string,
    fetchBook: Function

}
type BookDetail= {
    modal: boolean
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

class BookDetails extends Component<BookDProps, BookDetail>{
    constructor(props: BookDProps) {
        super(props)
        this.state={
            modal:false,
            open: false
        }
        this.toggle = this.toggle.bind(this)
    }
    deleteBook(id: number) {
        fetch(`${APIUrl}/book/delete/${id}`,{
            method: "DELETE",
            headers: new Headers({
                'Content-Type': "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            })
        })
        .then((bookToDelete) =>{
            this.props.fetchBook()
            this.toggle()
            console.log(bookToDelete);
            
        })
    }
    toggle() {
        this.setState({modal: !this.state.modal})
        console.log("toggle hit");
        
    }
    render() {
        const { classes } = this.props;

        const handleOpen = () => {
            this.setState({ open: true });
        };

        const handleClose = () => {
            this.setState({ open: false });
        };
        return (
            <div >
                <Button type="button" onClick={handleOpen}>
                    Details
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title" className="cardTitle">{this.props.title}</h2>
                            <ul className="modalInfo">
                                <li>Genre: {this.props.genre}</li>
                                <li>author: {this.props.author}</li>
                                {/* <li>{this.props.status}</li> */}
                                <li>Description: {this.props.description}</li>
                            </ul>
                            <div>
                    {this.props.role == "admin" ? <div> <BookEdit  sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre}  author={this.props.author} status={this.props.status} description={this.props.description} id={this.props.id} fetchBook={this.props.fetchBook} /> <Button onClick={() => {this.deleteBook(this.props.id)}} >Delete Book</Button> </div> : null}
                    </div>
                        </div>
                    </Fade>
                </Modal>
            </div >
        );
    }
}


export default withStyles(styles, { withTheme: true })(BookDetails);