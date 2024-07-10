import { useState } from "react"
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useSnackbar } from "notistack";

export const AddBook = () => {
    const [name,setName]=useState('');
    const [author,setAuthor]=useState('');
    const [imageUrl,setImageUrl]=useState('');
    const navigate=useNavigate();
    const {enqueueSnackbar}=useSnackbar();

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/book/add',{name,author,imageUrl})
        .then(res=>{
            if(res.data.added){
                enqueueSnackbar("Book Added Sucessfully",{variant:'success'},)
                navigate('/books');
            }
            else{
                enqueueSnackbar(res.data.message,{variant:"error"})
                console.log(res);
            }
           
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
                <h2>Add Book</h2>
                <div className="form-group">
                    <label htmlFor="book">Book Name:</label>
                    <input type="text" id="book" name="book" 
                    onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author Name:</label>
                    <input type="text" id="author" name="author" 
                    onChange={(e)=>setAuthor(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" name="image" 
                    onChange={(e)=>setImageUrl(e.target.value)}/>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    </div>
  )
}
