import React, { useState, useEffect, useRef } from 'react';
import './Bar.css';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { alpha, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import UpdateIcon from '@material-ui/icons/Update';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../store/UserSlice';
import { getMovieId, peopleIdFunc } from '../../store/movieSlice';
import { auth } from '../../firebase';
import { base, api_key, imageUrl } from '../../staticInfo';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        flexGrow: 1,
        alignSelf: 'flex-end',
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }
}));

const useStylesDrawer = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function ProminentAppBar({ history }) {
    const classes = useStyles();
    const classesDrawer = useStylesDrawer();
    const [drawerState, setDrawerState] = useState(false);
    const { userInfo } = useSelector(state => state.user);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [chooseOption, setChooseOption] = useState({});
    const term = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        function searchFunc() {
            fetch(`${base}/search/multi?api_key=${api_key}&language=en-US&query=${search}&page=1&include_adult=false`)
            .then(res => res.json())
            .then(res => {
                setResults(res.results.filter(el => el.media_type === 'movie' || el.media_type === 'person'));
            })
            .catch(error => alert(error))
        }
        
        let time;
        if(search && term.current.toLowerCase() !== search.toLowerCase()) {
            time = setTimeout(() => searchFunc(), 2000) 
        } else {
            setResults([])
        }
        return () => {clearTimeout(time)}

    }, [search]);

    useEffect(() => {
        return term.current = search
    }, [search])
    
    useEffect(() => {
        if(Object.keys(chooseOption).length) {
            setSearch('');
            setResults([]);
            if(chooseOption.media_type === 'movie') {
                dispatch(getMovieId(chooseOption.id));
                history.push(`/movie/${chooseOption.title.toLowerCase()}`);
            } else if(chooseOption.media_type === 'person') {
                dispatch(peopleIdFunc(chooseOption.id));
                history.push(`/people/${chooseOption.name.toLowerCase()}`);
            }
        }
    }, [chooseOption])

    const toggleDrawer = (value) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState(value);
    };

    const logout = () => {  
        auth.signOut()
        .then(() => {
            dispatch(getUserInfo(null));
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className='bar'>
            <AppBar position="static">
                <Toolbar>
                    <Link to='/' className="logo">
                        <img src={process.env.PUBLIC_URL + 'images/logo/logo.png'} alt="" className="logo_img" />
                    </Link>
                    <div className={classes.search}>
                        <Autocomplete
                            onInputChange={(event, value) => setSearch(value)}
                            onChange={(event, value) => {
                                setChooseOption(value);
                            }}
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            inputValue={search}
                            options={results}
                            getOptionLabel={(option) => option.media_type === 'person' ?
                             typeof option.name === 'string' ? option.name : search 
                             : option.media_type === 'movie' ? typeof option.title === 'string' ? option.title : search : search }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder='Search'
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                />
                            )}
                            renderOption={option => {
                                return (
                                    <>
                                        <IconButton color="primary">
                                            {
                                                option.media_type === 'movie'
                                                ? option.poster_path !== undefined && option.poster_path !== null ? <img src={`${imageUrl}/w45${option.poster_path}`} alt={option.title} />
                                                : option.backdrop_path !== undefined && option.backdrop_path !== null && <img src={`${imageUrl}/w45${option.backdrop_path}`} alt={option.title} /> 
                                                : option.media_type === 'person' && option.profile_path !== undefined && option.profile_path !== null && <img src={`${imageUrl}/w45${option.profile_path}`} alt={option.name} />
                                            }
                                        </IconButton>
                                        <p>
                                            {option.media_type === 'person' ? option.name : option.media_type === 'movie' && option.title}
                                            <span className='tag_in_search'> in {option.media_type === 'person' ? 'People' : option.media_type === 'movie' && 'Movies'}</span>
                                        </p>
                                    </>
                                );
                            }}
                        />
                        
                        <SearchIcon className='search_icon' />
                    </div>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor={'left'} open={drawerState} onClose={toggleDrawer(false)}>
                <div
                    className={clsx(classesDrawer.list, {
                        [classesDrawer.fullList]: 'left' === 'top' || 'left' === 'bottom',
                    })}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem button>
                            <ListItemIcon><WhatshotIcon /></ListItemIcon>
                            <Link to={'/popular'} style={{textDecoration: 'none'}}>Popular Movies</Link>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><ArrowUpwardIcon /></ListItemIcon>
                            <Link to={'/top_rated'} style={{textDecoration: 'none'}}>Top Rated Movies</Link>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><EmojiTransportationIcon /></ListItemIcon>
                            <Link to={'/upcoming'} style={{textDecoration: 'none'}}>Upcoming Movies</Link>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><UpdateIcon /></ListItemIcon>
                            <Link to={'/now_playing'} style={{textDecoration: 'none'}}>Now Playing Movies</Link>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><FavoriteIcon /></ListItemIcon>
                            <Link to={'/favorites'} style={{textDecoration: 'none'}}>Favorites</Link>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {
                            userInfo === null ? (
                                <>
                                    <ListItem button>
                                        <ListItemIcon><PersonAddIcon /></ListItemIcon>
                                        <Link to={'/signup'} style={{textDecoration: 'none'}}>Sign up</Link>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon><PersonPinIcon /></ListItemIcon>
                                        <Link to={'/login'} style={{textDecoration: 'none'}}>Login</Link>
                                    </ListItem>
                                </>
                            ) : (
                                <ListItem button>
                                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                    <Button className='logout' onClick={logout} style={{textDecoration: 'none'}}>Logout</Button>
                                </ListItem>
                            )
                        }
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default ProminentAppBar