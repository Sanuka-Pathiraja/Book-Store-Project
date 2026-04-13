import { useState } from 'react';
import BackButton from '../../Components/BackButton';
import Spinner from '../../Components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [auther, setAuther] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSaveBook = async (e) => {
        e.preventDefault();
        setError('');

        const data = {
            title: title.trim(),
            auther: auther.trim(),
            publishYear: Number(publishYear),
        };

        if (!data.title || !data.auther || !data.publishYear) {
            setError('Please fill in title, author, and publish year.');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:5555/books', data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create book');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <BackButton destination='/' />
            <h1 className='my-4 text-3xl text-white'>Create Book</h1>

            {loading && <Spinner />}

            <form
                onSubmit={handleSaveBook}
                className='mx-auto flex w-full max-w-xl flex-col gap-4 rounded-lg border-2 border-sky-500 p-6'
            >
                {error && <p className='rounded bg-red-500 px-3 py-2 text-white'>{error}</p>}

                <div className='flex flex-col gap-1'>
                    <label className='text-slate-300'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white outline-none focus:border-sky-500'
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-slate-300'>Author</label>
                    <input
                        type='text'
                        value={auther}
                        onChange={(e) => setAuther(e.target.value)}
                        className='rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white outline-none focus:border-sky-500'
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-slate-300'>Publish Year</label>
                    <input
                        type='number'
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white outline-none focus:border-sky-500'
                    />
                </div>

                <button
                    type='submit'
                    className='rounded bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:bg-emerald-400'
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default CreateBook;