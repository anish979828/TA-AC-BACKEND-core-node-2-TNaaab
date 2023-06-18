// ## BLOCK-writeCode

// #### Path
// 1 Q. Suppose we have 3 files inside a directory on desktop
// The structure is
//   - node(folder)
//     - app.js
//     - server.js
//     - index.html
// You are currently inside server.js

// Write code to 
// - capture absolute path of `server.js`(itself)

console.log(__filename);

// - get absolute path of `app.js`
console.log(__dirname +  "/app.js");

// - get realtive path of `index.html`
console.log("./index.html");

// - get absolute path of `index.html` using `path module`
let path = require("path");
path.join(__dirname , "index.html");
 
// #### Capture data on server

// 2Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```

// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.

const http = require("http");

let server = http.createServer(handleRequest1);

function handleRequest1(req,res){
    if(req.url == "/" && req.method == "POST"){
        let store = "";
        req.on("data",(chunk) => {
            store += chunk;
        }).on("end",(chunk) => {
            res.writeHead(201,{"Content-Type":"text/plain"});
            res.end(store);
        } )
    }
};

server.listen(3000,() => {
    console.log("server is listening on port 3k");
});

// 3Q. Follow above steps with form data from postman instead of json data.
// - once data has been captured, send only captain's name in response.

const http2 = require("http");
const qs = require("querystring");

let server2 = http2.createServer(handleRequest2);

function handleRequest2(req,res){
    if(req.url === "/" && req.method === "POST"){
        let store = "";
        req.on("data" , (chunk) => {
            store += chunk
        }).on("end",() => {
           let parseData =  qs.parse(store);
           res.writeHead(201,{"Content-Type":"text/plain"});
           res.end(JSON.stringify(parseData));
        });
    }
};
server2.listen(3001,() => {
    console.log("port is listening on port 3001");
});


// 4Q. Create server which can handle both json/form data without specifying which format of data is being received.

// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form 
// - send entire data in response

// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin

let http3 = require("http");
let qs3 = require("querystring");

let server3 = http3.createServer(handleRequest3);

function handleRequest3(req,res){
    if(req.url === "/" && req.method === "POST"){
        if(req.headers["content-type"].includes("multipart/form-data")){
            let store = "";

            req.on("data",(chunk) => {
                store += chunk;
            });

            req.on("end",() => {
                let parseData = qs3.parse(store);
                res.writeHead(201,{"Content-Type":"text/plain"});
                res.end(JSON.stringify(parseData));
            })
        }
    }
};
server3.listen(5001,() => {
    console.log("port is running on port 5001")
})

// 5Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

let http4 = require("http");

let server4 = http4.createServer(handleRequest4);

function handleRequest4(req,res) {
    if(req.url === "/" && req.method === "POST"){
        let store = "";
        req.on("data",(chunk) => {
            store += chunk;
        }).on("end",() => {
            res.writeHead(201,{"Content-Type":"text/html"});
            let parseData = JSON.parse(store);
            res.end(`<h1>${parseData.name}</h1><h2>${parseData.age}</h2>`)

        })
    }
};
server4.listen(9000,() => {
    console.log("port is running on 9000")
});

// 6Q. Follow above question with form data containing fields i.e name and email. 
// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.

// #### Note:- 
// Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.


let http5 = require("http");
let qs4 = require("querystring");
let server5 = http5.createServer(handleRequest5);


function handleRequest5(req,res){
    let store = "";
    if(req.url === "/" && req.method === "POST"){
        req.on("data",(chunk) => {
            store += chunk
        }).on("end",() => {
            let parseData = qs4.parse(store);
            res.writeHead(201,{"Content-Type":"text/html"});
            res.end(`<h1>${parseData.name}</h2><p>${parseData.age}</p>`)
        })
    }
};

server5.listen(5002,() => {
    console.log("Port is running on 5002");
});

