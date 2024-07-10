/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react"
import { BookCard } from "./BookCard";
import '../css/Book.css'


export const Books = ({role}) => {
  const [books,setBooks]=useState([]);
  useEffect(()=>{
       axios.get('http://localhost:3000/book/books')
       .then(res=>{
        setBooks(res.data)
        console.log(res.data)
       }).catch(err=>console.log(err));
  },[])

  return (
    <div className="book-list">
        {
          books.map(book=>{
           return <BookCard key={book.id} book={book} role={role}></BookCard>
          })
        }
    </div>
  )
}
