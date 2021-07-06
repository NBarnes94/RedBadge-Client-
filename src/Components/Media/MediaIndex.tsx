import React, {useState, useEffect} from 'react'
import {makeStyles, Card, CardActions, CardContent, Button } from "@material-ui/core"
import {VGInfo} from './ShowVG';
import {BookInfo} from './ShowBook';
import {MovieInfo} from './ShowMovie'
import MovieDisplay from './ShowMovie'
import VGDisplay from './ShowVG'
// main view functionality

interface IProps { }

const MediaDisplay: React.FC<IProps> = props =>{

    const [movies, setMovies]  = useState<MovieInfo[]>([])
    const [videogame, SetVideogames] = useState<VGInfo[]>([]);
    const [books, setBooks] = useState<BookInfo[]>([]);

    const fetchMovie = async () =>{
        fetch(`http://localhost:3005/movie/all`, {
            method: "GET", 
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
        .then((res) => res.json())
        .then((movies) =>{
            setMovies(movies)
            console.log(movies);
            
        })
    }
    const fetchVG = async () =>{
        fetch(`http://localhost:3005/videoGames/all`, {
            method: "GET", 
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
        .then((res) => res.json())
        .then((videogames) =>{
            SetVideogames(videogames)
            console.log(videogames);
            
        })
    }
    const fetchBook = async () =>{
        fetch(`http://localhost:3005/Books/all`, {
            method: "GET", 
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
        .then((res) => res.json())
        .then((movies) =>{
            setBooks(movies)
        })
    }


    useEffect(() =>{
        // fetchMovie(),
        // fetchVG()
        // fetchBook()
    }, [])

    return(
        <div>
            {/* <MovieDisplay fetchMovie={fetchMovie}/>  */}
            <MovieDisplay />
            <VGDisplay />
        </div>
    )
}

export default MediaDisplay;