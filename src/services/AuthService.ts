import axios from 'axios';
import UrlService from './UrlService';

interface Credentials {
  email: string
  password: string
}

class AuthService {
  //Funcion para autenticación
  async doUserLogin(credentials: Credentials) {
    try {
      //Usando axios realizamos la peticón a nuestra api
      const response = await axios.post(UrlService.loginUrl(), credentials);
      return response.data;
    } catch (error) {
      console.error('Error', error.response);
      return false;
    }
  }
    //Funcion para registro de usuario
}

export default new AuthService();
