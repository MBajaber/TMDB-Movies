import React from 'react';
import './NowPlaying.css';
import Movies from '../../Copmponents/Movies/Movies';
import { api_key, base } from '../../staticInfo';

function NowPlaying() {
    return (
        <div className='now_playing_movies'>
            <h2 className='title_now_playing'>Now Playing Movies</h2>
            <Movies startUrl={`${base}/movie/now_playing?api_key=${api_key}&language=en-US&page=`} endUrl='' />
        </div>
    )
}

export default NowPlaying
