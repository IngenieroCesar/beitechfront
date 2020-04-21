import React from 'react'
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

        //Utilizamos Componentes no controlados para poder generar una relación entre la cantidad y el producto
        select: React.createRef(),
        select2: React.createRef(),
        select3: React.createRef(),
        select4: React.createRef(),
        select5: React.createRef(),
        select6: React.createRef(),
        select7: React.createRef(),
        select8: React.createRef(),
        select9: React.createRef(),
        select0: React.createRef(),

        //Generamos un objeto que relacione el producto con la cantidad
        form:{
            userid:localStorage.id,
            product1: {
                name: '',
                quantity: '',
            },
            product2: {
                name: '',
                quantity: '',
            },
            product3: {
                name: '',
                quantity: '',
            },
            product4: {
                name: '',
                quantity: '',
            },
            product5: {
                name: '',
                quantity: '',
            },
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
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
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

    //Persistir datos del formulario con validaciónes de campos
    handleChange = async e => {
        console.log(e.target.value)
        const formulario = this.state.form

        if(formulario.product1.name !== e.target.value & formulario.product2.name !== e.target.value &
            formulario.product3.name !== e.target.value & formulario.product4.name !== e.target.value &
            formulario.product5.name !== e.target.value 
        ){
            this.setState({
                form:{
                    userid:localStorage.id,
                    product1: {
                        name: this.state.select.current.value,
                        quantity: this.state.select2.current.value,
                    },
                    product2: {
                        name: this.state.select3.current.value,
                        quantity: this.state.select4.current.value,
                    },
                    product3: {
                        name: this.state.select5.current.value,
                        quantity: this.state.select6.current.value,
                    },
                    product4: {
                        name: this.state.select7.current.value,
                        quantity: this.state.select8.current.value,
                    },
                    product5: {
                        name: this.state.select9.current.value,
                        quantity: this.state.select0.current.value,
                    },
                }
    
            })

            console.log(formulario)
        }

        // Hacems validación de productos, para que noi se repitan:
        //Obtenemos el valor de cada evento con onChange, y lo comparamos con los valores 
        //del objeto formulario que se va actualizando cada vez que interactuamos con los elementos
        //del formulario:

        if(formulario.product1.name === e.target.value || formulario.product2.name === e.target.value){
            console.log(e.target.value)
            alert('El Producto '+ e.target.value + ' ya ha sido seleccionado, Cambialo ya que no se registrara nuevamente.')
        }else if(formulario.product3.name === e.target.value || formulario.product4.name === e.target.value){
            console.log(e.target.value)
            alert('El Producto '+ e.target.value + ' ya ha sido seleccionado, Cambialo ya que no se registrara nuevamente.')
        }else if(formulario.product5.name === e.target.value){
            console.log(e.target.value)
            alert('El Producto '+ e.target.value + ' ya ha sido seleccionado, Cambialo ya que no se registrara nuevamente.')
        }

    }

   
    fetchOrder = async e => {
        //Validación de campo cantidad si existe campo producto:
        const formulario = this.state.form
        if(formulario.product1.name !== '' & formulario.product1.quantity === '' ||
           formulario.product2.name !== '' & formulario.product2.quantity === '' ||
           formulario.product3.name !== '' & formulario.product3.quantity === '' ||
           formulario.product4.name !== '' & formulario.product4.quantity === '' ||
           formulario.product5.name !== '' & formulario.product5.quantity === ''
        ){
            console.log('falta la cantidad')
            alert('Falta la cantidad para uno de los productos, por favor completalo, ó elige el campo "Sin Registro"')
            return
        }else if(formulario.product1.name === '' & formulario.product1.quantity !== '' ||
        formulario.product2.name === '' & formulario.product2.quantity !== '' ||
        formulario.product3.name === '' & formulario.product3.quantity !== '' ||
        formulario.product4.name === '' & formulario.product4.quantity !== '' ||
        formulario.product5.name === '' & formulario.product5.quantity !== ''
        ){
         
         alert('Falta asignar el producto a la cantidad seleccionada, por favor completalo, ó elige el campo "Sin Registro"')
         return
         }
        
        //-------------------------------------------------------------------
        //Comprobación de que el formulario vaya vasio:
        if(formulario.product1.name === '' & formulario.product1.quantity === '' &
        formulario.product2.name === '' & formulario.product2.quantity === '' &
        formulario.product3.name === '' & formulario.product3.quantity === '' &
        formulario.product4.name === '' & formulario.product4.quantity === '' &
        formulario.product5.name === '' & formulario.product5.quantity === ''
        ){
            this.setState({
                isOpen: false
              })
              alert('Nose se realizo ningun registro!!')
              return
        }
        //---------------------------------------------------------------------
        //Enviamos los datos a la API
        console.log(Object.values(formulario))
        try {            
            let config = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': this.state.token
                },
                body: JSON.stringify(this.state.form)
            }
            //Hacemos llamado al API
            let res = await fetch(UrlService.createOrdersUrl(), config)
            //convertimos la respuesta
            let data = await res.json()
      
            console.log(data)
            this.setState({
                isOpen: false
              })

              alert(data.message)
            
            } catch (error) {
                //Usamos nuestro state para renderizar la informacíon
                this.setState({
                    //Cambiamos el estado de Loading cuando carguen nuestros datos
                    error
                })
            }
            //---------------------------------------------------------------------
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
                    <Modal.Title>Los dos campos son obligatorios, de lo contrario no se aplicara el registro</Modal.Title>
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
                                            <select name="name" defaultValue="" ref={this.state.select} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option value='' >Products</option>
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
                                        <select  name="quantity1" defaultValue="" ref={this.state.select2} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option value='' >Quantity</option>
                                            <option value='1'>1</option>
                                            <option value='5' >5</option>
                                            <option value='20' >20</option>
                                        </select>
                                        </div>                                        
                                        <div className="form-group col-md-6">
                                            <label>Productos</label>
                                            <select name="product2" defaultValue="" ref={this.state.select3} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option value='' >Products</option>
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
                                        <select  name="quantity2" defaultValue="" ref={this.state.select4} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option value='' >Quantity</option>
                                            <option value='1'>1</option>
                                            <option value='5' >5</option>
                                            <option value='20' >20</option>
                                        </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Productos</label>
                                            <select name="product3" defaultValue="" ref={this.state.select5} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option value='' >Products</option>
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
                                        <select  name="quantity3" defaultValue="" ref={this.state.select6} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option value='' >Quantity</option>
                                            <option value='1'>1</option>
                                            <option value='5' >5</option>
                                            <option value='20' >20</option>
                                        </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Productos</label>
                                            <select name="product4" defaultValue="" ref={this.state.select7} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option value='' >Products</option>
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
                                        <select  name="quantity4" defaultValue="" ref={this.state.select8} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option value='' >Quantity</option>
                                            <option value='1'>1</option>
                                            <option value='5' >5</option>
                                            <option value='20' >20</option>
                                        </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Productos</label>
                                            <select name="product5" defaultValue="" ref={this.state.select9} onChange={this.handleChange} id="inputState" className="form-control">
                                                <option value='' >Products</option>
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
                                        <select  name="quantity5" defaultValue="" ref={this.state.select0} onChange={this.handleChange} id="inputState" className="form-control">
                                            <option value='' >Quantity</option>
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
                    type="submit" value="Submit"
                    onClick={this.fetchOrder} 
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