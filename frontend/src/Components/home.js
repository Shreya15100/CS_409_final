import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


const Home = () => {

  const location = useLocation();
  console.log(location)

  if (location.state) {
    var user = location.state
    console.log(user)
  } else {
    return (
      <h1>Invalid User. Please log back in.</h1>
    )
  }
  

  return(
    <div>
      <nav className="navbar">
          <Link to="/home" className="site-title" state={user}> SPORTS NOW </Link>
          <ul>
              <Link to="/teams" state={user}>Teams</Link>
              <Link to="/userpage" state={user}> 
                  <div class="circle">
                      <p class="text">User</p>
                  </div>
              </Link>
          </ul>
      </nav>

      <div class="parent">
          <div class="child">Top 5 Teams</div>
      </div>

    </div>
  )
}

export default Home
