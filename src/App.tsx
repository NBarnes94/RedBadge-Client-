import React, { useEffect, useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Register } from './Components/Auth/Register';
import MediaDisplay from './Components/Media/MediaIndex'
// import MediaIndex from './Components/Media/MediaIndex';
import { Auth } from './Components/Auth/Auth';
import RouteDom from './Components/Routes/Switch'
import {BrowserRouter as Router} from 'react-router-dom';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import  BigNavbar from './Components/Navbar/Navbar';

type CurrentSession = {
  sessionToken: string | null
}

export class App extends Component<{}, CurrentSession> {
  constructor(props: any) {
    super(props);
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
    this.getToken = this.getToken.bind(this);
    this.state = { sessionToken: '' };
  }


  // useEffect(() =>{
  //   if(localStorage.getItem('token')){
  //     setSessionToken(localStorage.getItem('token'))
  //   }
  // })

  updateToken(newToken: string) {
    this.setState({ sessionToken: newToken });
    localStorage.setItem("token", newToken)
    console.log(newToken);
  }


  clearToken() {
    localStorage.clear();
    this.setState({ sessionToken: null })
    window.location.reload()
  }

  getToken() {
    return this.state.sessionToken
  }

  componentDidMount() {
    this.getToken()
  }

  protectedViews() {
    return (this.state.sessionToken === "" || undefined ? <Auth updateToken={this.updateToken}/>  : <MediaDisplay sessionToken={this.state.sessionToken} />)
  }

  render() {

    const sessionToken: string | null = localStorage.getItem('token');
    return (
      <div className="App">
        <Router>
        <BigNavbar updateToken={this.updateToken} sessionToken={this.state.sessionToken} clearSession={this.clearToken}/>
        <RouteDom updateToken={this.updateToken} sessionToken={this.state.sessionToken} clearSession={this.clearToken}/>
        {this.protectedViews()}
        </Router>
      </div>
    );
  }
}

export default App;
