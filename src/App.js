import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import routes from './routes';
import s from './App.module.css';
import Load from './components/Loader/Loader';

// import s from './App.module.css';
const HomeView = lazy(() =>
  import('./views/HomeViews' /* webpackChunkName: "home-view" */),
);
const Movies = lazy(() =>
  import('./views/Movies' /* webpackChunkName: "movies-view" */),
);
const MovieDetailsView = lazy(() =>
  import('./views/MovieDetailsView' /* webpackChunkName: "movies-view" */),
);

const App = () => (
  <div className={s.globalContainer}>
    <AppBar />
    <Suspense fallback={Load()}>
      <Switch>
        <Route exact path={routes.home} component={HomeView} />
        <Route exact path={routes.movies} component={Movies} />
        <Route path={routes.movieDetails} component={MovieDetailsView} />
      </Switch>
    </Suspense>
  </div>
);

export default App;
