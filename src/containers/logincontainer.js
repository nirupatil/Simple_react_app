import React, {Component} from 'react'
import LogIn from '/home/niranjan/Documents/example2-app/src/components/LogIn';
import AuthService from '/home/niranjan/Documents/example2-app/src/components/AuthService';
import {Redirect} from 'react-router-dom';
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
class LoginContainer extends Component {
	constructor() {
    super();
    this.state={
    	email:"",
    	password:"",
    	formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      response:"",
      statuscode:""
    }
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
   /* this.changeHandler = this.changeHandler.bind(this)*/
  }
handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

/*changeHandler(event){
    	console.log('in change handlet')
    	const {name,value} =  event.target
    	this.setState({
    		[name]:value
    	})
}*/
  handleSubmit(event) {
  	
    event.preventDefault();
      
    this.Auth.login(this.state.email,this.state.password)
      .then(res =>{
          this.props.history.replace('/');
      })
      .catch(err =>{
          alert(err);
      })     
   /* var formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password)
    fetch('http://localhost:3002/authenticate', {
      method: 'POST',
      body: formData,
    }).then(response => this.setState({statuscode: response.status}))
	.then(response => console.log(this.state.statuscode))*/
  }
  componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.replace('/');
  }
  render() {
    return (
      <LogIn 
        email = {this.state.email} 
        password = {this.state.password}
        handleSubmit = {this.handleSubmit} 
        formErrors = {this.state.formErrors}
        formValid = {this.state.formValid}
        handleUserInput = {this.handleUserInput}
      />

      
    );
  }
}
export default LoginContainer;

