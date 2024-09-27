import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BooksCard.css';

const BooksCard = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookreview-backend-1-qqwt.onrender.com/allbooks"
        );
        setBooks(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(books.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSeeReviews = (bookId) => {
    navigate(`/reviews/${bookId}`);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="books-card-container">
      <div className="books-cards">
        {currentBooks.map((book) => (
          <div key={book._id} className="books-card">
            <img src={book.cover} alt={book.title} className="books-card__cover" />
            <div className="books-card__details">
              <h2 className="books-card__title">{book.title}</h2>
              <h3 className="books-card__original-title">{book.originalTitle}</h3>
              <p className="books-card__release-date">Release Date: {book.releaseDate}</p>
              <p className="books-card__description">{book.description}</p>
              <button className="books-card__button" onClick={() => handleSeeReviews(book.number)}>
                See Reviews
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination__button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Back
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`pagination__button ${currentPage === number ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="pagination__button"
          onClick={handleNextPage}
          disabled={currentPage === pageNumbers.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksCard;
