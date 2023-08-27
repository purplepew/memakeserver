const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req,res)=>{
    const filePath = path.join(__dirname, "/Testing", 
    req.url == "/" ? "index.html" : req.url);

    let extName = path.extname(filePath)
    let contentType = "text/html";
    switch(extName){
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
                contentType = "application/json";
                break;
    }


    fs.readFile(filePath, (err,content)=>{
        if(err){
            if(err.code == "ENOENT"){
                fs.readFile(path.join(__dirname, "/Testing", "404.html"), (err, content)=>{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content);
                })
            }else{
                res.writeHead(500);
                res.end("Server Error: " + err.code)
            }
        }else{
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8')
        }
    })
    
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>console.log("Server is running... -> " + PORT))
