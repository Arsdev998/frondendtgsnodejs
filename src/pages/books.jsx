import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const FetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:9900/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    FetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:9900/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <h1 className="">Isekai Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={"/update/${book.id}"}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button className="">
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};
export default Books;
