import React from "react";
import './_style.scss';
import UrlService from './../../services/UrlService';
import FatalError from '../500'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

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

    try {            
      let config = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(postData)
      }
      //Hacemos llamado al API
      let res = await fetch(UrlService.loginUrl(), config)
      //convertimos la respuesta
      let data = await res.json()

      // console.log(data)
      if(data.access_token){
        const token = 'Bearer '+data.access_token
        //almacenamos nuesto token en la varialbe global para mantener nuestra sesión habilitada
        localStorage.setItem('token', token)
        // console.log(localStorage)
      }
      
      //Redireccionamos hacia la vista
      this.props.history.push('/')
      } catch (error) {
          //Usamos nuestro state para renderizar la informacíon
          this.setState({
              //Cambiamos el estado de Loading cuando carguen nuestros datos
              error
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
        <div className="login-page">
          <div className="login-box">
            <div className="login-logo">
              <a href="/" onClick={(event) => { event.preventDefault() }}><b>Beitech</b>ADMIN</a>
            </div>

            <div className="card">
              <div className="card-body login-card-body">
                <p className="login-box-msg">Inicio de Sesión</p>

                <form onSubmit={(event) => this.handleFormSubmit(event)}>
                  <div className="input-group mb-3">
                    <input type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={event => this.setState({ email: event.target.value })} />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={event => this.setState({ password: event.target.value })} />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <div className="icheck-primary">
                        <input type="checkbox" id="remember" onChange={() => this.handleChecked()} checked={isChecked} />
                        <label onClick={() => this.handleChecked()} id="remember-label">Recordarme</label>
                      </div>
                    </div>
                    <div className="col-4">
                      <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
                    </div>
                  </div>
                </form>

                <p className="mb-1">
                  <a href="forgot-password.html">Recuperar COntraseña</a>
                </p>
                <p className="mb-0">
                  <a href="register.html" className="text-center">Registrar un nuevo usuario</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;