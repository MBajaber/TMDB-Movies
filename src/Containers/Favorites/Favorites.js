import React from 'react';
import './Favorites.css';
import Movie from '../../Copmponents/Movies/Movie/Movie';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieId } from '../../store/movieSlice';
import { imageUrl } from '../../staticInfo';

function Favories() {
    const { favoriteList } = useSelector(state => state.movies);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const clickHandler = (id) => dispatch(getMovieId(id));
    return (
        <div className='favories'>
            {
                userInfo === null || favoriteList.length === 0 ? (
                    <>
                        {
                            userInfo === null 
                            ? <h2 className='favories_title'>You have to Login to see  Favorite List</h2> 
                            : <h2 className='favories_title'>No Items</h2>
                        }
                        <div className='no_items_favorite' style={{backgroundImage: `url(${process.env.PUBLIC_URL}images/Favorite/Favorite.png)`}}>
                            
                        </div>
                    </>
                ) : (
                    <div className="favories_all_boxs">
                        {favoriteList.map(el => <Movie key={el.movieData.id} imageUrl={`${imageUrl}/w300/${el.movieData.backdrop_path}`} id={el.movieData.id} title={el.movieData.title} paragraph={el.movieData.overview} rating={el.movieData.vote_average} date={el.movieData.release_date} clickHandler={clickHandler} />)}
                    </div>
                )
            }
        </div>
    )
}

export default Favories
