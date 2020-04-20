import React from 'react'
import ReactDom from 'react-dom'
import UrlService from '../services/UrlService';
import Loading from './Loading'
import FatalError from '../pages/500'
import  { Modal }  from  'react-bootstrap' ;

//Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css"
import './styles/style.css'

class NewOrder extends React.Component{

    state = {
        isOpen: false,
        data: [],
        token: localStorage.token,
        userId: localStorage.id,
        loading: true,
        error: null,

        //

        form:{
        }



    }

    //Cargamos datos al cargar este componente
    async componentDidMount(){
        await this.fetchProducts()
    }

    //Función para la carga de los productos desde la API
    fetchProducts = async () => {
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
            let res = await fetch(UrlService.productsUrl(), config)
            //convertimos la respuesta
            let data = await res.json()
            //Usamos nuestro state para renderizar la informacíon
            this.setState({
                //Persistimos los datos en el estado del componente
                data,
                loading: false
            })
            
        } catch (error) {
            this.setState({
                error
            })
        }
    }

   //Persistir datos del formulario
    handleChange = e => {
        console.log(`${e.target.name}: ${e.target.value}`)
        // generamos un objeto para almacenar la información obtenida:
        let partialState = {}
        partialState[e.target.name] = e.target.value
        this.setState(partialState)
        

        //Mejoramos codigo con Babel:
    
        this.setState({
            form: {
                //Le decimos que mantenga la estructura anterior y si es un nuevo key
                //va a agregarlo al objeto
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form)

    }


    handleSubmit = e => {
        //Evitamos que el submit nos refresque la pagina
        e.preventDefault()
    }



    //traemos los datos del elemento y cambiamos el estado del modal
    showModal = () => {
        // await this.showModalEdit(this.props.userId)
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

        const products = this.state.data
        //Creamos una constante que resive todos los datos de nuestro estado, data[]
        // const orders = this.state.data

        return(
            <React.Fragment>
            <button className="btn btn-info" alt="Editar" title="Editar" onClick={this.showModal}><FontAwesomeIcon icon={faPlusSquare} /> New Order</button>
            <Modal 
            show={this.state.isOpen} 
            onHide={this.hideModal}
            size="lg"
            aria-labelledby="example-modal-sizes-title-lg">
                
            
                <Modal.Header>
                    <Modal.Title>Nombre del dueño</Modal.Title>
                </Modal.Header>
                {/* {this.loading()} */}
                <form onSubmit={this.handleSubmit}>

                    <Modal.Body>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Productos</label>
                                            <select name="product1" value={this.state.form.product1} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option selected>Choose...</option>
                                                {
                                                    // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                                                    products.map((product) => {
                                                        return(
                                                            <option key={product.id} value={product.name} >{product.name}</option>    
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                        <label>Cantidad</label>
                                        <select  name="quantity1" value={this.state.form.quantity1} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option selected>Choose...</option>
                                            <option value='1'>1</option>
                                            <option value='5' >5</option>
                                            <option value='20' >20</option>
                                        </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Productos</label>
                                            <select name="product2" value={this.state.form.product2} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option selected>Choose...</option>
                                                {
                                                    // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                                                    products.map((product) => {
                                                        return(
                                                            <option key={product.id} value={product.name} >{product.name}</option>    
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                        <label>Cantidad</label>
                                        <select  name="quantity2" value={this.state.form.quantity2} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option selected>Choose...</option>
                                            <option value='1'>1</option>
                                            <option value='5' >5</option>
                                            <option value='20' >20</option>
                                        </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Productos</label>
                                            <select name="product3" value={this.state.form.product3} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option selected>Choose...</option>
                                                {
                                                    // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                                                    products.map((product) => {
                                                        return(
                                                            <option key={product.id} value={product.name} >{product.name}</option>    
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                        <label>Cantidad</label>
                                        <select  name="quantity3" value={this.state.form.quantity3} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option selected>Choose...</option>
                                            <option value='1'>1</option>
                                            <option value='5' >5</option>
                                            <option value='20' >20</option>
                                        </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Productos</label>
                                            <select name="product4" value={this.state.form.product4} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option selected>Choose...</option>
                                                {
                                                    // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                                                    products.map((product) => {
                                                        return(
                                                            <option key={product.id} value={product.name} >{product.name}</option>    
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                        <label>Cantidad</label>
                                        <select  name="quantity4" value={this.state.form.quantity4} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option selected>Choose...</option>
                                            <option value='1'>1</option>
                                            <option value='5' >5</option>
                                            <option value='20' >20</option>
                                        </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Productos</label>
                                            <select name="product5" value={this.state.form.product5} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option selected>Choose...</option>
                                                {
                                                    // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                                                    products.map((product) => {
                                                        return(
                                                            <option key={product.id} value={product.name} >{product.name}</option>    
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                        <label>Cantidad</label>
                                        <select  name="quantity5" value={this.state.form.quantity5} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option selected>Choose...</option>
                                            <option value='1'>1</option>
                                            <option value='5' >5</option>
                                            <option value='20' >20</option>
                                        </select>
                                        </div>
                                    </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </section>      
                    </Modal.Body>                    
                    <Modal.Footer>
                    <button className="btn btn-primary float-left" 
                    type="submit"
                    onClick={this.hideModal} 
                    >Guardar</button>
                    <button className="btn btn-secondary float-right" onClick={this.hideModal} >Cancel</button>

                    </Modal.Footer>
                    </form>
            </Modal>
            </React.Fragment>
        )
    }

}

export default NewOrder