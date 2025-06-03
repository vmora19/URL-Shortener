# URL-Shortener

URL-Shortener takes in user input links and returns a shorter link that will redirect user to original link.

# How it is Made:

**Tech Used**: HTML, CSS, JavaScript, MYSQL, Node.js, Docker

**Initialization**:
- **JSON packages**: `npm init -y`
- **Node.js**: `npm install --save express`
- **MYSQL**: `npm install --save mysql2`

**Front-End**:
In order to create the Front-End of URL-Shortener, I used HTML code, with features such as labels, inputs, buttons, and tables. All of which create a cohesive and well-displayed application. Furthermore, I used external CSS to style the Home page by using `<div></div>` to split up content and give it responsive styling for adapting to changing screen sizes.

**Database Steps**:
- Refer to the following if running application locally (instructions on how to run on Docker found below):
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

**Docker**:
- This application is primed to run on all machines with the use of Docker images and containers.
    - **Prerequisites**: Docker must be installed by user to run the virtual environment. You can follow the instructions to get started with docker [here](https://www.docker.com/get-started/).
    - **Dockerfile**: Runs the commands necessary to build the images.
    - **Compose.yaml**: Configures application services to run with multiple containers.
    - **wait-for-it.sh**: Script for database to wait in order to connect properly to application.
    - **Instructions**:
        - **Navigate to your working directory**
        - **Check current running containers**: `docker ps`
        - **Build the containerized app**: `docker compose up -d`
        - **Checking logs**: `docker logs -f node_app`
            - The logs should display a message that the "Database connected successfully"
        - **Stop the app**: `docker compose down -v`

**Lessons Learned**:
- Throughout this project, I learned how to do various tasks and work with tools that I had previously not utilized. For example, this project was my first introduction to Node.js. Upon deciding how to approach this project, I knew that utilizing languages I was familiar with would be the most beneficial; however, when doing my research, I found that Node.js, a runtime environment I have not previously worked with, would be practical for running my application locally. Furthermore, while I have previously worked with the MySQL database program, I had not yet experimented with it locally.  Aditionally, working with Docker compose was a challenge, especially with getting it to connect my front-end to my database. However, by methodically doing my research and working to debug my code with error handlers such as console.log or docker logs, I completed my functional product.
