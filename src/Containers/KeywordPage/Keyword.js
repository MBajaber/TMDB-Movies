import React, { useEffect } from 'react';
import './Keyword.css';
import { useSelector } from 'react-redux';
import Movies from '../../Copmponents/Movies/Movies';
import { api_key, base } from '../../staticInfo';

function Keyword() {

    const { keyword } = useSelector(state => state.movies);
    useEffect(() => {
        document.body.scrollIntoView({behavior: 'smooth'});
    }, []);

    return (
        <div className="keyword">
            <h2 className="keyword_title">keyword: {keyword.name}</h2>
            <Movies startUrl={`${base}/keyword/${keyword.id}/movies?api_key=${api_key}&language=en-US&include_adult=false&page=`} endUrl='' />
        </div>
    )
}

export default Keyword
