const express=require('express');
require('dotenv').config()
const connection=require('./db')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const authRoutes=require('./routes/auth')
const studentRoutes=require('./routes/student')
const bookRoutes=require('./routes/book')
const Book=require('./models/Book')
const Student=require('./models/Student')
const Admin=require('./models/Admin')



const app=express();
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}))
app.use(cookieParser())
app.use('/auth',authRoutes)
app.use('/student',studentRoutes)
app.use('/book',bookRoutes)

app.get('/dashboard',async (req,res)=>{
    try{
      const student=await Student.countDocuments();
      const admin=await Admin.countDocuments();
      const book=await Book.countDocuments();
      return res.json({ok:true,student,book,admin})
    }catch(err){
        return res.json(err)
    }
})


app.listen(process.env.PORT,()=>{
    console.log("Server is Running")
   
});
