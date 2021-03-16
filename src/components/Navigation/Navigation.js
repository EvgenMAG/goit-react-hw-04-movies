import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={s.nav__pills}>
      <NavLink
        exact
        to={routes.home}
        className={s.nav__link}
        activeClassName={s.active}
      >
        Home
      </NavLink>
      <NavLink
        to={routes.movies}
        className={s.nav__link}
        activeClassName={s.active}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
