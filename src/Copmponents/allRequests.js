export const api_key = "f02402ea70e38ffee3ed8b3c684418ac";
export const base = "https://api.themoviedb.org/3";

export const allRequest = {
  allMovies: `${base}/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=6&with_watch_monetization_types=flatrate`,
  popularMovies: `${base}/movie/popular?api_key=${api_key}&language=en-US&page=1`,
  topRated: `${base}/movie/top_rated?api_key=${api_key}&language=en-US&page=1`,
  upComing: `${base}/movie/upcoming?api_key=${api_key}&language=en-US&page=1`,
  imageUrl: 'https://image.tmdb.org/t/p'
}

export const movieType = {
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
}
