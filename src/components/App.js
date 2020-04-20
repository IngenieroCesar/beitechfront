import React from 'react';
//Importamos reactrouter.
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from '../pages/404'
import Login from '../pages/login/Login'
import Home from '../pages/Home'
import Products from '../pages/products/Products'

//Estilos


//Componente funcional, Es el enrutador de nuestra aplicación.
function App(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Este componente se encarga de renderear el ui del componente que digamos */}
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                <Route exact path="/productos" component={Products} />
                {/* Esta ruta nos Envia un error de ruta */}
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;