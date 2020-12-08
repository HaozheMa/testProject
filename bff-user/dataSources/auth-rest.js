const { RESTDataSource } = require('apollo-datasource-rest')

class AuthAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3000/auth';
        let user;
    }

    async authUser(username, password) {
        return this.post('auth', { username: username, password: password });
    }

    async getCompanyId() {
        return this.get('companyId',{}, {headers:{"Authorization":this.context.token}})
    }
}

module.exports = new AuthAPI();