import React, { useState, useEffect } from 'react';
import './PeoplePage.css';
import { useSelector } from 'react-redux';
import { api_key, base, imageUrl } from '../../staticInfo';
import Loader from '../../Copmponents/Loader/Loader';
import Movies from '../../Copmponents/Movies/Movies';

function PeoplePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [peopleInfo, setPeopleInfo] = useState(null);
    const { peopleId } = useSelector(state => state.movies);
    const myDate = new Date();

    useEffect(() => {
        document.body.scrollIntoView({behavior: 'smooth'});
        let mouted = true;
        setIsLoading(true);
        fetch(`${base}/person/${peopleId}?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            if(mouted) {
                setPeopleInfo(data);
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

    }, [peopleId]);

    return isLoading ? <Loader /> : peopleInfo !== null ? (
        <div className='people_page'>
            <div className="people_image_info">
                <div className="people_image">
                    <img src={`${imageUrl}/w300${peopleInfo.profile_path}`} alt="" loading='lazy' />
                </div>
                <div className="people_info">
                    <h3 className="people_title">Personal Info</h3>
                    <div className="all_personal_info">
                        {peopleInfo.known_for_department && (
                            <div>
                                <p className="main_section"><strong>Known For</strong></p>
                                <span className="people_answer">{peopleInfo.known_for_department}</span>
                            </div>
                        )}
                        {peopleInfo.gender && (
                            <div>
                                <p className="main_section"><strong>Gender</strong></p>
                                <span className="people_answer">{peopleInfo.gender === 1 ? 'Female' : 'Male'}</span>
                            </div>
                        )}
                        {peopleInfo.birthday && (
                            <div>
                                <p className="main_section"><strong>Birthday</strong></p>
                                <span className="people_answer">{peopleInfo.birthday} ({myDate.getFullYear() - new Date(peopleInfo.birthday).getFullYear()} years old)</span>
                            </div>
                        )}
                        {peopleInfo.place_of_birth && (
                            <div>
                                <p className="main_section"><strong>Place of Birth</strong></p>
                                <span className="people_answer">{peopleInfo.place_of_birth}</span>
                            </div>
                        )}
                        {peopleInfo.deathday && (
                            <div>
                                <p className="main_section"><strong>Deathday</strong></p>
                                <span className="people_answer">{peopleInfo.deathday}</span>
                            </div>
                        )}
                        {peopleInfo.also_known_as !== null && peopleInfo.also_known_as.length > 0 && (
                            <div className='also_know_as'>
                                <p className="main_section"><strong>Also Known As</strong></p>
                                <ul>
                                    {peopleInfo.also_known_as.map(el => <li key={el}>{el}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="people_biography">
                <h1 className="people_name">{peopleInfo.name}</h1>
                <h2>Biography</h2>
                <p className="biography">{peopleInfo.biography}</p>
                <Movies startUrl={`${base}/discover/movie?api_key=${api_key}&language=en-US&&sort_by=popularity.desc&include_adult=false&include_video=false&page=`} endUrl={`&with_people=${peopleId}&with_watch_monetization_types=flatrate`} />
            </div>
        </div>
    ) : null;
}

export default PeoplePage;
