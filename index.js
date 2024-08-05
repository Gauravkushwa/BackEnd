const express = require("express");
const server = express();
server.use(express.json());
const fs = require("fs");


const PORT = 8585;

// fs.appendFile("./res.txt",`\n`+ file,(err,data) =>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("sucessfull");
//         }
//     })

CheckElementType = (array) =>{
    let data = true;
    array.forEach((ele) =>{
        if(typeof ele !== "string"){
            data = false
        }
    });
    return data;
}

const MyMiddleware = (req, res, next) =>{
    let {ID, Name, Rating, Description, Genre, Cast} = req.body;
    console.log(ID, Name, Rating, Description, Genre, Cast);
    
    let errMSG = "";
    if(typeof ID !== "number"){
        errMSG += "ID is not a number"
    };
    if(typeof Name !== "string"){
        errMSG += "Name is not a string"
    }
    if(typeof Rating !== "number"){
        errMSG += "Rating is not a number"
    }
    if(typeof Description !== "string"){
        errMSG += "Description is not string"
    }
    if(typeof Genre !== "string"){
        errMSG += "Genre is not a string"
    }
    if(!Array.isArray(Cast) || !CheckElementType(Cast)){
        errMSG += "Cast is not a arryOf string"
    }
    if(errMSG){
        return  res.status(400).json({
            message: "bad request. some data is incorrect.",
            status: errMSG
        });
    }
    next();
}



server.post("/",MyMiddleware, (req, res) =>{
    res.status(200).json({message: "Data received"});
    
});

server.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
    
});