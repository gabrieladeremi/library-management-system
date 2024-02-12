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

<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Serverless Framework AWS NodeJS Example

This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework. The deployed function does not include any event definitions as well as any kind of persistence (database). For more advanced configurations check out the [examples repo](https://github.com/serverless/examples/) which includes integrations with SQS, DynamoDB or examples of functions that are triggered in `cron`-like manner. For details about configuration of specific `events`, please refer to our [documentation](https://www.serverless.com/framework/docs/providers/aws/events/).

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-project-dev (112s)

functions:
  hello: aws-node-project-dev-hello (1.5 kB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function hello
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": {}\n}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```

