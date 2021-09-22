import React from 'react';
import './Main.css';
import Banner from '../../Copmponents/Banner/Banner';
import Movies from '../../Copmponents/Movies/Movies';
import { api_key, base } from '../../staticInfo';

function Main() {
    
    return (
        <div className='main' id='main'>
            <Banner />
            <Movies startUrl={`${base}/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`} endUrl={`&with_watch_monetization_types=flatrate`} />
        </div>
    )
}

export default Main
