import React from 'react';
import './Main.css';
import Banner from '../../Copmponents/Banner/Banner';
import Movies from '../../Copmponents/Movies/Movies';
import { api_key, base } from '../../Copmponents/allRequests';

function Main() {
    
    // 1- make Pagination Component === Done :)
    // 2- useEffect in Movies Component === Done :)
    // 3- useEffect in Banner Component ==>> will fix error also fix it in Redux === Done :)
    // 4- specific Pagination for Movie in Redux === Done :)
    // 5- also other component like Pagination for Keyword Component in Redux === Done :)
    // 6- make page for genres === Done :)
    // 7- search if bring actor movies === Done :)
    // 8- for bar all links === Done :)
    // 9- sign up sign in pages === Done :)
    // 10- favorite pages all Function === Done :)
    // 11- local storage for Favorite and Language 
    // 12- change languages
    // 13- do Seach List 
    // 14- Reload on Movie Page and Actor Page  
    // 15- Delete all not need 


    return (
        <div className='main' id='main'>
            <Banner />
            <Movies startUrl={`${base}/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`} endUrl={`&with_watch_monetization_types=flatrate`} />
        </div>
    )
}

export default Main
