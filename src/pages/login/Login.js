import React from "react";
import axios from 'axios';
import UrlService from './../../services/UrlService';
import '../../components/styles/style.css'
import FatalError from '../500'

class Login extends React.Component {
  state = {
    //Error para verificar si el seridor tiene conexión
    error: null,
    //Parametros de autenticación
    email: '',
    password: '',
    isChecked: false
  }
  
  
  async componentDidMount(){
    this.setState({
      //Cambiamos el estado de Loading cuando carguen nuestros datos
      loading: false
    })
    console.log(localStorage)
  }

  //Consumimos nuestra API de back, Función asincrona
  async handleFormSubmit(event) {
    event.preventDefault();
    // Empaquetamos los datos del formulario en un objeto
    const postData = {
      email: this.state.email,
      password: this.state.password,
      remember_me: this.state.isChecked
    }

    let jsonpostdata = JSON.stringify({postData: postData});

    try {            
            //Creamos un objeto de configuración para enviar al API  
            let config = {
              method: 'POST',
              mode: 'cors',
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
              },
              body: JSON.stringify(postData)
          }
          //Hacemos SOLICITUD al API
          let res = await fetch(UrlService.loginUrl(), config)
          //convertimos la respuesta
          let data = await res.json()
          console.log(data)

      // console.log(data)
      if(data.access_token){
        const token = 'Bearer '+data.access_token
        //almacenamos nuesto token en la varialbe global para mantener nuestra sesión habilitada
        localStorage.setItem('token', token)
        localStorage.setItem('id', data.userId)
        // console.log(localStorage)
      }
      
      //Redireccionamos hacia la vista
      this.props.history.push('/')
      } catch (error) {
          console.log(error)
          //Usamos nuestro state para renderizar la informacíon
          this.setState({
              //Cambiamos el estado de Loading cuando carguen nuestros datos
              
          })
      }
  }

  //Función para cambiar el estado de nuestro check
  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    //Validamos si existen errores
    if(this.state.error){
      return <FatalError />
    }

    const { email, password, isChecked } = this.state;
    return (
      <React.Fragment>
      <div id="padre">
        <div id="hijo">
          <form onSubmit={(event) => this.handleFormSubmit(event)}>
            <div className="form-group">
              <label for="exampleDropdownFormEmail1">Email address</label>
              <input type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={event => this.setState({ email: event.target.value })} />
            </div>
            <div className="form-group">
              <label for="exampleDropdownFormPassword1">Password</label>
              <input type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={event => this.setState({ password: event.target.value })} />            </div>
            <div className="form-group">
              <div className="form-check">
                <input  className="form-check-input" type="checkbox" id="remember" onChange={() => this.handleChecked()} checked={isChecked} />
                <label className="form-check-label" onClick={() => this.handleChecked()} id="remember-label">Recordarme</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </form>
          <div className="dropdown-divider"></div>
          {/* <a className="dropdown-item">New around here? Sign up</a>
          <a className="dropdown-item">Forgot password?</a> */}
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;