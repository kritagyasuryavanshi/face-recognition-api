const express =require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register=require("./controllers/register")
const signin =require("./controllers/signin")
const profile =require("./controllers/profile")
const image =require("./controllers/image")
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password :"kritagya",
    database : 'smartbrain'
  }
});

const app =express()

app.use(bodyParser.json());
app.use(cors())
const database ={
	users:[
	{
		id:"123",
		name:"ks",
		email:"ks@gmail.com",
		password:"cookies",
		entry:0,
		joined:new Date()
	},
	{
		id:"124",
		name:"sally",
		email:"sally@gmail.com",
		password:"bananas",
		entry:0,
		joined:new Date()

}
]
}

app.get("/",(req,res)=>{
	res.send(database.users)
})
//sign-in

app.post("/signin",(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post("/register",(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get("/profile/:id",(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put("/image",(req,res)=>{image.handleImage(req,res,db)})

app.post("/imageurl",(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT||3000, ()=>{
	console.log(`app is running on port ${process.env.PORT`})
})