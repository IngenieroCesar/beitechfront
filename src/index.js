import React from 'react';
import ReactDOM from 'react-dom';
//De esta manera es como traemos el componente que hemos creado.
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css'



//Esta variable contiene el id del elemento al que stamos renderizando el contenido!
const container = document.getElementById('root');

// ReactDOM.render(__QUE__, __DONDE__);
//Para traer un compónente debemos de meterlo en sus etquetas <component/>
ReactDOM.render(<App/>, container); 