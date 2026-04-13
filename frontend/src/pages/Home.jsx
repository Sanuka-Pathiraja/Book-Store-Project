import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BsInfoCircle } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md'

function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Book Store</h1>
          <Link
            to="/books/create"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            <MdOutlineAddBox className="text-xl" />
            Add Book
          </Link>
        </div>

        {loading && <p className="text-slate-300">Loading books...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left">
              <thead className="bg-slate-800 text-slate-300">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-slate-400" colSpan="5">
                      No books found.
                    </td>
                  </tr>
                ) : (
                  books.map((book, index) => (
                    <tr key={book._id} className="border-t border-slate-800">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{book.title}</td>
                      <td className="px-4 py-3">{book.auther}</td>
                      <td className="px-4 py-3">{book.publishYear}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-4">
                          <Link
                            to={`/books/details/${book._id}`}
                            className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300"
                          >
                            <BsInfoCircle />
                            Details
                          </Link>
                          <Link
                            to={`/books/edit/${book._id}`}
                            className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300"
                          >
                            <AiOutlineEdit />
                            Edit
                          </Link>
                          <Link
                            to={`/books/delete/${book._id}`}
                            className="inline-flex items-center gap-1 text-red-400 hover:text-red-300"
                          >
                            <MdOutlineDelete />
                            Delete
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
