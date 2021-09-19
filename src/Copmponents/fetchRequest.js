import { useState, useEffect } from 'react';

function FetchData(url) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        function getData() {
            setIsLoading(true);
            setData([]);
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setIsLoading(false);
                    setData(res);
                })
                .catch(error => {
                    setIsLoading(false);
                    alert(error);
                })
        }
        getData();
    }, [url]);

    return { data, isLoading }
}

export default FetchData;

// fetch('https://api.themoviedb.org/3/discover/movie?api_key=f02402ea70e38ffee3ed8b3c684418ac&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate')
// .then(res => res.json())
// .then(res => console.log(res))
// .catch(error => alert(error))
