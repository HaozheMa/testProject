const http = require('http');
const { ApolloServer, gql } = require('apollo-server');
const express = require('express');
const UserAPI = require('./dataSources/user-rest');
const AuthAPI = require('./dataSources/auth-rest');
const VacancyAPI = require('./dataSources/vacancy-rest');
const CompanyAPI = require('./dataSources/company-rest');
const typeDefs = gql`
  type User {
      name: String
      username: String
      role: String
      company: String
  }

  type Company {
      name: String
      address: String
  }

  type Vacancy {
      title: String
      description: String
      expiredAt: String
      company: String
  }

  type Query {
    vacancy: [Vacancy]
  }

  type AuthJWT {
      user: User
      accessToken: String
  }

  input authInfo {
      username: String
      password: String
  }
  input editInfo {
    title: String
    description: String
    expiredAt: String

  }
  input createInfo {
    title: String
    description: String
    expiredAt: String
    companyId: String
  }

  type Answer {
      vacancy: Vacancy
      code: String
      response: String
  }

  type Mutation {
    userAuth(input: authInfo): AuthJWT
    editVacancy(id: String, input: editInfo): Answer
    createVacancy(input: createInfo): Answer
    deleteVacancy(id: String): Answer
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    vacancy: (_parent,_args, { dataSources }) => {
      /*dataSources.people.find().then(p => {
        console.log(p)
        console.log(typeof p)
      });*/
      return dataSources.vacancyAPI.getVacancy();    
    }
  },
  Mutation: {
    userAuth: async (_parent, {input}, {dataSources}) => {
        const authdata = await dataSources.authAPI.authUser(input.username, input.password);
        return authdata;
    },
    editVacancy: async (_parent, {id, input}, {dataSources}) => {
        const edit = await dataSources.vacancyAPI.updateVacancy(id, input);
        
    },
    createVacancy: async (_parent, {input}, {dataSources}) =>{
        const create = await dataSources.vacancyAPI.createVacancy(input);
        return create;
    },
    deleteVacancy: async (_parent, {id}, {dataSources}) => {
        const deleteVacancy = await dataSources.vacancyAPI.deleteVacancy(id);
        return deleteVacancy;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    token: req.headers.authorization
    
  }),
  dataSources: () => ({
      userAPI: UserAPI,
      vacancyAPI: VacancyAPI,
      authAPI: AuthAPI,
      companyAPI: CompanyAPI
  }),
  
  introspection: true
});


// The `listen` method launches a web server.
server.listen({port:4500}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});