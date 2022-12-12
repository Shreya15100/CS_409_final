import React from 'react';
import {useState} from 'react';
import './sign-in.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignIn = () => {

  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const [auth, setAuth] = useState(0)

  const navigate = useNavigate();

  const change = (e) => {
    setEmail(e.target.value)
  }

  const change2 = (e) => {
    setPass(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    axios.get('http://localhost:4000/api/users',{ params:{
      "username" : email, "password": pass}
    })
    .then((response) => {
      if (response.status === 200) {
        setAuth(1)
       
        var p = {state : response.data.data[0]}
        console.log(p)
        navigate('/home', p)
      } else {
        setAuth(-1)
        window.location.reload(false);
      }
      
    }, (error) => {
      console.log(error);
    });
  }

  const FormButton = props => (
    <div className="button" class="row">
      <button onClick={(e) => handleSubmit(e)} type='submit'> {props.title} </button>
    </div>
  );

  return(
    <div>
      <div className='header'>
          <h1> SPORTS NOW </h1>
      </div>
      
      <form className='loginform'>
        <div>
          <div class='row'>
            <label>USERNAME</label>
          <input type="email" placeholder="Username" value={email} onChange={(e) => change(e)}/>
          <label>PASSWORD</label>
          <input type="password" placeholder="Password" value={pass} onChange={(e) => change2(e)}/>
          </div>
          <FormButton title="Log in"/>
        </div>
        <div className="alternativeLogin">
          <p> New to Sports Now? <Link to='/sign-up'> Sign Up </Link> </p>
        </div>
        <div>
          {auth === -1 && 
          <h4>"Incorrect Credentials"</h4>}
        </div>

      </form>

    </div>
  )

}

export default SignIn
