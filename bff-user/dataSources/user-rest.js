const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3010/user'
    }
    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
      }
    
}
module.exports =  new UserAPI();