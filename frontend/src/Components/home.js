import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


const Home = ({data}) => {

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

  let newFilter = []

  newFilter = data.filter((value) => {
    let id = value.id;
    let flag = 0;
    user.teams.forEach(function(item) {
      if (item === id) {
        flag = 1
        return
      }
    })
    return flag===1;
    });

    console.log(newFilter)
  

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
          <div class="child">User Teams</div>
          <div classname='table'>
            <table>
          {newFilter.map((value, key) => {
            
            return (
              
                
                  <tr>
                  <td><p id="listitem">{value.full_name.toUpperCase()} </p></td>
                  <td><p id="listitem">{value.abbreviation.toUpperCase()} </p></td>
                  <td><p id="listitem">{value.city.toUpperCase()} </p></td>
                  <td><p id="listitem">{value.conference.toUpperCase()} CONFERENCE</p></td>
                  <td><p id="listitem">{value.division.toUpperCase()} DIVISON</p></td>
                  </tr>
                
              
            );
          })}
          </table>
          </div>
      </div>

    </div>
  )
}

export default Home
