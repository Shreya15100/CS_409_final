import React from 'react';
import {useState} from 'react';
import './sign-in.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {

  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const [cpass,setcPass] = useState('')
  const [auth, setAuth] = useState(0)

  const navigate = useNavigate();

  const change = (e) => {
    setEmail(e.target.value)
  }

  const change2 = (e) => {
    setPass(e.target.value)
  }

  const change3 = (e) => {
    setFname(e.target.value)
  }

  const change4 = (e) => {
    setLname(e.target.value)
  }

  const change5 = (e) => {
    setcPass(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    axios.post('http://localhost:4000/api/users',{ 
      "fname" : fname, "password": pass, "lname" : lname, "uname": email
    })
    .then((response) => {
      if (response.status === 201) {
        setAuth(1)
        var p = {state : response.data.data}
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
          <label>FIRST NAME</label>
          <input type="email" placeholder="First name" value={fname} onChange={(e) => change3(e)}/>
          <label>LAST NAME</label>
          <input type="email" placeholder="Last name" value={lname} onChange={(e) => change4(e)}/>
            <label>USERNAME</label>
          <input type="email" placeholder="Username" value={email} onChange={(e) => change(e)}/>
          <label>PASSWORD</label>
          <input type="password" placeholder="Password" value={pass} onChange={(e) => change2(e)}/>
          <label>CONFIRM PASSWORD</label>
          <input type="password" placeholder="Confirm Password" value={cpass} onChange={(e) => change5(e)}/>
          </div>
          <FormButton title="Sign up"/>
        </div>
        <div className="alternativeLogin">
          <p> Already have an account? <Link to='/'> Sign In </Link> </p>
        </div>
        <div>
          {auth === -1 && 
          <h4>"Incorrect Credentials"</h4>}
        </div>

      </form>

    </div>
  )

}

export default SignUp
