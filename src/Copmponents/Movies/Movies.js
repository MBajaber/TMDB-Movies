import React, { useState, useEffect } from 'react';
import './Movies.css';
import Movie from './Movie/Movie';
import { useDispatch } from 'react-redux';
import { getMovieId } from '../../store/movieSlice';
import { allRequest } from '../../Copmponents/allRequests';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

function Movies({ startUrl, endUrl }) {

    const [getAllMovies, setGetAllMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let mount = true;
        setIsLoading(true);
        fetch(`${startUrl}${pageNumber}${endUrl}`)
        .then(data => data.json())
        .then(data => {
            if(mount) {
                setGetAllMovies(data)
                setIsLoading(false);
            }
        })
        .catch(error => {
            if(mount) {
                setIsLoading(false);
                alert(error);
            }
        })
        return () => { mount = false }
    }, [pageNumber]);
    
    
    const clickHandler = (id) => dispatch(getMovieId(id));

    const changePageNumber = (number) => {
        document.getElementById('movies').scrollIntoView({behavior: 'smooth'});
        setPageNumber(number);
    }

    return (
        <div className="movies" id='movies'>
            {
                isLoading ? <Loader /> : getAllMovies ? (
                    <>
                        <div className="all_movies">
                            {
                                getAllMovies.results.map(({ backdrop_path, id, title, overview, release_date, vote_average }) => <Movie key={id} imageUrl={`${allRequest.imageUrl}/w300/${backdrop_path}`} id={id} title={title} paragraph={overview} rating={vote_average} date={release_date} clickHandler={clickHandler} />)
                            }
                        </div>
                        <Pagination page={pageNumber} totalPages={getAllMovies.total_pages} changePageNumber={changePageNumber} />
                    </>
                ) : null
            }
        </div>
    );
}

export default Movies
