import React, { Component } from 'react';
import apiFetch from '../api-service/Api-service';
import s from './Movies.module.css';
import placeholderForActor from '../images/placeH.jpeg';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    console.log(movieId);

    apiFetch.getMovieCast(movieId).then(data => {
      this.setState({ cast: data.cast.slice(0, 10) });
    });
    // apiFetch.getMovieReview(moviesId).then(data => {
    //   this.setState({ reviews: data.results });
    // });
  }

  render() {
    console.log(this.state.cast);
    return (
      <ul className={s.galleryActor}>
        {this.state.cast.map(
          ({ character, id, original_name, profile_path }) => {
            const indexTitle = character.indexOf('/');
            return (
              <li key={id}>
                <img
                  className={s.ActorGalleryItem__image}
                  src={
                    profile_path
                      ? `${BASE_IMAGE_URL}${profile_path}`
                      : placeholderForActor
                  }
                  alt={character}
                />
                <div className={s.actorContainer}>
                  <h4 className={s.titleActor}>{original_name}</h4>
                  <p className={s.characterName}>
                    {character.includes('/')
                      ? character.slice(0, indexTitle)
                      : character}
                  </p>
                  <span className={s.contrastBox}></span>
                </div>
              </li>
            );
          },
        )}
      </ul>
    );
  }
}

export default Cast;
