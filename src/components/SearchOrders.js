import React from 'react'
import ReactDom from 'react-dom'
import UrlService from '../services/UrlService';

//Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import  { Modal }  from  'react-bootstrap' ;

class SearchOrder extends React.Component{

    state = {
        isOpen: false,
        data: [],
        token: localStorage.token
    }

    //Resivimos el id del evento, para traerlo de la API
    showModalEdit = async () => {
        try {          
            //Creamos un objeto de configuración para enviar al API  
            let config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token
                }
            }
            //Hacemos SOLICITUD al API
            let res = await fetch(UrlService.ordersUrl(), config)
            //convertimos la respuesta
            let data = await res.json()
            console.log(data)
            //Usamos nuestro state para renderizar la informacíon
            this.setState({
                //Persistimos los datos en el estado del componente
                data
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    //Guardamos la actualización del elemento
    //Evento para empaquetar nuestra colección y enviarla al API
    handleSubmit = async e => {
        //Evitamos que el submit nos refresque la pagina
        e.preventDefault()

        //Asignamosel valor resivido del input y lo almacenamos
        let name = e.target.name.value
        let id = this.state.data.id
        //Actualizamos el valor a nuestro objeto
        this.state.data.name = name

        try {
            let config = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.data)
            }
            //El fetch resive como parametros:
            // ruta, 
            let res = await fetch(`/api/workposition/${id}`, config)
            //Respuesta de la API
            let json = await res.json()

            //Redireccionamos hacia la vista
            this.props.Actualizar()

        } catch (error) {
            this.setState({
                loading: false,
                error
            })    
        }

    }

    //traemos los datos del elemento
    showModal = () => {
        this.setState({
            //Cambiamos el estado de Loading cuando carguen nuestros datos
            isOpen: true
          })
        this.showModalEdit()       
    };
  //Con esta función ocultamos el modal
    hideModal = () => {
        this.setState({
            //Cambiamos el estado de Loading cuando carguen nuestros datos
            isOpen: false
          })   
    };

    
    render(){
        const {userId} = this.props
        return(
            <React.Fragment>
            <button className="btn btn-info" alt="Editar" title="Editar" onClick={this.showModal} value={userId}><FontAwesomeIcon icon={faEye} /></button>
            <Modal show={this.state.isOpen} onHide={this.hideModal}>
                <Modal.Header>
                    <Modal.Title>Puesto</Modal.Title>
                </Modal.Header>
                <form 
                        //Llamamos la función para evitar el reload de la pagina
                        onSubmit={this.handleSubmit}
                    >
                    <Modal.Body>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="hola" 
                                name="name"
                                // onChange={onChange}
                                //Con este metodo nos aseguramos de que la información tenga una sola fuente
                                required
                            />
                        </div>          
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary float-right" onClick={this.hideModal} >Cancel</button>
                        <button type="submit" className="btn btn-success float-right" onClick={this.hideModal} >Guardar</button>
                    </Modal.Footer>
                </form>
            </Modal>
            </React.Fragment>
        )
    }

}

export default SearchOrder