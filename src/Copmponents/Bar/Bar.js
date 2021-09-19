import React, { useState, useEffect } from 'react';
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
import ListItemText from '@material-ui/core/ListItemText';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import UpdateIcon from '@material-ui/icons/Update';
import PublicIcon from '@material-ui/icons/Public';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../store/UserSlice';
import { auth } from '../../firebase';

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

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    // { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    // { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    // { title: 'Forrest Gump', year: 1994 },
    // { title: 'Inception', year: 2010 },
    // { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    // { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    // { title: 'Goodfellas', year: 1990 },
    // { title: 'The Matrix', year: 1999 },
    // { title: 'Seven Samurai', year: 1954 },
    // { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    // { title: 'City of God', year: 2002 },
    // { title: 'Se7en', year: 1995 },
    // { title: 'The Silence of the Lambs', year: 1991 },
    // { title: "It's a Wonderful Life", year: 1946 },
    // { title: 'Life Is Beautiful', year: 1997 },
    // { title: 'The Usual Suspects', year: 1995 },
    // { title: 'Léon: The Professional', year: 1994 },
    // { title: 'Spirited Away', year: 2001 },
    // { title: 'Saving Private Ryan', year: 1998 },
    // { title: 'Once Upon a Time in the West', year: 1968 },
    // { title: 'American History X', year: 1998 },
    // { title: 'Interstellar', year: 2014 },
    // { title: 'Casablanca', year: 1942 },
    // { title: 'City Lights', year: 1931 },
    // { title: 'Psycho', year: 1960 },
    // { title: 'The Green Mile', year: 1999 },
    // { title: 'The Intouchables', year: 2011 },
    // { title: 'Modern Times', year: 1936 },
    // { title: 'Raiders of the Lost Ark', year: 1981 },
    // { title: 'Rear Window', year: 1954 },
    // { title: 'The Pianist', year: 2002 },
    // { title: 'The Departed', year: 2006 },
    // { title: 'Terminator 2: Judgment Day', year: 1991 },
    // { title: 'Back to the Future', year: 1985 },
    // { title: 'Whiplash', year: 2014 },
    // { title: 'Gladiator', year: 2000 },
    // { title: 'Memento', year: 2000 },
    // { title: 'The Prestige', year: 2006 },
    // { title: 'The Lion King', year: 1994 },
    // { title: 'Apocalypse Now', year: 1979 },
    // { title: 'Alien', year: 1979 },
    // { title: 'Sunset Boulevard', year: 1950 },
    // { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    // { title: 'The Great Dictator', year: 1940 },
    // { title: 'Cinema Paradiso', year: 1988 },
    // { title: 'The Lives of Others', year: 2006 },
    // { title: 'Grave of the Fireflies', year: 1988 },
    // { title: 'Paths of Glory', year: 1957 },
    // { title: 'Django Unchained', year: 2012 },
    // { title: 'The Shining', year: 1980 },
    // { title: 'WALL·E', year: 2008 },
    // { title: 'American Beauty', year: 1999 },
    // { title: 'The Dark Knight Rises', year: 2012 },
    // { title: 'Princess Mononoke', year: 1997 },
    // { title: 'Aliens', year: 1986 },
    // { title: 'Oldboy', year: 2003 },
    // { title: 'Once Upon a Time in America', year: 1984 },
    // { title: 'Witness for the Prosecution', year: 1957 },
    // { title: 'Das Boot', year: 1981 },
    // { title: 'Citizen Kane', year: 1941 },
    // { title: 'North by Northwest', year: 1959 },
    // { title: 'Vertigo', year: 1958 },
    // { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    // { title: 'Reservoir Dogs', year: 1992 },
    // { title: 'Braveheart', year: 1995 },
    // { title: 'M', year: 1931 },
    // { title: 'Requiem for a Dream', year: 2000 },
    // { title: 'Amélie', year: 2001 },
    // { title: 'A Clockwork Orange', year: 1971 },
    // { title: 'Like Stars on Earth', year: 2007 },
    // { title: 'Taxi Driver', year: 1976 },
    // { title: 'Lawrence of Arabia', year: 1962 },
    // { title: 'Double Indemnity', year: 1944 },
    // { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    // { title: 'Amadeus', year: 1984 },
    // { title: 'To Kill a Mockingbird', year: 1962 },
    // { title: 'Toy Story 3', year: 2010 },
    // { title: 'Logan', year: 2017 },
    // { title: 'Full Metal Jacket', year: 1987 },
    // { title: 'Dangal', year: 2016 },
    // { title: 'The Sting', year: 1973 },
    // { title: '2001: A Space Odyssey', year: 1968 },
    // { title: "Singin' in the Rain", year: 1952 },
    // { title: 'Toy Story', year: 1995 },
    // { title: 'Bicycle Thieves', year: 1948 },
    // { title: 'The Kid', year: 1921 },
    // { title: 'Inglourious Basterds', year: 2009 },
    // { title: 'Snatch', year: 2000 },
    // { title: '3 Idiots', year: 2009 },
    // { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default function ProminentAppBar() {
    const classes = useStyles();
    const classesDrawer = useStylesDrawer();
    const [drawerState, setDrawerState] = useState(false);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

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
                            // onChange={(event, value) => console.log(value)}
                            onInputChange={(event, value) => console.log(value)}
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={top100Films.map((option) => option.title)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder='Search'
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                />
                            )}
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
                        <ListItem button>
                            <ListItemIcon><PublicIcon /></ListItemIcon>
                            <ListItemText primary={'Languages'} />
                        </ListItem>
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