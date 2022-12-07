import React from 'react';
import './sign-in.css'
import { Link } from 'react-router-dom';

class SignIn extends React.Component{
  render(){
    return(
      <div>
        <div className='header'>
            <h1> SPORTS NOW </h1>
        </div>
        
        <div className='loginform'>
          <div>
            <FormInput description="Username" placeholder="Enter your username" type="text"/>
            <FormInput description="Password" placeholder="Enter your password" type="password"/>
            <FormButton title="Log in"/>
          </div>
          <div className="alternativeLogin">
            <p> New to Sports Now? <Link to='/sign-up'> Sign Up </Link> </p>
          </div>
        </div>
      </div>
    )
  }
}

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>  
);

const FormButton = props => (
  <div className="button" class="row">
    <button><Link to='/home' className='login'> {props.title} </Link></button>
  </div>
);

export default SignIn
