import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import * as request from 'superagent';
import { login, resetPassword } from './auth.js'
import {  BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
//=========Importar Componentes=========================
import LoginFirebase from './FirebaseDB.jsx';
//========================================================

const USUARIODB = firebase.database().ref().child('usuarios')

class LoginForm extends React.Component{

  constructor(props){
    super(props);
    this.state = { 
      loginMessage: null,
      email: '',
      ps: '' ,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    console.log(sessionStorage.getItem("Session"))
    if(event.target.id == "email"){ 
      this.setState({email: event.target.value});
    
    }
    if(event.target.id == "password"){ 
        this.setState({ps: event.target.value});
    
    }
        console.log(this.state.email);
  }




  handleSubmit(e){
    e.preventDefault();
    let email = this.state.email.toLowerCase()
    let password = this.state.ps
  
    login(email, password)
      .then((response) => {
        sessionStorage.setItem("Session", this.state.email)
        this.setState(this.setErrorMsg('Conectando'))
        console.log(response)

      }

        
      )
      .catch((error) => {
        this.setState(this.setErrorMsg('Invalid username/password.'))
      })

    
  }

  setErrorMsg(error) {
    return 
      this.setState({loginMessage:error})
    
  }

  checkSession(){
    console.log("Checkeando login" + sessionStorage.getItem("Session"))

    return sessionStorage.getItem("Session");
  }

//====RENDER

    render(){
      if (this.checkSession()){
        return <Redirect to='/tienda'/>
      }
      return(
        <div className="login row">
          <div className="col s6 form-container animated fadeIn slow">
            <form onSubmit={this.handleSubmit}>
              <h4 className="text-center white-text">Inicia Sesión</h4>
              <div className="col s12 input-field">
        
                <input type="email" ref="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="ale@gmail.com" className="validate white-text" required aria-required="true" />
                <label htmlFor="email" data-error="Error en formato de email. Ejemplo: ale@gmail.com" data-success="Formato de email correcto">Correo Electrónico</label>
              </div>
              <div className="col s12 input-field">
                <input type="password" ref="password"  id="password" value={this.state.ps} onChange={this.handleChange}   placeholder="12345" className="validate  white-text" required aria-required="true" />
                <label htmlFor="password" data-error="Contraseña no puede ser vacía" className="white-text">Contraseña</label>
              </div>
              <div className="col s12 center-align">
            
                  {this.state.loginMessage}
     
              
                <button type="submit" className="btn btn-success" >Ingresar</button>
              </div>
            </form>
          </div>
        </div>
     );
    }
//==============================================================================
}
export default LoginForm;
