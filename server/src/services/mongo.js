const mongoose=require('mongoose');
require('dotenv').config();

//Mongo URL
const MONGO_URL=process.env.MONGO_URL;

//Connect to Mongo
mongoose.connection.on('open',()=>{
    console.log('Connected to Mongo');
});
mongoose.connection.on('error',(err)=>{
    console.log("Error connecting to Mongo",err);
})
async function mongoConnect(){
    await mongoose.connect(MONGO_URL,
        {useNewUrlParser:true,useUnifiedTopology:true});
}
async function mongoDisconnect(){
    await mongoose.disconnect();
}
module.exports={
    mongoConnect,
    mongoDisconnect
}