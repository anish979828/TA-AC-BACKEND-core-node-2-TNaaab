let http = require("http");
let qs = require("querystring")
function handleRequest(req,res){
    let contentFormat = req.headers["content-type"];
    let  store = "";
    req.on("data",(chunk) => {
        store += chunk; 
    });
    req.on("end",() => {
        if(contentFormat == "application/json"){
            let parsedData = JSON.parse(store);
            res.end(JSON.stringify(parsedData));
        }
        if(contentFormat == "application/x-www-form-urlencoded"){
            let parsedData =  qs.parse(store);
            res.end(parsedData);

        }
    })


}

let server = http.createServer(handleRequest);

server.listen(5000,() => {
    console.log("Server is listening on 5000 port")
});