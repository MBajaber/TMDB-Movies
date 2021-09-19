import React, { useState } from 'react';
import './Movie.css';
import { ColorExtractor } from 'react-color-extractor';
import { CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'

function Movie({ imageUrl, rating, paragraph, title, date, clickHandler, id }) {
    const [color, setColor] = useState('');
    const [titleSize] = useState(title.length >= 27 ? true: false);
    const getColors = color => {
        var arrBuff = new ArrayBuffer(4);
        var vw = new DataView(arrBuff);
        vw.setUint32(0,parseInt(color[0].slice(1), 16),false);
        var arrByte = new Uint8Array(arrBuff);  
        return setColor(arrByte[1] + "," + arrByte[2] + "," + arrByte[3]);
    };
    const cutSentence = () => paragraph.length >= 160 ? `${paragraph.slice(0, 160)}...` : paragraph;

    return (
        <div className='movie'style={{borderColor: `rgb(${color})`, backgroundColor: `rgb(${color})`}} title={paragraph} onClick={() => clickHandler(id)}>
            <ColorExtractor getColors={getColors} src={imageUrl} />
            <Link to={`/movie/${encodeURI(title).toLocaleLowerCase()}`} title={title}>
                <div className="image">
                    <img src={imageUrl} alt={title} loading='lazy' />
                    <div className="overlay_movie" style={{backgroundImage: `linear-gradient(transparent 0%, rgba(${color}, 0.5) 25%, rgba(${color}, 0.75) 60%, rgb(${color}) 90%)`}} />
                </div>
                <div className="movie_rating">
                    <CircularProgressbar
                        value={rating ? rating * 10 : 6 * 10}
                        text={rating ? rating : 6}
                        strokeWidth={6}
                        styles={{
                            path: {
                                stroke: `${
                                    rating >= 7 ? '#3e98c7' : rating < 7 && rating > 4 ? '#D2D531' : '#DB4264'
                                }`,
                                transformOrigin: 'center center',
                            }
                        }}
                    />
                </div>
                <div className="movie_release_data">release date: <span>{date}</span></div>
                <div className="info">
                    <h3 className="movie_title" style={title.length > 60 ? {fontSize: '15px', margin: '0px'} : titleSize ? {fontSize: '16px', margin: '0px'} : {fontSize: '18px'}}>{title}</h3>
                    <p className="movie_paragraph">{cutSentence()}</p>
                </div>
            </Link>
        </div>
    )
}

export default Movie
