import React, { Component } from 'react';
import Searchbar from '../components/Searchbar';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import apiFetch from '../api-service/Api-service';

import s from './Movies.module.css';
import placeholder from '../images/default_backdrop2.jpg';

// import PropTypes from 'prop-types';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

class Movies extends Component {
  state = {
    query: '',
    movies: [],
  };

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    console.log(queryParams.query);
    console.log('Returning from PAGE', this.props.location.search);
    if (this.props.location.search) {
      this.findMovies(queryParams.query);
      this.setState({ query: queryParams.query });
    }
    return;
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: previousSearch } = prevState;
    const { query: currentSearch } = this.state;

    // if (this.props.location.search) {
    //   this.findMovies(currentSearch);
    // }
    if (previousSearch !== currentSearch) {
      this.findMovies(currentSearch);
    }
  }

  findMovies = currentSearch => {
    return apiFetch
      .getMovieByQuery(currentSearch)
      .then(data => this.setState({ movies: data }));
  };

  handleSubmit = searchQuery => {
    this.setState({ query: searchQuery });
    this.onCategoryChange(searchQuery);
  };

  onCategoryChange = category => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${category}`,
    });
  };

  render() {
    const { match } = this.props;
    const { query } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <div className="container-fluid">
          <ul className={s.gallery}>
            {this.state.movies.map(({ id, title, backdrop_path }) => {
              return (
                <li key={id} className={s.ImageGalleryItem}>
                  <NavLink
                    to={{
                      pathname: `${match.url}/${id}`,
                      state: {
                        from: `${match.url}`,
                        searchQuery: query,
                      },
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
      </>
    );
  }
}

export default Movies;
