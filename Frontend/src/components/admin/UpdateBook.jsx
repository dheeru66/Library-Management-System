import React, { useState } from 'react';
import axios from 'axios';
import updateImg from '../../assets/Create-amico.svg';

const className =
  'bg-slate-500 px-4 py-3 w-[400px] sm:w-[90%] mb-5 text-white rounded-2xl outline-none';

const UpdateBook = () => {
  const [message, setMessage] = useState('');
  const [bookId, setBookId] = useState('');
  const [updatedBook, setUpdatedBook] = useState({
    bookname: '',
    authorname: '',
    rating: '',
    type: '',
    bookImage: '',
    price: '',
  });

  const handleChange = (type, value) => {
    setUpdatedBook((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/books/update/${bookId}`,
        updatedBook
      );
      setMessage(response?.data?.message);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (err) {
      console.log(err);
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
        id="update-form"
        onSubmit={handleSubmit}
        className="flex flex-col justify-evenly items-start sm:items-center sm:w-[100%] sm:px-8 sm:mt-5"
      >
        <input
          onChange={(e) => handleChange('bookname', e.target.value)}
          className={className}
          type="text"
          placeholder="New Book name"
          required
          value={updatedBook?.bookname}
        ></input>
        <input
          onChange={(e) => handleChange('authorname', e.target.value)}
          className={className}
          type="text"
          placeholder="New Author name"
          required
          value={updatedBook?.authorname}
        ></input>
        <input
          onChange={(e) => handleChange('rating', e.target.value)}
          className={className}
          type="number"
          placeholder="New Rating"
          required
          value={updatedBook?.rating}
          min={1}
          max={5}
        ></input>
        <input
          onChange={(e) => handleChange('type', e.target.value)}
          className={className}
          type="text"
          placeholder="New Genre"
          required
          value={updatedBook?.type}
        ></input>
        <input
          onChange={(e) => handleChange('bookImage', e.target.value)}
          className={className}
          type="text"
          placeholder="New Image Link"
          required
          value={updatedBook?.bookImage}
        ></input>
        <input
          onChange={(e) => handleChange('price', e.target.value)}
          className={className}
          type="number"
          placeholder="New Amount Per Day"
          required
          value={updatedBook?.price}
        ></input>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Enter Book ID to Update"
            className={className}
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-700 px-4 py-3 ml-3 w-[200px] sm:w-[90%] mb-3 text-white rounded-2xl outline-none"
          >
            Update Book
          </button>
        </div>
      </form>
      <div className="sm:hidden w-[500px] sm:w-[100%] sm:h-[300px] h-[500px]">
        <img className="w-[100%] h-[100%]" src={updateImg} alt="Update Illustration"></img>
      </div>
    </div>
  );
};

export default UpdateBook;
