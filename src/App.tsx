import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Register } from './Components/Auth/Register';
import  MediaDisplay  from './Components/Media/MediaIndex'
import MediaIndex from './Components/Media/MediaIndex';
import {Auth} from './Components/Auth/Auth';

// type currentSession  = {
//   sessionToken: string | null
// }

const App: React.FC = props => {
  // const [sessionToken, setSessionToken] = useState('')


  // useEffect(() =>{
  //   if(localStorage.getItem('token')){
  //     setSessionToken(localStorage.getItem('token'))
  //   }
  // })

  // const updateToken = (newToken: string) =>{
  //   localStorage.setItem('token', newToken);
  //   setSessionToken(newToken);
  //   console.log(sessionToken);
    
  // }
  // const clearToken = () =>{
  //   localStorage.clear();
  //   setSessionToken('')
  // }

  // const protectedViews = () =>{
  //   return(sessionToken === localStorage.getItem('token') ? <MediaIndex token={sessionToken}/> : <Auth updateToken={updateToken}/>)
  // }
  return (
    <div className="App">
      {/* <Register updateSessionToken={updateToken}/> */}
      <MediaDisplay />
      {/* <Auth updateToken={updateToken}/> */}
    </div>
  );
}

export default App;
