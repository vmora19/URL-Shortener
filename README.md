# URL-Shortener

URL-Shortener takes in user input links and returns a shorter link that will redirect user to original link.

# How is it Made:

**Tech Used**: HTML, CSS, JavaScript, MYSQL, Node.js

**Initialization**:
- **JSON packages**: `npm init -y`
- **Node.js**: `npm install --save express`
- **MYSQL**: `npm install --save mysql2`

**Front-End**:
In order to create the Front-End of URL-Shortener, I used HTML code, with features such as labels, inputs, buttons, and tables. All of which create a cohesive and well-displayed application. Furthermore, I used external CSS to style the Home page by using `<div></div>` to split up content and give it responsive styling for changing screen sizes.

**Database Steps**:
- **Logging in to MYSQL**: `mysql -h localhost -u root`
- **Creating Database**: `create database shorturls`
- **Connecting to Databse**: `connect shorturls`
- **Creating table**: `create table links(longurl varchar(255), shorturlid varchar(255), id int(11) primary key)`
- **Creating Routes**: `createConnection() in JavaScript file, POST functions, GET functions`
    - **POST**: creating short URL 
    - **GET**: requesting index.html, get-all-short-urls
    - **DELETE**: deleting links from table
- **Creating Redirection Routes**: create get method for shorturlid
    - **GET**: shorturlid
    - **Redirection**: return longurl according to its respective shorturlid from MYSQL table.

**Optimization**:
- **Database Storage**:
    - The API call for POST first checks if our database already has the same link that the user input in its records. If it already exists in our database, we do not create any new ID's and rows in our database but simply return the current shorturl ID, which in turn is added to the host, so that we do not create any new shortened links. If it does not already exist in the database, we create a new shorturl ID and a new link.

**Lessons Learned**:
- Throughout this project, I learned how to do various tasks and work with tools that I had previously not utilized. For example, this project was my first introduction to Node.js. Upon deciding how to approach this project, I knew that utilizing languages I was familiar with would be the most beneficial; however, when doing my research, I found that Node.js, a runtime environment I have not previously worked with, would be practical for running my application locally. Furthermore, while I have previously worked with the MySQL database program, I had not yet experimented with it locally. By methodically doing my research and working to debug my code with error handlers such as console.log or alert(), I completed my functional product. 
