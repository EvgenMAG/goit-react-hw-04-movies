import React, { Component } from 'react';
import apiFetch from '../api-service/Api-service';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    apiFetch.getMovieReview(movieId).then(data => {
      this.setState({ reviews: data.results });
    });
  }

  render() {
    const { reviews } = this.state;
    console.log(reviews);
    return (
      <>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map(({ author, content, id }) => (
              <li key={id}>
                <h4>{author}</h4>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h4>Меня никто не обсуждал! Стань Первым!!!!</h4>
        )}
      </>
    );
  }
}

export default Reviews;
