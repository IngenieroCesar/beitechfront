import React from 'react'
import UrlService from '../services/UrlService'
import SearchOrders from '../components/SearchOrders'
import NewOrder from '../components/NewOrder'
import Loading from './Loading'
import FatalError from '../pages/500'


class ListUsers extends React.Component {

    //le pasamos el token a el estado de nuestro componente
    state = {
        data: [],
        token: localStorage.token,
        loading: true,
        error: null,
    }

    async componentDidMount(){
        await this.fetchUsers()
        // console.log(this.state.token)
    }

    //Función para la carga de los datos desde la API
    fetchUsers = async () => {
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
            let res = await fetch(UrlService.usersUrl(), config)
            //convertimos la respuesta
            let data = await res.json()
            // console.log(data)
            //Usamos nuestro state para renderizar la informacíon
            this.setState({
                //Persistimos los datos en el estado del componente
                data,
                loading: false
            })
            
        } catch (error) {
            console.log(error)
        }
    }




    render(){
        
        if(this.state.loading){
            return < Loading />
        }
        //Validamos si existen errores
        if(this.state.error){
            return <FatalError />
        }

        const users = this.state.data
        return(
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Users</h3>
                                    <div className="card-tools">
                                        {/* Modal para nueva orden de compra */}
                                        <div className="input-group">

                                            <NewOrder                                                             
                                                // userId={user.id}
                                            />

                                        </div><br/>
                                    </div>
                                </div>

                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover tUploadext-nowrap">
                                        <thead>
                                            <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Ordenes</th>
                                            </tr>
                                        </thead>
                                        <tbody>                    
                                            {
                                                // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
                                                users.map((user) => {
                                                    return(
                                                        <tr key={user.id}>
                                                        <th >{user.id}</th>
                                                        <th >{user.name}</th>
                                                        <th >{user.email}</th>
                                                        <th>
                                                            <SearchOrders                                                             
                                                                userId={user.id}
                                                            />
                                                        </th>
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

export default ListUsers