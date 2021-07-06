
import React, { useEffect, useState, Component } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button } from "@material-ui/core"
import { Interface } from 'readline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type, UserInfo } from 'os'



// import  {video} from'@fortawesome/fontawesome-svg-core'
// will build out the 

export interface VGProps { }

export interface VGInfo {
    id: number,
    title: string,
    genre: string,
    developer: string,
    platform: string,
    description: string,
    status: string,
    owner_id: number
}

// type VGState{
//     vgStuff: [VGInfo]
// }

// export class VGDisplay extends Component<{}, VGState>{
//     constructor(props: {}) {
//         super(props);
//         this.state = {
//             id: 0,
//             title: "",
//             genre: "",
//             developer: "",
//             platform: "",
//             description: "",
//             status: "",
//             owner_id: 1
//         }
//     }

//     componentDidMount(){
//         this.fetchVG();
//     }

//     fetchVG = () => {
//         fetch(`http://localhost:3005/videoGames/all`, {
//             method: "GET",
//             headers: new Headers({
//                 "Content-Type": 'application/json'
//             })
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 this.setState(vgStuff: data.videoGames)
//                 console.log(data);

//             })
//     }

//     render() {
//         return (
//             <div>
//             {videogames.map(videogames => {
//                 <Card>
//                     <CardContent>
//                         <h4>0</h4>
//                         <h2>{videogames.title}</h2>
//                         <Button >Details</Button>
//                     </CardContent>
//                 </Card>
//             })}
//         </div>
//         )
//     }
// }

const VGDisplay: React.FC<VGProps> = props => {

    const [videogames, setVideoGames] = useState<VGInfo[]>([]);
    // ({
    //     id: null,
    //     title: null,
    //     genre: null,
    //     studio: null, 
    //     runTime: null,
    //     description: null,
    //     status: null,
    //     owner_id: null 
    // })

    const fetchVG = async () => {
        fetch(`http://localhost:3005/videoGames/all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
            .then((res) => res.json())
            .then((videogames) => {
                setVideoGames(videogames)
                console.log(videogames);

            })
    }

    useEffect(() => {
        fetchVG()
    }, [])

    return (
        <div>
            <h1>VideoGame</h1>
            {videogames.map((videogame, index) => {
                return  (
                <Card>
                    <CardContent>

                        <h4 key={index}>0</h4>
                        <h2>{videogame.title}</h2>
                        <Button >Details</Button>
                    </CardContent>
                </Card>
                )
            })}
        </div>
    )
}

export default VGDisplay;