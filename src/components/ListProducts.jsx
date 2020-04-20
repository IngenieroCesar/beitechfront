import React from 'react'
import UrlService from '../services/UrlService'
import Loading from './Loading'
import FatalError from '../pages/500'

class ListProducts extends React.Component{
    //le pasamos el token a el estado de nuestro componente
    state = {
        data: [],
        token: localStorage.token,
        loading: true,
        error: null,
    }

    //Cargamos datos al cargar este componente
    async componentDidMount(){
        await this.fetchProducts()
    }

    //Función para la carga de los datos desde la API
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

    //Crear un nuevo producto






    render(){

        if(this.state.loading){
            return < Loading />
        }
        //Validamos si existen errores
        if(this.state.error){
            return <FatalError />
        }

        //persistimos datos del estado data[]
        const products = this.state.data

        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Products</h3>
                                    <div className="card-tools">
                                    </div>
                                </div>

                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover tUploadext-nowrap">
                                        <thead>
                                            <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>                    
                                            {
                                                // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                                                products.map((product) => {
                                                    return(
                                                        <tr key={product.id}>
                                                        <th>{product.id}</th>
                                                        <th>{product.name}</th>
                                                        <th>{product.description}</th>
                                                        <th>{product.price}</th>
                                                        <th>Action</th>
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
        )
    }
}

export default ListProducts