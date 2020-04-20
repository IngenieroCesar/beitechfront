import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    //Los estados se actualizaran automaticamente cuando asignemos valores a nuestros campos
  });

  //Hacemos que el estado se actualice inmediatamente detecta un eveto
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    //En esta sección tenemos nuestro formulario con selectores multiples que cargan 
    //los productos y la cantidad que queramos agregar
    //Usamos comunicación entre componentes para llamar a funciones del padre
    //para cambiar el estado del modal y para hacer la petición POST a nuestra API
    <section>
      <form 
          //Llamamos la función para evitar el reload de la pagina
          onSubmit={props.hideModal}
      >
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Products</InputLabel>
        <Select
          native
          value={props.form.product1}
          onChange={props.onChange}
          inputProps={{
            name: 'product1',
            id: 'product1-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {
              // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
              props.products.map((product) => {
                  return(
                      <option key={product.id} value={product.name}>{product.name}</option>    
                  )
              })
          }

        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">quantity</InputLabel>
        <Select
          native
          value={props.form.quantity1}
          onChange={props.onChange}
          inputProps={{
            name: 'quantity1',
            id: 'quantity1-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </Select>
      </FormControl>

    </div>
    {/* <div>
      
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Products</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'product2',
            id: 'product2-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {
              // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
              props.products.map((product) => {
                  return(
                      <option key={product.id} value={product.name}>{product.name}</option>    
                  )
              })
          }
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">quantity</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'quantity2',
            id: 'quantity2-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </Select>
      </FormControl>

    </div>
    <div>
      
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Products</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'product3',
            id: 'product3-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {
              // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
              props.products.map((product) => {
                  return(
                      <option key={product.id} value={product.name}>{product.name}</option>    
                  )
              })
          }
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">quantity</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'quantity3',
            id: 'quantity3-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </Select>
      </FormControl>

    </div>
    <div>
      
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Products</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'product4',
            id: 'product4-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {
              // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
              props.products.map((product) => {
                  return(
                      <option key={product.id} value={product.name}>{product.name}</option>    
                  )
              })
          }
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">quantity</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'quantity4',
            id: 'quantity4-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </Select>
      </FormControl>

    </div>
    <div>
      
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Products</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'product5',
            id: 'product5-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {
              // En este momento estamos usando la funcion map para iterar todos los elementos del arreglo,
              props.products.map((product) => {
                  return(
                      <option key={product.id} value={product.name}>{product.name}</option>    
                  )
              })
          }
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">quantity</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'quantity5',
            id: 'quantity5-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </Select>
      </FormControl>

    </div> */}
    <br/>
    <button className="btn btn-primary float-left" 
      type="submit"
      // onClick={props.fetchOrder(state)} 
    >Guardar</button>
    <button className="btn btn-secondary float-right" onClick={props.hideModal} >Cancel</button>
    </form>
    </section>


    
  );
}