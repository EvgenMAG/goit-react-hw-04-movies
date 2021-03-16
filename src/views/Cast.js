import React from 'react';
import s from './Movies.module.css';
import placeholderForActor from '../images/placeH.jpeg';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

const Cast = ({ movieCast }) => {
  return (
    <ul className={s.galleryActor}>
      {movieCast.map(({ character, id, original_name, profile_path }) => {
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
      })}
    </ul>
  );
};

export default Cast;
