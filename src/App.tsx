import React, { useEffect, useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Register } from './Components/Auth/Register';
import MediaDisplay from './Components/Media/MediaIndex'
// import MediaIndex from './Components/Media/MediaIndex';
import { Auth } from './Components/Auth/Auth';
import RouteDom from './Components/Routes/Switch'
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import  BigNavbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer'
import {Route, Switch} from 'react-router-dom'
import {MyPage} from './Components/MyMedia/MyPage'


type CurrentSession = {
  sessionToken: string | null 
}

export class App extends Component<{}, CurrentSession> {
  constructor(props: { }) {
    super(props);
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
    this.getToken = this.getToken.bind(this);
    this.state = { sessionToken: null };
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
    const authorized = this.state.sessionToken

    return (authorized ? <MediaDisplay getToken={this.getToken} sessionToken={this.state.sessionToken}/>  : <Auth updateToken={this.updateToken}/> )
  }

  render() {
    
    return (
      <div className="App">
        <Router>
        <BigNavbar updateToken={this.updateToken} sessionToken={this.state.sessionToken} clearSession={this.clearToken}/>
        <Switch>
                    <Route exact path="/home"><App /></Route>
                    <Route exact path="/">{this.state.sessionToken ? <Redirect to="/allMedia"/> : <Auth updateToken={this.updateToken}/> }</Route>
                    <Route exact path="/allMedia"><MediaDisplay getToken={this.getToken} sessionToken={this.state.sessionToken}/></Route>
                    <Route exact path="/myPage"><MyPage sessionToken={this.state.sessionToken}/></Route>
        </Switch>

        {/* <RouteDom updateToken={this.updateToken} sessionToken={this.state.sessionToken} clearSession={this.clearToken} getToken={this.getToken}/>
        {this.protectedViews()} */}
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
