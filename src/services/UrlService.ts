
class UrlService {
  //URL login de nuestra api
  static loginUrl() { return 'api/auth/login'; }
  //URL signup de nuestra api
  static signupUrl() { return 'api/auth/signup'; }
  //URL logout de nuestra api
  static logoutUrl() { return 'api/auth/logout'; }
  //URL usuarios de nuestra api
  static usersUrl() { return 'api/auth/user'; }
  //URL ordenes del usuario de nuestra api
  static ordersUrl() { return 'api/auth/orders'; }
  //URL Productos de nuestra api
  static productsUrl() { return 'api/auth/products'; }
    //URL crear orden del usuario de nuestra api
  static createOrdersUrl() { return 'api/auth/order'; }
}

export default UrlService;
