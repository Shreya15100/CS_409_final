import React from 'react';
import './sign-up.css'
import { Link } from 'react-router-dom';

class SignUp extends React.Component{
  render(){
    return(
      <div>
        <div className='header'>
            <h1> SPORTS NOW </h1>
        </div>
        
        <div className='signupform'>
          <div>
            <FormInput placeholder="First Name" type="text"/>
            <FormInput placeholder="Last Name" type="text"/>
            <FormInput placeholder="Enter your username" type="text"/>
            <FormInput placeholder="Enter your password" type="password"/>
            <FormInput placeholder="Confirm password" type="password"/>
            <FormButton title="Log in"/>
          </div>
          <div className="alternativeLogin">
            <p> Already have an account? <Link to='/'> Sign In </Link> </p>
          </div>
        </div>
      </div>
    )
  }
}

const FormInput = props => (
  <div class="row">
    <input type={props.type} placeholder={props.placeholder}/>
  </div>  
);

const FormButton = props => (
  <div className="button" class="row">
    <button><Link to='/home' className='signup'> {props.title} </Link></button>
  </div>
);

export default SignUp

