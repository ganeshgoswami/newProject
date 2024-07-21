import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BooksCard from "../component/card";

const ViewOrders = () =>{
    const firebase = useFirebase();
    const [books,setBooks] = useState([])
    
    useEffect(()=>{
        if(firebase.isLoggedIn)
        firebase.fetchMyBooks(firebase.user.uid)?.then((books)=>setBooks(books.docs))
    },[firebase])
   
    if(!firebase.isLoggedIn) return <h1>Please Log In</h1>

    console.log(books)
    return (
        <div>
          {books.map((book)=>(
            <BooksCard link={`/book/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
          ))
          }
        </div>
    )
}

export default ViewOrders;