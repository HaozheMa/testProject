const { RESTDataSource } = require('apollo-datasource-rest')

class VacancyAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3020/vacancy'
    }
    willSendRequest(request) {
        console.log(this.context.token)
        request.headers.set('Authorization', this.context.token);
      }

    async getVacancy() {
       // console.log("this.context.token" + this.context.token);
        return this.get('getall');
    }
}

module.exports =  new VacancyAPI();