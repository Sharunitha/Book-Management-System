import { useState } from "react"
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useSnackbar } from "notistack";


export const AddStudent = () => {
    const [roll,setRoll]=useState('');
    const [username,setUsername]=useState('');
    const [grade,setGrade]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const {enqueueSnackbar}=useSnackbar();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/student/register',{roll,username,grade,password})
        .then(res=>{
            if(res.data.registered){
                enqueueSnackbar("Student Added Sucessfully",{variant:'success'},)
                navigate('/dashboard');
            }
            else{
                enqueueSnackbar(res.data.message,{variant:"error"})
            }
           
            console.log(res);
        })
        .catch(err=>{
            console.log(err)
            enqueueSnackbar(err,{variant:'error'},)
        });
    }
  return (
    <div>
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                <div className="form-group">
                    <label htmlFor="roll">Roll No.</label>
                    <input type="text" id="roll" name="roll" 
                    onChange={(e)=>setRoll(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" id="username" name="username" 
                    onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="grade">Grade:</label>
                    <input type="text" id="grade" name="grade" 
                    onChange={(e)=>setGrade(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" 
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
  )
}
