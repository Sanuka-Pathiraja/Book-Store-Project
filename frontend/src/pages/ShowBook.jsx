import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../Components/BackButton';

const ShowBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch book details');
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton destination='/' />
      
      {loading && (
        <div className='text-center mt-8'>
          <p className='text-xl text-gray-400'>Loading book details...</p>
        </div>
      )}

      {error && (
        <div className='mt-8 p-4 bg-red-500 text-white rounded'>
          <p>Error: {error}</p>
        </div>
      )}

      {book && (
        <div className='flex flex-col border-2 border-sky-500 rounded-lg w-fit p-4 mt-8 bg-slate-900'>
          <div className='my-4'>
            <h1 className='text-2xl font-bold text-sky-300 mb-2'>Book Details</h1>
          </div>

          <div className='my-2'>
            <span className='text-gray-300 text-lg font-semibold'>ID:</span>
            <span className='ml-4 text-gray-100'>{book._id}</span>
          </div>

          <div className='my-2'>
            <span className='text-gray-300 text-lg font-semibold'>Title:</span>
            <span className='ml-4 text-gray-100'>{book.title}</span>
          </div>

          <div className='my-2'>
            <span className='text-gray-300 text-lg font-semibold'>Author:</span>
            <span className='ml-4 text-gray-100'>{book.auther}</span>
          </div>

          <div className='my-2'>
            <span className='text-gray-300 text-lg font-semibold'>Publish Year:</span>
            <span className='ml-4 text-gray-100'>{book.publishYear}</span>
          </div>

          <div className='my-2'>
            <span className='text-gray-300 text-lg font-semibold'>Created At:</span>
            <span className='ml-4 text-gray-100'>
              {new Date(book.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className='my-2'>
            <span className='text-gray-300 text-lg font-semibold'>Updated At:</span>
            <span className='ml-4 text-gray-100'>
              {new Date(book.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <div className='flex gap-4 mt-8'>
            <button
              onClick={() => navigate(`/books/edit/${id}`)}
              className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition duration-200'
            >
              Edit
            </button>
            <button
              onClick={() => navigate(`/books/delete/${id}`)}
              className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition duration-200'
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
