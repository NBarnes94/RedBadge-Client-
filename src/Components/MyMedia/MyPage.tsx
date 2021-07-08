import React, {Component} from 'react'
import {MyVG} from './MyVG'
import {MyBooks} from './MyBooks'
import {MyMovies} from "./MyMovies"


type PageProps ={
    sessionToken: string | null
}

export class MyPage extends Component<PageProps, {}>{
    constructor(props: PageProps){
        super(props)
    }

    render(){
        return(
            <div>
                <h1>HUMMUS</h1>

                <MyMovies sessionToken={this.props.sessionToken}/>
                <MyVG sessionToken={this.props.sessionToken}/>
                <MyBooks sessionToken={this.props.sessionToken}/>
            </div>
        )
    }
}