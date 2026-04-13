import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Spinner from '../../Components/Spinner';

function DeleteBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load book');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`http://localhost:5555/books/${id}`);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete book');
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <BackButton destination='/' />
      <h1 className='my-4 text-3xl text-white'>Delete Book</h1>

      {loading && <Spinner />}

      <div className='mx-auto w-full max-w-xl rounded-lg border-2 border-red-500 p-6 text-white'>
        {error && <p className='mb-4 rounded bg-red-600 px-3 py-2 text-white'>{error}</p>}

        <p className='text-lg'>Are you sure you want to delete this book?</p>
        <p className='mt-3 text-slate-300'>
          {book ? `${book.title} by ${book.auther}` : 'Book ID: ' + id}
        </p>

        <button
          onClick={handleDeleteBook}
          className='mt-6 rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-400'
        >
          Yes, Delete It
        </button>
      </div>
    </div>
  );
}

export default DeleteBook;
