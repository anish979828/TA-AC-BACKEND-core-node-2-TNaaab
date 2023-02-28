let http = require("http");
let fs = require("fs");

function handleRequest(req,res){
    res.setHeader("Content-type","text/html")
    fs.createReadStream("./readme.txt").pipe(res);
}

let server = http.createServer(handleRequest);

server.listen(3000,() => {
    console.log("We are learning!!")
});