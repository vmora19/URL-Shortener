const createTableSQL = //SQL command to create links table
`
CREATE TABLE IF NOT EXISTS links (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  longurl VARCHAR(255),
  shorturlid VARCHAR(255)
);
`;
const express = require("express"); //express module from Node.js

const mysql = require("mysql2"); //mysql2 library

const app = express(); //application instance of express

app.use(express.static("public")); //make express instance connect to public folder for access
app.use(express.json()); //handles JSON requests

const con = mysql.createConnection({//create connection from mysql2 library to database
    host:"mysql_container", //host name from docker compose
    user:"root",
    password:"my-secret-pw", //password for the database
    database:"shorturls"
});

con.connect(function(error){
    if(error){ //if there was error in the connection
        console.log("Database connection failed", error);
    }
    else{ //otherwise database connected succesfully
        console.log("Database connected succesfully");
        con.query(createTableSQL, function(err, result) { //creating links table for container restart
            if (err) { //if there is an error
                console.error("Error creating table:", err);
            } else { //otherwise the table was created
                console.log("Table 'links' created.");
            }
        });
    }
})

app.get("/", function(request, response){ //GET method request to page
    response.sendFile(__dirname + "/public/index.html"); //displays home page
});

app.get("/status", (req, res) => { //GET method to see if we successfully connected to database
  con.ping(error => {
    if (error) {
      return res.send("Database connection failed: " + error.message);
    }
    res.send("Database connected successfully");
  });
});


app.post("/api/create-short-url", function(request, response){ //POST method to create a short url
    
    //first check if the current long link is not already in the db
    let longurl_link = request.body.longurl;
    let find_existingurl = `SELECT shorturlid FROM links WHERE longurl = ?`;

    con.query(find_existingurl, [longurl_link], function(error, result) { 
        if (error) {
            return response.status(500).json({
                status: "notok",
                message: "Something went wrong"
            });
        }
        
        // if we got a result, it already exists
        if (result.length > 0) {
            return response.status(200).json({
                status: "ok",
                shorturlid: result[0].shorturlid //return the latest shorturlid
            });
        }
        //otherwise we can create a new id
        else{
            let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi, '').substring(2,10); //create the uniqueID for a shortened link
            let sql = `INSERT INTO links(longurl, shorturlid) VALUES('${longurl_link}', '${uniqueID}')`; //add the new shortened link to our db
            con.query(sql, function(error, result){ //run the query
                if(error){ //if there was an error
                    response.status(500).json({
                    status:"notok",
                    message:"could not add to database"
                });
                }
                else{
                    response.status(200).json({
                    status:"ok",
                    shorturlid: uniqueID
                    });
                }
            })
        }
    })  
});

app.get("/api/get-all-short-urls", function(request, response){ //GET method to get all short urls
    let sql = `SELECT * FROM links`; //get all the rows from links table
    con.query(sql, function(error, result){ //run the query
        if(error){ //if there was an error
            response.status(500).json({
                status:"notok",
                message:"could not get all short urls"
            }); 
        }
        else{
            response.status(200).json(result); //returns status ok and shorturlid
        }
    })
});

app.get("/:shorturlid", function(request, response){ //GET method for links with shorturlID
    let shorturlid = request.params.shorturlid; //extract shorturlID
    let sql = `SELECT * FROM links WHERE shorturlid = '${shorturlid}' LIMIT 1`; //select rows that match our shorturlID
    con.query(sql, function(error, result){ //run the query
        console.error("SQL error:", error); // <--- Add this
        if(error){ //if there was an error
            response.status(500).json({
                status:"notok",
                message:"something went wrong with retrieving the shorturlID"
            }); 
        }
        if (result.length === 0) { //if there were not any rows that matched our shourturlID
            response.status(404).json({ 
                status: "notok", 
                message: "Short URL not found" });
            return;
        }
        response.redirect(result[0].longurl); //else redirect to page using longurl
    })
})

app.delete("/api/clear-history", function (request, response) { //DELETE method for deleting links from table
    let sql = "DELETE FROM links";
    con.query(sql, function (error, result) {
        if (error) {
            response.status(500).json({
                status: "notok",
                message: "Could not clear history",
            });
        } else {
            response.status(200).json({
                status: "ok",
            });
        }
    });
});

app.listen(3000); //listener for our local host

