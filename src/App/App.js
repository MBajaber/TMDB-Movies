import React, { useEffect, lazy, Suspense } from 'react';
import './App.css';
import Bar from '../Copmponents/Bar/Bar';
import { Route, Switch } from 'react-router-dom';
import Loader from '../Copmponents/Loader/Loader';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { getUserInfo } from '../store/UserSlice';
import { bringDataFromLocalstorage } from '../store/movieSlice';
import { bringDataFromLocalStorageFunc } from '../LocalStorageFunctons';

const Main = lazy(() => import('../Containers/Main/Main'));
const MoviePage = lazy(() => import('../Containers/MoviePage/MoviePage'));
const PeoplePage = lazy(() => import('../Containers/PeoplePage/PeoplePage'));
const KeywordPage = lazy(() => import('../Containers/KeywordPage/Keyword'));
const GenrePage = lazy(() => import('../Containers/GenresPage/GenresPage'));
const PopularPage = lazy(() => import('../Containers/Popular/Popular'));
const TopRatedPage = lazy(() => import('../Containers/TopRated/TopRated'));
const UpcomingPage = lazy(() => import('../Containers/Upcoming/Upcoming'));
const FavoritesPage = lazy(() => import('../Containers/Favorites/Favorites'));
const LoginPage = lazy(() => import('../Containers/Login/Login'));
const SignUpPage = lazy(() => import('../Containers/SignUp/SignUp'));
const NowPlayingPage = lazy(() => import('../Containers/NowPlaying/NowPlaying'));
const PageNotFound = lazy(() => import('../Containers/NotFound/NotFound'));

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        dispatch(getUserInfo({
          uid: user.uid,
          email: user.email
        }))
      }
    })
    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(bringDataFromLocalstorage(bringDataFromLocalStorageFunc()))
  }, []);

  return (
    <div className="App">
      <Bar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/movie/:movieName' component={MoviePage} />
          <Route path='/people/:peopleName' component={PeoplePage} />
          <Route path='/keyword/:keyword' component={KeywordPage} />
          <Route path='/genre/:genre' component={GenrePage} />
          <Route path='/popular' component={PopularPage} />
          <Route path='/top_rated' component={TopRatedPage} />
          <Route path='/upcoming' component={UpcomingPage} />
          <Route path='/favorites' component={FavoritesPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/now_playing' component={NowPlayingPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
