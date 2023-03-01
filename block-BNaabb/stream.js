let http = require("http");

let server = http.createServer(handleRequest);

function handleRequest(req,res){
    let result = "";
    req.on("data",(chunk) => {
        result += chunk;
    });
    req.on("end",() => {
        res.write(result);
        res.end();
    })

};

server.listen(3456,() => {
    console.log("The Server is listening on port 3456");
})