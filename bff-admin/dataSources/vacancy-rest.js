const { RESTDataSource } = require('apollo-datasource-rest')

class VacancyAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3020/vacancy'
    }
    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
      }

    async getVacancy() {
       // console.log("this.context.token" + this.context.token);
        return this.get('getall');
    }

    async createVacancy(input) {
        return this.post('create',{title: input.title, description: input.description, expiredAt:input.expiredAt, companyId: input.companyId})
    }

    async updateVacancy(id, input) {
        return this.put(`/${id}`, {title: input.title, description: input.description, expiredAt:input.expiredAt});
    }

    async deleteVacancy(id) {
        return this.delete(`/${id}`);
    }
}

module.exports =  new VacancyAPI();