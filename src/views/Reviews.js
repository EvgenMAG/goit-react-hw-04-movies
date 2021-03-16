import React from 'react';

const Reviews = ({ movieReview }) => {
  return movieReview.length !== 0 ? (
    <ul>
      {movieReview.map(({ author, content }) => (
        <li>
          <h4>{author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <h4>Меня никто не обсуждал! Стань Первым!!!!</h4>
  );
};

export default Reviews;
