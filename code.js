const express = require("express"); //express module from Node.js

const mysql = require("mysql2"); //mysql2 library

const app = express(); //application instance of express

app.use(express.static("public")); //make express instance connect to public folder for access
app.use(express.json()); //handles JSON requests

const con = mysql.createConnection({//create connection from mysql2 library to database
    host:"localhost",
    user:"root",
    database:"shorturls"
});

con.connect(function(error){
    if(error){ //if there was error in the connection
        console.log("Database connection failed", error);
    }
    else{
        console.log("Database connected succesfully");
    }
})

app.get("/", function(request, response){ //GET method request to page
    response.sendFile(__dirname + "/public/index.html"); //displays home page
});

app.post("/api/create-short-url", function(request, response){ //POST method to create a short url
    let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi, '').substring(2,10); //creaate the uniqueID for a shortened link
    let sql = `INSERT INTO links(longurl, shorturlid) VALUES('${request.body.longurl}', '${uniqueID}')`; //add the new shortened link to our db
    con.query(sql, function(error, result){ //run the query
        if(error){//if there was an error
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

app.get("/:shorturlid", function(request, response){//GET method for links with shorturlID
    let shorturlid = request.params.shorturlid; //extract shorturlID
    let sql = `SELECT * FROM links WHERE shorturlid = '${shorturlid}' LIMIT 1`; //select rows that match our shorturlID
    con.query(sql, function(error, result){//run the query
        if(error){//if there was an error
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

app.listen(3000);//listener for our local host
