const express=require('express')
const Book=require('../models/Book')
const router=express.Router();
const verifyAdmin=require('./auth')

router.post('/add',verifyAdmin,async(req,res)=>{
    try{
        const {name,author,imageUrl}=req.body;
        if (!name || !author || !imageUrl) {
            return res.json({ message: "All fields are required"});
        }
        const newBook=new Book({
            name,
            author,
            imageUrl,
        })
        await newBook.save()
        return res.json({added:true})
    }catch(err){
        return res.json({message:"Error in adding book"});
    }
})
router.get('/books',async(req,res)=>{
    try{
        const books=await Book.find()
        return res.json(books);
    }catch(err){
        return res.json(err)
    }
})
router.get('/book/:id',async (req,res)=>{
   try{
     const id=req.params.id;
     const book=await Book.findById({_id:id})
     return res.json(book)
   }catch(err){
       return res.json(err)
   }
})
router.put('/book/:id',async (req,res)=>{
    try{
      const id=req.params.id;
      const book=await Book.findByIdAndUpdate({_id:id},req.body)
      if (!req.body.name || !req.body.author || !req.body.imageUrl) {
        return res.json({ message: "All fields are required"});
    }
      return res.json({updated:true,book})
    }catch(err){
        return res.json(err)
    }
 })
 router.delete('/book/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        const book=await Book.findByIdAndDelete({_id:id})
        return res.json({deleted:true,book})
      }catch(err){
          return res.json(err)
      }
 })
module.exports=router;