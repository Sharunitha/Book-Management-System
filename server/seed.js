const express=require('express')
const bcrypt=require('bcrypt')
const Admin=require('./models/Admin')
const connection=require('./db')

async function AdminAccount(){
    try{
        const adminCount=await Admin.countDocuments()
        if(adminCount===0){
            const hashPassword=await bcrypt.hash('admin@1234',10)
            const newAdmin=new Admin({
                username:'admin',
                password:hashPassword
            })
            newAdmin.save()
            console.log('account created');
        }else{
            console.log('account already existed')
        }
    }catch(err){
        console.log('error',err)
    }
}
AdminAccount();
