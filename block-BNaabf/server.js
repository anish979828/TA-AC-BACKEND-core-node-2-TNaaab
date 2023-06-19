// relative path of index.js
var relativePath = "./client/index.js";

const path = require("path");

// absolute path of index.js
var absolutePath = path.join(__dirname,relativePath);

// server

const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const server = http.createServer(handleRequest);


function handleRequest(req,res){
    let store = "";

    req.on("data",(chunk) => {
        store += chunk;
    }).on("end",() => {
        if(req.url === "/form",req.method === "GET"){
            res.writeHead(201,{"Content-Type":"text/html"});
            fs.createReadStream("./form.html").pipe(res);
        }
        if(req.url === "/form" && req.method === "POST"){
            res.writeHead(201,{"Content-Type":"text/html"});
            let parsedData = qs.parse(store);
            res.end(`<h1>Hello ${parsedData.name}</h1> 
                     <h2>Contact:${parsedData.email}</h2>
                     <p>Your Age:${parsedData.age}</p>

                    `)
        }
    })

}

server.listen(5678,() => {
    console.log("port is running on port 5678");
})
