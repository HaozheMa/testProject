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
      company: String
  }

  type Query {
    company: Company
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
  type Mutation {
    userAuth(input: authInfo): AuthJWT
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    company: async (_parent,_args,{dataSources}) => {
      const id = await dataSources.authAPI.getCompanyId();
      console.log(id);
      const a = await dataSources.companyAPI.getCompany(id);
      return a;
    },
    vacancy: (_parent,_args, { dataSources }) => {
      /*dataSources.people.find().then(p => {
        console.log(p)
        console.log(typeof p)
      });*/
      return dataSources.vacancyAPI.getVacancy();    
    }
  },
  Mutation: {
    userAuth: (_parent, {input}, {dataSources}) => {
        const authdata =  dataSources.authAPI.authUser(input.username, input.password);
        return authdata;
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
server.listen({port:4600}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});