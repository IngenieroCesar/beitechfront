let apiDomain = ''
if (process.env.NODE_ENV === 'production') {
  apiDomain = 'https://back.admiapp.com/';
} else {
  apiDomain = 'https://back.admiapp.com/';
}

class UrlService {
  //URL login de nuestra api
  static loginUrl() { return apiDomain + 'api/auth/login'; }
  //URL signup de nuestra api
  static signupUrl() { return apiDomain + 'api/auth/signup'; }
  //URL logout de nuestra api
  static logoutUrl() { return apiDomain + 'api/auth/logout'; }
  //URL usuarios de nuestra api
  static usersUrl() { return apiDomain + 'api/auth/user'; }
  //URL ordenes del usuario de nuestra api
  static ordersUrl() { return apiDomain + 'api/auth/orders'; }
  //URL Productos de nuestra api
  static productsUrl() { return apiDomain + 'api/auth/products'; }
    //URL crear orden del usuario de nuestra api
  static createOrdersUrl() { return apiDomain + 'api/auth/order'; }
}

export default UrlService;