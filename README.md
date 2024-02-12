# library-management-system
A library management system API for managing authors, books and borrowers

# Introduction
This is a fictional library management system which manages activities (CRUD) of Authors, Books and Borrowers with different security access to resources. This API was created as part of the interview process as an API engineer at Easyfundrasing.

# Functionality
The API performs basic CRUD (create, read, update and delete) actions on authors, books and borrowers. With this API you can do the following:
    1. Create an admin user, a borrower, author and book
    2. Login for an admin user and a borrower
    3. Get list of authors, books and borrowers
    4. Get an author, a book and a borrower
    5. Update an author, a book and a borrower
    6. Delete an author, a book and a borrower.
The list books and authors, view book and author are unprotected resource while all other resources requires security permission to access them.

# Architecture
This application follows the  REST(Representation State Transfer) known as RESTful API. It uses the standard HTTP methods(POST, PUT, GET, DELETE) to perform CRUD(Create, Read, Update and Delete). Technologies used for the development of this API are: Nodejs, ExpressJs, MongoDB for database, AWS lambda and API Gateway for cloud services, JWT for authentication, Swagger for API documentation.

# Authentication
Authentication: To verify a user, user needs to login using their registered email and password and for an admin a type field with value admin is required as part of the body, this is essential for the JWT composition for access to resources. The authentication is done using Json Web Token(JWT) and carries some user information.

Authorization: The authorization method employed is a Role Based Access Control(RBAC). There are two roles (Admin and Borrower), an admin has permission to all resources while the borrower has limited permission and accessibility to view authors and list of books and to borrow a book.

# Documentation
Swagger API: http://localhost:8080/api-docs/#/
Postman link: https://documenter.getpostman.com/view/26719953/2sA2r3Z69r

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying easyfundraising-lms-serverless-api-dev to stage dev (us-east-1)

✔ Service deployed to easyfundraising-lms-serverless-api-dev (112s)

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function register
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

### Running Locally

You can run this API locally by cloning this respository using any of your choice IDE, 
run npm install, 
run npm start to start the server after setting your port
Follow the swagger or postman documentation to access resources available on the API.

### Assumptions Made
I assumed there is a need for an admin user to exist for creating, updating and deleting information as this cannot be done by a borrower.
I assumed there is a need to limit the amount of books to be borrowed a user for the sake of accountability and easy tracking of borrowed books
I assumed a borrower record cannot be deleted if such user still has a borrowed book in possession, this is essential to ensure proper tracking of books witinin the system

I chose to use MongoDB as for database for the following reasons:
    1. Flexible Schema: MongoDB is a NoSQL database, which means it does not require a predefined schema like MySQL. In a library management system where the data structure might evolve over time, MongoDB's flexible schema allows for easier adaptation to changing requirements without needing to modify existing schemas or migrate data.
    2. Document-Oriented: MongoDB stores data in JSON-like documents, which can represent complex structures and nested data. This document-oriented model aligns well with the hierarchical nature of library data, where books may have multiple authors, genres, or editions, and can be more natural to work with than relational tables in MySQL.
    3. Scalability: MongoDB is designed to scale horizontally across distributed clusters, making it suitable for handling large volumes of data and high traffic loads. In a library management system with a growing collection of books and users, MongoDB's scalability features can provide better performance and availability compared to MySQL, especially in cloud environments.
    4. Query Flexibility: MongoDB's query language allows for rich and expressive queries, including support for nested documents, array operations, and geospatial queries. This flexibility can be advantageous for complex querying requirements in a library management system, such as searching for books based on multiple criteria, filtering by author or genre, or performing full-text search.
    5. Ease of Development: MongoDB's schema-less nature and flexible data model can simplify development and reduce the need for complex join operations or data normalization. Developers can focus more on application logic and less on database schema design and maintenance, leading to faster development cycles and greater agility.

