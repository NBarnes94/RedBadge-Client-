import React, {Component} from 'react'
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Button} from "@material-ui/core"
import APIUrl from '../helpers/environment'
import VGEdit from './EditVG'
import { makeStyles, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

type MyVGProps = {
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
    fetchVG: Function
}
type MyVGDetail={
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

interface MyVGDProps extends WithStyles<typeof styles> {
    sessionToken: string | null,
    id: number,
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
    fetchVG: Function
}

class MyVGDetails extends Component<MyVGDProps, MyVGDetail>{
    constructor(props: MyVGDProps) {
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
    deleteVG(id: number) {
        fetch(`${APIUrl}/videoGames/delete/${id}`,{
            method: "DELETE",
            headers: new Headers({
                'Content-Type': "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            })
        })
        this.props.fetchVG()
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
                                <li>Developer: {this.props.developer}</li>
                                <li>Platform: {this.props.platform}</li>
                                {/* <li>{this.props.status}</li> */}
                                <li>Description: {this.props.description}</li>
                            </ul>
                            <div>
                                <VGEdit sessionToken={this.props.sessionToken} title={this.props.title} genre={this.props.genre} developer={this.props.developer} platform={this.props.platform} status={this.props.status} description={this.props.description} id={this.props.id} fetchVG={this.props.fetchVG} />
                                <Button onClick={() => { this.deleteVG(this.props.id) }} className="modalButtons"> Delete Movie</Button>
                        </div>
                        </div>
                    </Fade>
                </Modal>
            </div >
        );
    }
}


export default withStyles(styles, { withTheme: true })(MyVGDetails);