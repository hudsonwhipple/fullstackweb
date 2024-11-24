import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios'



function GenreCard(props) {

    const [eventIdPairs, setEventIdPairs] = useState({});
    useEffect(() => {
        const fetchEventNames = async () => {
            const eventNames = ["defaultEventName 1", "defaultEventName 2", "defaultEventName 3"];
            const limitedFutureEvents = [...props.upcomingEvents.slice(0, 3)];

            while (limitedFutureEvents.length < 3) {
                limitedFutureEvents.push("");
            }

            for (let i = 0; i < 3; i++) {
                if (limitedFutureEvents[i] !== "") {
                    try {
                        const response = await axios.get(`/GetEvent/${limitedFutureEvents[i]}`);
                        // const response = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetEvent/${limitedFutureEvents[i]}`);
                        eventNames[i] = response.data.event_name;
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            }
            const eventIdPairs = Object.fromEntries(
                limitedFutureEvents.map((key, index) => [key, eventNames[index]])
            )
            setEventIdPairs(eventIdPairs);
        }
        fetchEventNames();
    }, [props.upcomingEvents]);

    const [popularArtists, setpopularArtists] = useState({});
    useEffect(() => {
        const fetchArtistNames = async () => {
            const artistsNames = ["art 1", "art 2", "art 3"];
            const topArtistsIds = [...props.popularArtists.slice(0, 3)];

            while (topArtistsIds.length < 3) {
                topArtistsIds.push("");
            }

            for (let i = 0; i < 3; i++) {
                if (topArtistsIds[i] !== "") {
                    try {
                        const response = await axios.get(`/GetArtist/${topArtistsIds[i]}`);
                        //const response = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetArtist/${topArtistsIds[i]}`);
                        artistsNames[i] = response.data.name;
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            }
            const popularArtists = Object.fromEntries(
                topArtistsIds.map((key, index) => [key, artistsNames[index]])
            );
            setpopularArtists(popularArtists);
        }
        fetchArtistNames();
    }, [props.popularArtists]);

    return (
        <>
            <div class="genre-card row text-start p-5 rounded-5">
                <h1 class="col-lg-12  "><Link class="genre-card-title" to={`/genre/${props.genreId}`}>{props.name}</Link></h1>
                <div class="col-lg-4 d-flex flex-column">
                    <h1 class="genre-card-subtitle">Top Songs</h1>
                    {
                        props.topSongs.map((song, index) => (
                            index < 3 ?
                                <span class="genre-card-songs" key={index}>{song}</span>
                                :
                                null
                        ))
                    }
                </div>

                <div class="col-lg-4 d-flex flex-column">
                    <h1 class="genre-card-subtitle" >Popular Artists</h1>
                    {
                        Object.entries(popularArtists).map(([key, value], index) => (
                            <span key={index}><Link to={`/artists/artistspage/${key}`} class="genre-card-link">{value}</Link></span>
                        ))
                    }
                </div>

                <div class="col-lg-4 d-flex flex-column">
                    <h1 class="genre-card-subtitle">Events</h1>
                    {
                        props.events_price_min == -1 || props.events_price_max == -1 ?
                        (<p className='event-instance-text'>(Price Range Not Available)</p>) 
                        : 
                        (<p className='event-instance-text'>(${props.events_price_min} to ${props.events_price_max})</p>)
                    }
                    {
                        Object.entries(eventIdPairs).map(([key, value], index) => (
                            index < 3 ?
                                <span key={index}><Link to={`/venue/${key}`} class="genre-card-link">{value}</Link></span>
                                :
                                null
                        ))
                    }
                </div >


            </div >
        </>

    );
}

export default GenreCard;
