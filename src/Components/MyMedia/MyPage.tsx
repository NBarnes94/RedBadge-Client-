import React, {Component} from 'react'


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
            </div>
        )
    }
}