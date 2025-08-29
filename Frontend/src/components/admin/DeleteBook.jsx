import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import createImg from '../../assets/Create-amico.svg';
import deleteImg from '../../assets/Create-amico.svg';
import { useLocation } from 'react-router-dom';
import { CiGlass } from 'react-icons/ci';

const className =
  'bg-slate-500 px-4 py-3 w-[400px] sm:w-[90%] mb-5 text-white rounded-2xl outline-none';

const DeleteBook = ({ onDelete }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [selectedBookId, setSelectedBookId] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/books/`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      console.log("i am the selected book", selectedBook)
      await axios.delete(`${process.env.REACT_APP_API_URL}/books/delete/${selectedBook._id}`);
      setMessage(`${selectedBook.bookname} has been deleted.`);
      onDelete(selectedBook.id);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="w-[85%] sm:w-[100%] h-[100%] pb-10 flex justify-between items-center">
      {message && (
        <p className="absolute top-24 rounded-md shadow-lg left-[28%] bg-emerald-600 text-white p-2">
          {message}
        </p>
      )}
      <form
        id="delete-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
        className="flex flex-col justify-evenly items-start sm:items-center sm:w-[100%] sm:px-8 sm:mt-5"
      >
        <select
          className={className}
          onChange={(e) => {
            console.log(e)
            console.log(books)
            
            setSelectedBook(books.find((book) => book.bookname === e.target.value))
          }
          }
        >
          <option disabled selected value="">
            Select a book to delete
          </option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.bookname}
            </option>
          ))}
        </select>
        <button
          value="submit"
          type="submit"
          className="bg-red-700 px-4 py-3 w-[400px] sm:w-[90%] mb-3 text-white rounded-2xl outline-none"
        >
          Delete Book
        </button>
      </form>
      <div className="sm:hidden w-[500px] sm:w-[100%] sm:h-[300px] h-[500px]">
        <img className="w-[100%] h-[100%]" src={deleteImg} alt="Delete Illustration" />
      </div>
    </div>
  );
};

export default DeleteBook;
