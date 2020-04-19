import React from 'react'
import ReactDom from 'react-dom'
import UrlService from '../services/UrlService';
import Loading from './Loading'
import FatalError from '../pages/500'

//Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import  { Modal }  from  'react-bootstrap' ;

class SearchOrder extends React.Component{

    state = {
        isOpen: false,
        data: [],
        token: localStorage.token,
        loading: true,
        error: null,
    }

    //Resivimos el id del evento, para traerlo de la API
    showModalEdit = async prop => {
            //resivimos el id del usuario seleccionado
            const userId = prop
            // console.log(e.target.value)
        try {    
            const postData = {
                id: userId
              }
            //Creamos un objeto de configuración para enviar al API  
            let config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token
                },
                body: JSON.stringify(postData)
            }
            //Hacemos SOLICITUD al API
            let res = await fetch(UrlService.ordersUrl(), config)
            //convertimos la respuesta
            let data = await res.json()
            console.log(data)
            //Usamos nuestro state para renderizar la informacíon
            this.setState({
                //Persistimos los datos en el estado del componente
                data,
                loading: false
            })
        } catch (error) {
            //Resivimos los errores
            console.log(error)
        }
    }

    //traemos los datos del elemento y cambiamos el estado del modal
    showModal = async () => {
        await this.showModalEdit(this.props.userId)

        this.setState({
            isOpen: true
        })   
      };

    //Con esta función ocultamos el modal cambiando su estado
    hideModal = e => {
        e.preventDefault()
        this.setState({
            isOpen: false
          })   
    };

    //Convertimos el string en un array
    stringtoArray(strng){
        let array = strng.split(", ");
        for (let index = 0; index < array.length; index++) {
            //Le asignamos un salto de linea a cada elemento resivido
            array[index] = <div>{array[index]}<br/></div>
        }
        return array
    }

    //Cargando
    loading(){
        if(this.state.loading){
            return < Loading />
        }
    }


    render(){

        //Validamos si existen errores
        if(this.state.error){
            return <FatalError />
        }

        const {userId} = this.props
        //Creamos una constante que resive todos los datos de nuestro estado, data[]
        const orders = this.state.data

        return(
            <React.Fragment>
            <button className="btn btn-info" alt="Editar" title="Editar" onClick={this.showModal} value={userId}><FontAwesomeIcon icon={faEye} /></button>
            <Modal 
            show={this.state.isOpen} 
            onHide={this.hideModal}
            size="lg"
            aria-labelledby="example-modal-sizes-title-lg">
                {this.loading()}
            
                <Modal.Header>
                    <Modal.Title>Nombre del dueño</Modal.Title>
                </Modal.Header>
                <form 
                        //Llamamos la función para evitar el reload de la pagina
                        onSubmit={this.handleSubmit}
                    >
                    <Modal.Body>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Mis Ordenes</h3>
                                            <div className="card-tools">
                                                <div className="input-group input-group-sm">
                                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />

                                                    <div className="input-group-append">
                                                    <button type="submit" className="btn btn-default"><i className="fas fa-search"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body table-responsive p-0">
                                            <table className="table table-hover tUploadext-nowrap">
                                                <thead>
                                                    <tr>
                                                    <th>Creation Date</th>
                                                    <th>Order Id</th>
                                                    <th>Total</th>
                                                    <th>Products</th>
                                                    <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>                    
                                                {                                                        
                                                // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                                                orders.map((order) => {                               
                                                    return(
                                                        <tr key={order.orderid}>
                                                        <th>{order.creationdate}</th>
                                                        <th>{order.orderid}</th>
                                                        <th>{order.total}</th>       
                                                        {/* LLAMAMOS A NUESTRA FUNCIÓN ARA CONVERTIR STRING EN ARREGLOS                                                  */}
                                                        <th>{this.stringtoArray(order.products) }</th>
                                                        <th>{this.stringtoArray(order.quantity) } </th>                                                          
                                                        </tr>      
                                                    )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>        
                                </div>
                            </div>
                        </div>
                    </section>      
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary float-right" onClick={this.hideModal} >Cancel</button>
                    </Modal.Footer>
                </form>
            </Modal>
            </React.Fragment>
        )
    }

}

export default SearchOrder