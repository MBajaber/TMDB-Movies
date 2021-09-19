import React from 'react';
import './Upcoming.css';
import Movies from '../../Copmponents/Movies/Movies';
import { api_key, base } from '../../Copmponents/allRequests';

function Upcoming() {
    return (
        <div className='upcoming_movies'>
            <h2 className='title_upcoming'>Upcoming Movies</h2>
            <Movies startUrl={`${base}/movie/upcoming?api_key=${api_key}&language=en-US&page=`} endUrl='' />
        </div>
    )
}

export default Upcoming
