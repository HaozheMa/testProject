const { RESTDataSource } = require('apollo-datasource-rest')

class CompanyAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3030/company'
    }
    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
      }

      async getCompany(id) {
          console.log(id)
          return this.get(`/${id}`)
      }
    
}
module.exports =  new CompanyAPI();