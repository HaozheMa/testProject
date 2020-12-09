# testProject
### this project has 4 microservice：

#### 1. Authorization microservice：
   * this service handle authorization and validate functions, like login

#### 2. User microservice：
   * this service handle user data.
   * this service has guard to control access.

#### 3. Vacancy microservice：
   * this service handle vacancy data.
   * this service has guard to perform RDBC(Role-based access control)

#### 4. Company microservice：
   * this service handle company data.
   * The reason for using this as a separate microservice is to ：
      * prepare for the future development of company-related APIs
      * a good microservice design should follow [Database per service pattern](https://microservices.io/patterns/data/database-per-service.html)

### this project use BFF(Backend for Frontend) pattern, which has 2 BFF service

#### 1. user client:
  * according to the user story, the user can only login and view vacancies. so in this service, only implenment login method and method to show vacancy data

#### 2. admin client:
  * according to the user story, the admin can login and do CRUD for vacancies. so in this service, login, view, create, edit and delete method are all implenmented.


## Getting Started
This Project run in Docker.

### Prerequisites

Install Docker Desktop if you do not have it. 

### Installing

Run docker package using docker-compose command

```
# docker
$ docker-compose up #--build 
```

then browse

http://localhost:4600 for user client API

and

http://localhost:4500 for admin client API


## Running the tests

working on the test! => { TODO }


## Built With

* [NestJS](https://docs.nestjs.com/) - a framework for building efficient, scalable Node.js server-side applications
* [TypeScript](https://www.typescriptlang.org/) - an open-source language which builds on JavaScript
* [MongoDB](https://www.mongodb.com/) -  a general purpose, document-based, distributed database
* [GraphQL](https://graphql.org/learn/) -  a query language for APIs
* [Apollo server](https://www.apollographql.com/docs/apollo-server/) -  an open-source, spec-compliant GraphQL server

## Acknowledgments

Thanks to the users of Stackoverflow！

learned a lot from [alibghz](https://github.com/alibghz/nestjs-microservices-docker)

