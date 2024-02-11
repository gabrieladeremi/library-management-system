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
