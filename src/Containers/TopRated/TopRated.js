import React from 'react';
import './TopRated.css';
import Movies from '../../Copmponents/Movies/Movies';
import { api_key, base } from '../../Copmponents/allRequests';

function TopRated() {
    return (
        <div className='top_rated_movies'>
            <h2 className='title_top_rated'>Top Rated Movies</h2>
            <Movies startUrl={`${base}/movie/top_rated?api_key=${api_key}&language=en-US&page=`} endUrl='' />
        </div>
    )
}

export default TopRated;
