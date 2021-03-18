import { Route, Switch, NavLink } from 'react-router-dom';
import React, { Component, lazy, Suspense } from 'react';
import apiFetch from '../api-service/Api-service';
import routes from '../routes';
// import Cast from './Cast';
// import Reviews from './Reviews';
import s from './Movies.module.css';
import poster from '../images/default_poster.jpg';

const CastView = lazy(() =>
  import('./Cast' /* webpackChunkName: "cast-view" */),
);
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "Reviews-view" */),
);

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

class MovieDetailsView extends Component {
  state = {
    movie: {
      genres: null,
      id: null,
      overview: null,
      poster_path: null,
      title: null,
      vote_average: null,
    },
  };

  componentDidMount() {
    const { moviesId } = this.props.match.params;

    apiFetch
      .getMovieById(moviesId)
      .then(data => this.setState({ movie: { ...data } }));
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    if (!location.state) {
      return history.push(routes.home);
    }

    if (location.state.searchQuery) {
      const query = this.props.location.state.searchQuery;
      return this.props.history.push({
        pathname: routes.movies,
        search: `?query=${query}`,
      });
    }

    history.push(location.state.from);
  };

  render() {
    const {
      genres,
      overview,
      poster_path,
      title,
      vote_average,
      id,
    } = this.state.movie;
    const { match, location } = this.props;
    const pathFrom = location.state ? `${location.state.from}` : '';
    const queryFromSearchLocation = location.state
      ? `${location.state.searchQuery}`
      : '';

    return (
      <div className="container-fluid">
        <button
          type="button"
          onClick={this.handleGoBack}
          className={s.buttonBack}
        >
          Вернуться назад
        </button>{' '}
        <div className={s.containerMoviePage}>
          {id && (
            <img
              src={poster_path ? `${BASE_IMAGE_URL}${poster_path}` : poster}
              alt={title}
            />
          )}
          <div className={s.containerMovieDescr}>
            <h2 className={s.movieTille}>{title}</h2>
            <p className={s.movieVote}>
              Vote: <span className={s.movieVoteScore}>{vote_average}</span>
            </p>
            <h3>Overview:</h3>
            <p>{overview}</p>
            {genres && (
              <p className={s.movieGenre}>
                Genres:{' '}
                {genres.map(({ id, name }) => (
                  <span key={id} className={s.genresList}>
                    {name},{' '}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
        <div>
          <h3>Additional Information</h3>
          <NavLink
            to={{
              pathname: `${match.url}/cast`,
              state: {
                from: pathFrom,
                searchQuery: queryFromSearchLocation,
              },
            }}
            className={s.aboutMovieLink}
            activeClassName={s.active}
          >
            Cast
          </NavLink>
          <NavLink
            to={{
              pathname: `${match.url}/reviews`,
              state: {
                from: pathFrom,
                searchQuery: queryFromSearchLocation,
              },
            }}
            className={s.aboutMovieLink}
            activeClassName={s.active}
          >
            Review
          </NavLink>
        </div>
        <Suspense>
          <Switch>
            <Route
              exact
              path={routes.movieCast}
              render={props => <CastView {...props} movieId={id} />}
            />
            <Route
              exact
              path={routes.movieReviews}
              render={props => <Reviews {...props} movieId={id} />}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default MovieDetailsView;
