import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BooksCard from "../component/card";
import CardGroup from "react-bootstrap/esm/CardGroup";

const HomePage = () =>{
 
    const firebase = useFirebase()
    const [books,setBooks] = useState([])
//   console.log(firebase)

    useEffect(()=>{
      firebase.listAllBooks().then((books)=>setBooks(books.docs))
    },[])

  

    return (
        <div className="container mt-5">
            
            {/* <CardGroup>
            {books.map((book)=>(
                <BooksCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()}/>
            ))}
            </CardGroup> */}
            
            <CardGroup>
            {firebase.allProducts.map((prod)=>(
                <BooksCard  key={prod.id} id={prod.id} {...prod}/>
            ))}
            </CardGroup>
            
        </div>
    )
}

export default HomePage;