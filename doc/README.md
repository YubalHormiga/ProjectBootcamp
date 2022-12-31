# Hello App

## Intro

It is an application where on the one hand you can add appointments and on the other hand you can keep track of your expenses, both in chronological order.


![](https://media.giphy.com/media/kLOkqcrdC5mrCE7k7G/giphy.gif) 


## Functional Description


### Use Cases

User
- Create a appoiment
- Create a spent
- Update a appoimment
- Update a spent
- Delete a appoiment
- Delete a spent
- View profile


## Technical Description

### Blocks

```
App (client-side)        API (server-side)       DB
[React > logic > xhr] -> [Express > Mongoose] -> [Mongo]
```

### Data Model

User
- name (String, required)
- email (String, required, unique)
- password (String, required)

Appointment
- user (ObjectId, required)
- title (String)
- body (String, required)
- date (Date, required)

Flow
- user (ObjectId, required)
- type (String, required, enum ['income', 'expense'])
- kind (String, required, enum ['pension', 'gift', 'donation', 'food', 'supply', 'medicine', 'services', 'other'])
- description (String,required)
- amount (Number, required)
- date (Date, required)

### Technologies

-JavaScript: JavaScript is the programming language responsible for making web pages more interactive and dynamic. When JavaScript is executed in the browser, it does not need a compiler. The browser reads the code directly, without the need for third parties. It is therefore recognised as one of the three native languages of the web, together with HTML (content and its structure) and CSS (content design and its structure).

-React: React helps you create interactive user interfaces easily. Design simple views for each state in your application, and React will take care of efficiently updating and rendering the correct components when data changes.

-Express: Express is a minimal and flexible Node.js web application infrastructure that provides a robust set of features for web and mobile applications.



-Mongo: MongoDB is a document database that offers great scalability and flexibility, and an advanced query and indexing model.

-Mongoose: Mongoose is a library for Node.js that allows us to write queries for a MongooDB database, with features like validations, query construction, middlewares, type conversion and some others, that enrich the database functionality.

-Tailwind: A CSS framework that prioritises usability over styling. This framework provides a set of classes to give structure and style, and to be able to quickly create custom designs.

-JSON Web Token (JWT): JWT is a standard for securely transmitting information over the internet by means of JSON files, which is a type of plain text file with which parameters can be created and assigned a value. This system is used for user authentication in applications and its main function is to validate the identity of the person accessing the page.



### Planning

_BACKLOG_
- Testing
- Enter Budget
- Chat
- Bak Ratings
- Links of interest
