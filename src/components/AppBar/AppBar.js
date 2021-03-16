import React from 'react';
import s from './AppBar.module.css';
import Navigation from '../Navigation/Navigation';

const AppBar = () => {
  return (
    <header className={s.AppBar}>
      <Navigation />
    </header>
  );
};

export default AppBar;
