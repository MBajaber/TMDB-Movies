import React, { useState, useEffect } from 'react';
import './Banner.css';
import { api_key, base } from '../../Copmponents/allRequests';
import { allRequest } from '../allRequests';
import { ColorExtractor } from 'react-color-extractor';

function Banner() {
    const [mainColor, setMainColor] = useState('');
    const [movieInfo, setMovieInfo] = useState(null);
    const [allGenrs, setAllGenrs] = useState(null);

    useEffect(() => {
        let mount = true;
        fetch(`${base}/genre/movie/list?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            if(mount) {
                setAllGenrs(data.genres[Math.ceil(Math.random() * data.genres.length - 1)]);
            }
        })
        .catch(error => {
            if(mount) {
                alert(error);
            }
        })
        return () => { mount = false }
    }, []);
    
    useEffect(() => {
        let mount = true;
        if(allGenrs) {
            fetch(`${base}/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${allGenrs.id}&with_watch_monetization_types=flatrate`)
            .then(data => data.json())
            .then(data => {
                if(mount) {
                    setMovieInfo(data.results[Math.ceil(Math.random() * data.results.length - 1)]);
                }   
            })
            .catch(error => {
                if(mount) {
                    alert(error);
                }
            })

        }
        return () => { mount = false }
    }, [allGenrs]);

    const getColors = color => {
        var arrBuff = new ArrayBuffer(4);
        var vw = new DataView(arrBuff);
        vw.setUint32(0,parseInt(color[0].slice(1), 16),false);
        var arrByte = new Uint8Array(arrBuff);  
        return setMainColor(arrByte[1] + "," + arrByte[2] + "," + arrByte[3]);
    };
    
    return movieInfo && movieInfo.backdrop_path !== null ? (
        <div className='banner' style={{ backgroundImage: `url(${allRequest.imageUrl + '/original' + movieInfo.backdrop_path})` }}>
            {<ColorExtractor getColors={getColors} src={allRequest.imageUrl + '/original' + movieInfo.backdrop_path} />}
            <div className="overlay" style={{ backgroundColor: `rgba(${mainColor}, .4)`, backgroundImage: `linear-gradient(to top, rgba(${mainColor}, 0.8) 0, rgba(${mainColor}, 0) 60%, rgba(${mainColor}, 0.8) 100%)` }} />
            <div className="content">
                <h1>Unlimited movies, TV <br />shows, and more.</h1>
                <h4>Watch anywhere.</h4>
            </div>
        </div>
    ) : null;
}

export default Banner;