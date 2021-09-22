import React from 'react';
import './Popular.css';
import Movies from '../../Copmponents/Movies/Movies';
import { api_key, base } from '../../staticInfo';

function PopularMovies() {
    return (
        <div className='popular_movies'>
            <h2 className='title_popular'>Popular Movies</h2>
            <Movies startUrl={`${base}/movie/popular?api_key=${api_key}&language=en-US&page=`} endUrl='' />
        </div>
    )
}

export default PopularMovies
