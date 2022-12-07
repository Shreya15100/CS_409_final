import React from 'react';
import './player.css'

class Player extends React.Component{
  render(){
    return(
      <div>
        <div className='header'>
            <h1> SPORTS NOW </h1>
        </div>
        
        <div className='loginform'>
          <div className="alternativeLogin">
            <p> New to Sports Now? Sign Up </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Player
