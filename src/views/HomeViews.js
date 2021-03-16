import React, { Component } from 'react';
// import s from './HomeViews.module.css';
import apiFetch from '../api-service/Api-service';
import { NavLink } from 'react-router-dom';
import s from './Movies.module.css';
import placeholder from '../images/surprise.jpeg';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

console.log(apiFetch);

class HomeViews extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    apiFetch.getPopularMovies().then(data => this.setState({ movies: data }));
  }

  render() {
    // console.log(this.state.movies);
    //   const { match } = this.props;

    return (
      <div className="container-fluid">
        <ul className={s.gallery}>
          {this.state.movies.map(({ id, title, backdrop_path }) => {
            return (
              <li key={id} className={s.ImageGalleryItem}>
                <NavLink
                  to={{
                    pathname: `/movies/${id}`,
                    // state: { from: `${match.url}` },
                  }}
                  className={s.linkStyle}
                >
                  <img
                    src={
                      backdrop_path
                        ? `${BASE_IMAGE_URL}${backdrop_path}`
                        : placeholder
                    }
                    alt={title}
                    className={s.ImageGalleryItem__image}
                  />
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default HomeViews;
