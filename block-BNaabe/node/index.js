// #### Path
// Q. Suppose we have 3 files inside a directory on desktop
// The structure is
//   - node(folder)
//     - app.js
//     - server.js
//     - index.html
// You are currently inside server.js

// Write code to 
// - capture absolute path of `server.js`(itself)

//PSD:\Backened\TA-AC-BACKEND-core-node-2-TNaaab\block-BNaabe\node\server.js

// - get absolute path of `app.js`
//PSD:\Backened\TA-AC-BACKEND-core-node-2-TNaaab\block-BNaabe\node\.js
// - get realtive path of `index.html`
// - get absolute path of `index.html` using `path module` 
 
// #### Capture data on server

// Q. Create a server using http
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

let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleRequest);

function handleRequest(req,res){
    let type = req.headers("content-type");
    let store = "";
    req.on("data",(chunk) => {
        store += chunk;
    });
    req.on("end" ,() => {
        if(type = "application/x-www-form-urlencoded"){
            let parseData = qs.parse(type);
            res.end(parseData);
        }
    })
};
server.listen("4444" , () => {
    console.log("Server is listening is on port");
})

// Q. Follow above steps with form data from postman instead of json data.
// - once data has been captured, send only captain's name in response.
let http = require("http");

let server2 = http.createServer(handleRequest);

function handleRequest(req,res){
    let type = req.headers("content-type");
    let store = "";
    req.on("data",(chunk) => {
        store += chunk;
    });
    req.on("end" ,() => {
        if(type = "application/json"){
            let parseData = JSON.parse(store);
            res.end(JSON.stringify(parseData).captain);
        }
    })
};
server2.listen("4444" , () => {
    console.log("Server is listening is on port");
})

// Q. Create server which can handle both json/form data without specifying which format of data is being received.
// - add listener on port 9000
// - use `enddata/` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form 
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin

let server3 = http.createServer(handleRequest);

function handleRequest(req,res){
    let type = req.headers("content-type");
    let store = "";
    req.on("data",(chunk) => {
        store += chunk;
    });
    req.on("end" ,() => {
        if(type = "application/json"){
            let parseData = JSON.parse(store);
            res.end(JSON.stringify(parseData).captain);
        }
    })
};
server3.listen("9000" , () => {
    console.log("Server is listening is on port 9000");
})

// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

// Q. Follow above question with form data containing fields i.e name and email. 
// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.

// #### Note:- 
// Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.