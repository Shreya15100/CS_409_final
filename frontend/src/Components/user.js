import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './user.css';
import axios from 'axios';

const User = () => {

  const [choice,setChoice] = useState(1)
  const [curremail,setcurrEmail] = useState('')
  const [newemail,setnewEmail] = useState('')
  const [currpass,setcurrPass] = useState('')
  const [newpass,setnewPass] = useState('')

  const navigate = useNavigate();

  const location = useLocation();
  console.log(location)
  
  let user = null

  if (location.state) {
    user = location.state
    console.log(user)
  } else {
    return (
      <h1>Invalid User. Please log back in.</h1>
    )
  }

  const change = (e) => {
    setcurrEmail(e.target.value)
  }

  const change2 = (e) => {
    setnewEmail(e.target.value)
  }

  const change3 = (e) => {
    setcurrPass(e.target.value)
  }

  const change4 = (e) => {
    setnewPass(e.target.value)
  }

  const handleSubmit1 = (e) => {
    e.preventDefault()

    axios.put('http://localhost:4000/api/unamemodify',{ 
      "olduname" : curremail, "newuname": newemail, "pass": currpass
    })
    .then((response) => {
      if (response.status === 200) {
        var p = {state : response.data.data}
        navigate('/userpage', p)
      }
      
    }, (error) => {
      console.log(error);
    });
    
  }

  const handleSubmit2 = (e) => {
    e.preventDefault()

    axios.put('http://localhost:4000/api/passmodify',{ 
      "uname" : curremail, "newpass": newpass, "oldpass": currpass
    })
    .then((response) => {
      if (response.status === 200) {
        var p = {state : response.data.data}
        navigate('/userpage', p)
      }
      
    }, (error) => {
      console.log(error);
    });
  }

  return (
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
      <div className="catbut">
      <button onClick={() => setChoice(1)}>Change Username</button>
      <button onClick={() => setChoice(2)}>Change Password</button>
      </div>
      {choice === 1 && 
        <form className='loginform'>
        <div>
          <div class='row'>
          <label>CURRENT USERNAME</label>
          <input type="email" placeholder="Current Username" value={curremail} onChange={(e) => change(e)}/>
          <label>NEW USERNAME</label>
          <input type="email" placeholder="New Username" value={newemail} onChange={(e) => change2(e)}/>
          <label>PASSWORD</label>
          <input type="password" placeholder="Password" value={currpass} onChange={(e) => change3(e)}/>
          <button onClick={(e) => handleSubmit1(e)} type='submit'> Go</button>
          </div>
          
        </div>
      </form>
      }
      {choice === 2 && 
      <form className='loginform'>
      <div>
        <div class='row'>
        <label>USERNAME</label>
        <input type="email" placeholder="Current Username" value={curremail} onChange={(e) => change(e)}/>
        <label>NEW PASSWORD</label>
        <input type="password" placeholder="New Password" value={newpass} onChange={(e) => change4(e)}/>
        <label>CURRENT PASSWORD</label>
        <input type="password" placeholder="Current Password" value={currpass} onChange={(e) => change3(e)}/>
        <button onClick={(e) => handleSubmit2(e)} type='submit'> Go</button>
        </div>
        
      </div>
    </form>
    }
    </div>
  )
}

export default User
