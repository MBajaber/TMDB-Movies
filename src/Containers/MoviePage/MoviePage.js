import React, { useState, useEffect } from 'react';
import './MoviePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { api_key, base, allRequest } from '../../Copmponents/allRequests';
import { CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { getMovieId, peopleIdFunc, keyWordFunc, genreFunc, addToFavoriteList, removeFromFavoriteList } from '../../store/movieSlice';
import Loader from '../../Copmponents/Loader/Loader';
import { Link } from 'react-router-dom';


const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
    return <Tooltip arrow classes={classes} {...props} />;
}

function MoviePage() {
    const { movieId, favoriteList } = useSelector(state => state.movies);
    const { userInfo } = useSelector(state => state.user);
    
    const [movieData, setMovieData] = useState({});
    const [moviekeywords, setMoviekeywords] = useState({});
    const [allActors, setAllActors] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState('');
    const [isFav, setIsFav] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        let mouted = true;
        document.body.scrollIntoView({behavior: 'smooth'});
        
        setIsLoading(true);
        fetch(`${base}/movie/${movieId}?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            if(mouted) {
                setMovieData(data);
            }
        })
        .catch(error => {
            if(mouted) {
                alert(error);
            }
        });

        fetch(`${base}/movie/${movieId}/keywords?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            if(mouted) {
                setMoviekeywords(data);
            }
        })
        .catch(error => {
            if(mouted) {
                alert(error);
            }
        });

        fetch(`${base}/movie/${movieId}/credits?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            if(mouted) {
                setAllActors(data);
            }
        })
        .catch(error => {
            if(mouted) {
                alert(error);
            }
        });

        fetch(`${base}/movie/${movieId}/videos?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            if(mouted) {
                let trailerList = data.results.filter(el => el.official && el.site.toLowerCase() === 'youtube' && el.type.toLowerCase() === 'trailer')
                if(trailerList.length > 0) {
                    setTrailerKey(trailerList[0].key);
                }
            }
        })
        .catch(error => {
            if(mouted) {
                alert(error);
            }
        });

        fetch(`${base}/movie/${movieId}/recommendations?api_key=${api_key}&language=en-US&page=1`)
        .then(data => data.json())
        .then(data => {
            if(mouted) {
                setRecommendations(data.results);
                setIsLoading(false);
            }
        })
        .catch(error => {
            if(mouted) {
                alert(error);
                setIsLoading(false);
            }
        });

        return () => { mouted = false }
    }, [movieId]);

    useEffect(() => {
        if(Object.keys(movieData).length) {
            let checkItem = favoriteList.some(el => el.movieData.id === movieData.id);
            setIsFav(checkItem);
        }
    }, [favoriteList, movieData])

    const clickHandler = (id) => dispatch(getMovieId(id));
    const clickHandlerPeople = (id) => dispatch(peopleIdFunc(id));
    const clickHandlerKeyword = (id) => dispatch(keyWordFunc(id));
    const clickHandlergenre = (id) => dispatch(genreFunc(id));
    const clickHandlerFavorite = () => {
        
        if(favoriteList.some(el => el.movieData.id === movieData.id)) {
            dispatch(removeFromFavoriteList(movieData.id));
        } else {
            dispatch(addToFavoriteList({movieData: movieData}));
            // dispatch(addToFavoriteList({
            //     movieData: movieData,
            //     moviekeywords: moviekeywords,
            //     allActors: allActors,
            //     recommendations: recommendations,
            //     trailerKey: trailerKey,
            // }))
        }
    }

    return isLoading ? <Loader /> : Object.keys(movieData).length !== 0 ? (
        <div className='movie_page'>
            <div className="banner_movie" style={{backgroundImage: `url(${allRequest.imageUrl}/original/${movieData.backdrop_path})`}}>
                <div className="overlay_banner_movie" />
                <div className="content_movie">
                    <div className="image_poster">
                        <img src={`${allRequest.imageUrl}/w300/${movieData.poster_path}`} alt={movieData.title} />
                    </div>
                    <div className="info_movie">
                        <h1 className="movie_title">{movieData.title} ({movieData.release_date.slice(0, 4)})</h1>
                        <div className="movie_details">
                            <div className="movie_releas_date">({movieData.release_date}){'\u00A0'}-{'\u00A0'}</div>
                            <div className="movie_genres">
                                {movieData.genres && movieData.genres.length > 0 && movieData.genres.map((el, i) => movieData.genres.length - 1 !== i ? <span key={el.id} onClick={() => clickHandlergenre(el)} ><Link to={`/genre/${encodeURI(el.name).toLocaleLowerCase()}`}>{el.name}</Link>, </span> : <span key={el.id} onClick={() => clickHandlergenre(el)}><Link to={`/genre/${encodeURI(el.name)}`} >{el.name}</Link></span>)}
                            </div>
                        </div>
                        <div className="rating_btns">
                            <div className="rating_movie">
                                <CircularProgressbar
                                    value={movieData.vote_average ? movieData.vote_average * 10 : 6 * 10}
                                    text={movieData.vote_average ? movieData.vote_average : 6}
                                    strokeWidth={6}
                                    styles={{
                                        path: {
                                            stroke: `${
                                                movieData.vote_average >= 7 ? '#3e98c7' : movieData.vote_average < 7 && movieData.vote_average > 4 ? '#D2D531' : '#DB4264'
                                            }`,
                                            transformOrigin: 'center center',
                                        }
                                    }}
                                />
                                <span className="vote_people">({movieData.vote_count})</span>
                            </div>
                            <div className="btn_fav">
                                <BootstrapTooltip title={`${userInfo === null ? `you have to Login to Add it to Favorite` : isFav ? 'Remove from Favorite' : 'Add to Favorite'}`}>
                                    <Button onClick={userInfo === null ? null : clickHandlerFavorite}><FavoriteIcon style={!isFav ? {color: '#fff'} : {color: '#EF47B6'}} /></Button>
                                </BootstrapTooltip>
                            </div>
                        </div>
                        <div className="overview">
                                <h2 className="over_title">Overview</h2>
                            <p>{movieData.overview}</p>
                        </div>
                    </div>
                </div>
                <div className="small_info">
                    {
                        movieData.budget && movieData.budget > 0 ? (
                            <div className="budget">
                                <h4>Budget</h4>
                                <div>{movieData.budget}</div>
                            </div>
                        ) : null
                    }
                    {
                        movieData.revenue && movieData.revenue > 0 ? (
                            <div className="revenue">
                                <h4>Revenue</h4>
                                <div>{movieData.revenue}</div>
                            </div>
                        ) : null
                    }
                    {
                        movieData.runtime && movieData.runtime > 0 ? (
                            <div className="runtime">
                                <h4>Runtime</h4>
                                <div>{movieData.runtime} mins</div>
                            </div>
                        ) : null
                    }
                    {
                        movieData.production_countries && movieData.production_countries.length > 0 && (
                            <div className="production_countries">
                                <h4>Production Countries</h4>
                                <div>
                                    {movieData.production_countries.map(el => <span key={el.iso_3166_1}>{el.name}</span>)}
                                </div>
                            </div>
                        )
                    }
                    {
                        movieData.production_companies && movieData.production_companies.length > 0 && (
                            <div className="production_companies">
                                <h4>Production Companies</h4>
                                <div className="all_companies">
                                    {movieData.production_companies.map(el => (
                                        <div className='companies' key={el.id}>
                                            <h5>{el.name}</h5>
                                            { 
                                                el.logo_path && (
                                                    <img src={`${allRequest.imageUrl}/w92/${el.logo_path}`} alt={el.name} title={el.name} loading='lazy' />
                                                )
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    Object.keys(moviekeywords).length !== 0 && moviekeywords.keywords.length > 0 && (
                        <div className="keywords">
                            <h3>Keywords</h3>
                            <ul>
                                {moviekeywords.keywords.map(el => <li key={el.id} onClick={() => clickHandlerKeyword(el)}><Link to={`/keyword/${encodeURI(el.name)}`}>{el.name}</Link></li>)}
                            </ul>
                        </div>
                    )
                }
            </div>
            {
                trailerKey.length > 0 && (
                    <div className="movie_video">
                        <div className="video_box">
                            <iframe src={`https://www.youtube.com/embed/${trailerKey}`} frameBorder="0" title={movieData.title}/>
                        </div>
                    </div>
                )
            }
            <div className="actors_boxs">
                {
                    Object.keys(allActors).length !== 0 && allActors.cast.length > 0 &&
                    allActors.cast.map(el => el.known_for_department.toLowerCase() === 'acting' && el.profile_path !== null && (
                        <Card key={el.id} onClick={() => clickHandlerPeople(el.id)}>
                            <Link to={`/people/${encodeURI(el.name).toLocaleLowerCase()}`}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={el.name}
                                    height="140"
                                    image={`${allRequest.imageUrl}/w185/${el.profile_path}`}
                                    title={el.name}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{el.name}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">{el.character}</Typography>
                                </CardContent>
                            </CardActionArea>
                            </Link>
                        </Card>
                    ))
                }
            </div>
            {
                recommendations && recommendations.length > 0 && (
                    <div className="recommendations_movies">
                        <h2>Recommendations Movie</h2>
                        <div className="recommendations_all_movies">
                            <Carousel>
                                {
                                    recommendations.map(el => (
                                        <div key={el.id}>
                                            <img src={`${allRequest.imageUrl}/w500${el.poster_path}`} alt={el.title} />
                                            <Link to={`/movie/${encodeURI(el.title).toLocaleLowerCase()}`} onClick={() => clickHandler(el.id)} className="legend" title={el.title}>{el.title}</Link>
                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>
                    </div>
                )
            }
        </div>
    ) : null;
}

export default MoviePage;