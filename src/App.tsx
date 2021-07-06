import React, { useEffect, useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Register } from './Components/Auth/Register';
import MediaDisplay from './Components/Media/MediaIndex'
// import MediaIndex from './Components/Media/MediaIndex';
import { Auth } from './Components/Auth/Auth';


export class App extends Component<{}, { token: string | null }> {
  constructor(props: any) {
    super(props);
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
    this.getToken = this.getToken.bind(this);
    this.state = { token: null };
  }


  // useEffect(() =>{
  //   if(localStorage.getItem('token')){
  //     setSessionToken(localStorage.getItem('token'))
  //   }
  // })

  updateToken(newToken: string) {
    this.setState({ token: newToken });
    localStorage.setItem("token", newToken)
    console.log(newToken);
  }


  clearToken() {
    localStorage.clear();
    this.setState({ token: null })
  }

  getToken() {
    return this.state.token
  }

  componentDidMount() {
    this.getToken()
  }

  protectedViews() {
    return (this.state.token === localStorage.getItem('token') ? <MediaDisplay getToken={this.getToken} /> : <Auth updateToken={this.updateToken} />)
  }

  render() {

    // const loggedIn = this.state.token
    // let view;
    // if (loggedIn) {
    //   view = (
    //     <div>
    //     <MediaDisplay getToken={this.getToken} />
    //     </div>
    //   )
    // } else {
    //   <div>
    //   <Auth updateToken={this.updateToken} />
    //   </div>
    // }
    return (
      <div className="App">
        {/* {view} */}
        {/* {/* {<Register updateSessionToken={updateToken}/> */}
        {this.protectedViews()}
        {/* <Auth updateToken={this.updateToken} />
        <MediaDisplay getToken={this.getToken}/> */}
      </div>
    );
  }
}

export default App;
