const mongoose=require('mongoose')
require('dotenv').config()

const connection=async ()=>{
    try{
        mongoose.connect(process.env.URL)
        console.log('db connected')
    }
    catch(err){
        console.log('Error: '+err)
    }
   
}
connection();
