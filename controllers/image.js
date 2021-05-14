const clarifai =require("clarifai");
const app = new Clarifai.App({apiKey: '8d4c37342ea64dc1b832d76ab77db7b0'});
const handleApiCall=(req,res)=>{
app.models
	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json("unable to work with api"))
}

const handleImage=(req,res,db)=>{
	const {id} =req.body;
	db("users").where("id","=",id)
	.increment("entry",1)
	.returning("entry")
	.then(entry=>{
		res.json(entry[0]);
	})
	.catch(err=>res.status(400).json("unable to Found"))
}

module.exports={
	handleImage:handleImage,
	handleApiCall:handleApiCall
}