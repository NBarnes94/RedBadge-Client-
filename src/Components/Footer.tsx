import React, { Component } from 'react'


export default class Footer extends Component<{}, {}>{
    constructor(props: {}){
        super(props)
    }

    render(){
        return(
            <div className="footer">
                <p> Media Warehouse ~v.1.0~ first build, Made by Nick Barnes</p>
            </div>
        )
    }
}