import React, { useState, useEffect, Component } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button } from "@material-ui/core"
import { VGInfo } from './ShowVG';
import { BookInfo } from './ShowBook';
import { MovieInfo } from './ShowMovie'
import MovieDisplay from './ShowMovie'
import VGDisplay from './ShowVG'
import BookDisplay from './ShowBook';
import { render } from '@testing-library/react';
import { EnumType, getTokenSourceMapRange, JSDocEnumTag } from 'typescript';
import userEvent from '@testing-library/user-event';
import APIUrl from '../helpers/environment';
import VGDetails from './DetailVG';
// main view functionality

export interface Props {
    sessionToken: string | null,
    getToken: () => any
}

enum UserType {
    user = "user", 
    admin = "admin"}

// type UserInfo = {
//     firstName: string,
//     role: UserType
// }

type User = {
    // user: UserInfo
    firstName: string,
    role: string,
    videogames: [],
    movies: [],
    books:[],
    modal: boolean
}

export default class MediaDisplay extends Component<Props, User> {
    constructor(props: Props) {
        super(props)
        this.state = {
            firstName: "",
            role: "",
            videogames: [],
            movies: [],
            books: [],
            modal: false
        }
        this.fetchUser = this.fetchUser.bind(this)
    }

    fetchMovie = async () => {
        fetch(`${APIUrl}/movie/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((movies) => {
                this.setState(movies)
                console.log(movies);

            })
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
                this.setState(videogames)
                console.log(videogames);

            })
    }

    fetchBook = async () => {
        fetch(`${APIUrl}/book/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((books) => {
                this.setState(books)
            })
        }
    
    fetchUser = async () => {
        console.log("Function working");
        // console.log(localStorage.getItem('token'));
        
        fetch(`${APIUrl}/user/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":  this.props.getToken()
            }
        })
            .then((res)=> res.json())
            .then((user) => {
                console.log(user);                
                console.log(this.state.firstName);
                this.setState({firstName: user.getUser.firstName})
                console.log(user.getUser.role);
                
                if(user.getUser.role === "admin"){
                this.setState({role: "admin"})
                } else {
                    this.setState({role: "user"})
                }
            })
    }

    componentDidMount() {
        this.fetchMovie()
        this.fetchVG()
        this.fetchBook()
        this.fetchUser()
        
        // console.log(this.props.sessionToken);

    }


    render() {
        console.log(this.state.role);
        console.log(this.state.firstName);
        return (
            <div>
                
                        <div>
                            <h1>Welcome {this.state.firstName}! </h1>
                        </div>
        
                        <MovieDisplay sessionToken={this.props.sessionToken} 
                        role={this.state.role}
                        
                        // modalOn={this.modalOn}
                        />
        
                        <VGDisplay sessionToken={this.props.sessionToken} 
                        role={this.state.role}
                        
                        />
        
                        <BookDisplay sessionToken={this.props.sessionToken} role={this.state.role} fetchBook={this.fetchBook}/>
            </div>
        )
    }
}
