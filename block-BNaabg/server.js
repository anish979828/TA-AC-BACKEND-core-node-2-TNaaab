// You have to handle routes:-

// - POST method on `/users` -> to create user
// - GET method on `/users?username=xyz` -> to get a single user
// - PUT method on `/users?username=xyz` -> to update a user
// - DELETE method on `/users?username=xyz` -> to delete a user

// #### Note:-

// handle an error condition as well where requested url is other than above routes. Send response with status code 404 saying `page not found`.

const http = require("http");
const server = http.createServer(handleRequest);
const fs = require("fs");
var userPath = __dirname + "/users/";
const url = require("url");


function handleRequest(req,res){
    let parsedUrl = url.parse(req.url,true);
    let store = "";

    req.on("data",(chunk) => {
        store += chunk;
    });

    req.on("end",() => {

        // create file 

        if(req.method === "POST" && req.url === "/users"){
            console
            var username = JSON.parse(store).username;
            fs.open(userPath + username + ".json","wx",(err,fd) => {
                if(err) return console.log(err);
                fs.writeFile(fd,store,(err) => {
                    if(err) return console.log(err);
                    fs.close(fd,() => {
                        return res.end(`${username} created successfully!`);
                    });
                })

            }) 
        }

        // read file 

       else if(parsedUrl.pathname === "/users" && req.method === "GET"){
            let username = parsedUrl.query.username;
            fs.readFile(userPath + username + ".json",(err,content) => {
                res.writeHead(201,{"Content-Type":"application/json"});
               return res.end(content);
            })
            
            // let user = "";
           // fs.createReadStream(userPath + username +".json").on("data",(chunk) => {
            //     user += chunk;
            // }).on("end",() => {
            //     let parsedData = JSON.parse(user);
            //     res.writeHead(201,{"Content-Type":"text/html"});

            //     res.write(`<h1>${parsedData.username}</h1>`);
            //     res.end();
            // })

        }

        // update file 

        else if(parsedUrl.pathname === "/users" && req.method === "PUT"){
            let username = parsedUrl.query.username;
            fs.open(userPath + username + ".json" ,"r+",(err,fd) => {
                if(err) return console.log(err);
                fs.ftruncate(fd,(err) => {
                    if(err) return console.log(err);
                    fs.writeFile(fd,store,(err) => {
                        if(err) return console.log(err);
                        fs.close(fd,() => {
                          return   res.end(`${username} is successfully updated!!`)
                        })
                    })
                    
                })
            })
        }

        // delete file 
        else if(parsedUrl.pathname === "/users" && req.method === "DELETE"){
            var username = parsedUrl.query.username;
            fs.unlink(userPath +  username + ".json",(err) => {
                if(err) return console.log(err);
               return res.end(`${username}  deleted successfully!`)
            })
        }
        
        else{
            res.writeHead(404,{"Content-Type":"text/plain"});
            res.end("page not found🥱")

        }


    })



};
server.listen(3000,() => {
    console.log("The server is running on port 3k!")
});
