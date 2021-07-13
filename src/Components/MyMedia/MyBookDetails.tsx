import React, {Component} from 'react'
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"
import APIUrl from '../helpers/environment'
import BookEdit from './EditBook'
import { makeStyles, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

type MyBookProps = {
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
    fetchBook: Function
}
type MyBookDDetail={
    modal:boolean,
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

interface MyBookDProps extends WithStyles<typeof styles>{
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    author: string,
    description: string,
    status: string,
    fetchBook: Function
}

class MyBookDetails extends Component<MyBookDProps, MyBookDDetail>{
    constructor(props: MyBookDProps) {
        super(props)
        this.state={
            modal: false,
            open: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({modal: !this.state.modal})
        console.log("toggle hit");
        
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

    render() {
        const { classes } = this.props;

        const handleOpen = () => {
            this.setState({ open: true });
        };

        const handleClose = () => {
            this.setState({ open: false });
        };
        return (
            <div>
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
                            <h2 id="transition-modal-title">{this.props.title}</h2>
                            <ul className="modalInfo">
                                <li>Genre: {this.props.genre}</li>
                                <li>author: {this.props.author}</li>
                                {/* <li>{this.props.status}</li> */}
                                <li>Description: {this.props.description}</li>
                            </ul>
                            <div>
                                <BookEdit sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre} author={this.props.author} status={this.props.status} description={this.props.description} id={this.props.id} fetchBook={this.props.fetchBook} />
                                <Button onClick={() => { this.deleteBook(this.props.id) }} className="modalButtons"> Delete Movie</Button>
                        </div>
                        </div>
                    </Fade>
                </Modal>
            </div >
        );
    }
}


export default withStyles(styles, { withTheme: true })(MyBookDetails);