import React from 'react';
import './GenresPage.css';
import { useSelector } from 'react-redux';
import Movies from '../../Copmponents/Movies/Movies';
import { api_key, base } from '../../Copmponents/allRequests';

function GenresPage() {
    const { genres } = useSelector(state => state.movies);
    return (
        <div className='genres'>
            <h2 className="genres_title">Genre: {genres.name}</h2>
            <Movies startUrl={`${base}/discover/movie?api_key=${api_key}&language=en-US&&sort_by=popularity.desc&include_adult=false&include_video=false&page=`} endUrl={`&with_genres=${genres.id}&with_watch_monetization_types=flatrate`} />
        </div>
    )
}

export default GenresPage
