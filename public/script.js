const host = "http://localhost:3000/"; //host

        document.querySelector("#create-short-url").addEventListener("click", function(){
        let longurl = document.querySelector("#input-long-url").value.trim();
        if(longurl.length == 0){ //if the user did not input anything
            alert("Enter valid URL"); //display error
            return;
        }
        else if(!(longurl.startsWith("http://") || longurl.startsWith("https://"))){ //if the user input link but it is not valid
            alert("Enter valid link"); //display error
            return;
        }
        fetch(host + "api/create-short-url", {
            method: "POST", //posting our long url to server
            body: JSON.stringify({ //send as JSON string
                longurl:longurl
            }),
            headers:{
                "Content-type": "application/json; charset = UTF-8" //content we are sending has json data
            }
        }).then(function(response){
            return response.json(); //return response
        }).then(function(data){ //check what was in the response
            if(data.status == "ok"){ //if the request was succesful
                //display the new link on page
                document.querySelector("#output a").innerText = host + data.shorturlid;
                document.querySelector("#output a").href = host + data.shorturlid;

                //add the link to our history table
                let html = `
                <tr>
                    <td>${longurl}</td>
                    <td>${host}${data.shorturlid}</td>
                </tr>
                `;
                document.querySelector("table tbody").innerHTML += html;
            }
        }).catch(function(error){ //catch errors
            alert("Something went wrong");
        })
    });
    (function(){
        fetch(host + "api/get-all-short-urls").then(function(response){ //get method for all shortened urls
            return response.json(); //get response
        }).then(function(data){ //check the data

            //get all the rows of history table
            let html = "";
            for(let i = 0; i < data.length; i++){
                html += `
                <tr>
                    <td>${data[i].longurl}</td>
                    <td>${host}${data[i].shorturlid}</td>
                </tr>
                `;
            }
            document.querySelector("table tbody").innerHTML = html; //display results
        }).catch(function(error){ //catch errors
            alert("Something went wrong");
        })
    })();