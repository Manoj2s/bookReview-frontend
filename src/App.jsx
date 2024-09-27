import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksCard from './Components/BooksCard';
import ReviewPage from './Components/ReviewPage';
import Header from './Components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BooksCard />} />
        <Route path="/reviews/:id" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
};

export default App;



