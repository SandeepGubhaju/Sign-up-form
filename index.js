const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose")

const app = express();


app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/mydb");

var db = mongoose.connection;

db.on("error",()=>console.log("Error in connecting to the database"))
db.on("open",()=>console.log("connected to database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.name;
    var phno = req.body.phno;
    var password= req.body.password;
    
    var  data = {
        "name": name,
        "email":email,
        "phno":phno,
        "password": password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;

        }
        console.log("Recorded insert sucessfully");
    })
    return res.redirect("sign-up_success.html")
})

app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin" : "*"
    })
    return res.redirect("index.html")
});


app.listen(3000,()=>{
    console.log("server started sucessfully at port no 3000")
})