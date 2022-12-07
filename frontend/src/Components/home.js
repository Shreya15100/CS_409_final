import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';

class Home extends React.Component{
  render(){
    return(
      <div>
        <nav className="navbar">
            <Link to="/home" className="site-title"> SPORTS NOW </Link>
            <ul>
                <Link to="/teams">Teams</Link>
                <Link to="/players">Players</Link>
                <Link to="/user"> 
                    <div class="circle">
                        <p class="text">User</p>
                    </div>
                </Link>
            </ul>
        </nav>

        <div class="parent">
            <div class="child">Top 5 Teams</div>
            <div class="child">Top 5 Players</div>
        </div>

      </div>
    )
  }
}

export default Home
