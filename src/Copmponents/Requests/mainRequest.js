import { api_key, base } from '../allRequests'

const OtherRequest = async ({lang, sort, page, genres}) => {
    const result = await fetch(`${base}/discover/movie?api_key=${api_key}&language=${lang}&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&${genres ? 'with_genres='+ genres : ''}&with_watch_monetization_types=flatrate`)
    const response = await result.json();
    return response;
}

export default OtherRequest;