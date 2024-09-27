import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReviewPage.css';

const ReviewPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://book-review-backend-hf6p.onrender.com/allbooks/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://book-review-backend-hf6p.onrender.com/allbooks/${id}/reviews`);
        setReviews(response.data); 
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchBookDetails();
    fetchReviews(); 
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { rating, review };

    try {
      await axios.post(`https://book-review-backend-hf6p.onrender.com/allbooks/${id}/review`, newReview); 
      setReviews((prevReviews) => [...prevReviews, newReview]); 
      setRating(1); 
      setReview(''); 
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="review-page-container">
      <h1>{book.title}</h1>
      <img src={book.cover} alt={book.title} />
      <h2>Details</h2>
      <p>{book.description}</p>
      <hr />
      <h2>Reviews</h2>
      <ul>
        {reviews.map((rev) => (
          <li key={rev._id}>
            <strong>Rating: {rev.rating}</strong>
            <p>{rev.review}</p>
          </li>
        ))}
      </ul>
      <hr />

      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>{rate}</option>
            ))}
          </select>
        </label>
        <label>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      
      
    </div>
  );
};

export default ReviewPage;
