# URL-Shortener

URL-Shortener takes in user input links and returns a shorter link that will redirect user to original link.

**Link to Project**: https://us01.vercel.app/

# How is it Made:

**Tech Used**: HTML, JavaScript, MYSQL, Node.js

**Initialization**:
- **JSON packages**: npm init -y
- **Node.js**: npm install --save express
- **MYSQL**: npm install --save mysql2

**Front-End**:
In order to create the Front-End of URL-Shortener, I used HTML code, with features such as labels, inputs, buttons, and tables. All of which create a cohesive and well-displayed application.

**Database Steps**:
- **Logging in to MYSQL**: mysql -h localhost -u root
- **Creating Database**: create database <DATABASE-NAME>
- **Connecting to Databse**: connect <DATABASE-NAME>
- **Creating table**: create table <TABLE-NAME>...
- **Creating Routes**: createConnection() in JavaScript file, POST functions, GET functions
    - **POST**: creating short URL 
    - **GET**: requesting index.html, get-all-short-urls
- **Creating Redirection Routes**: create get method for shorturlid
    - **GET**: shorturlid
    - **Redirection**: return longurl according to its respective shorturlid from MYSQL table.

**Lessons Learned**:
to be written...