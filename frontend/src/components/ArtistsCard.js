import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import HighlightArtistName from "./HightlightArtistName";

function ArtistsCard(props) {
    const [genreName, setGenreName] = useState("defaultGenreName");
    const [eventIdPairs, setEventIdPairs] = useState({});
    const availableEvents = props.futureEvents.length == 0 ? true : false
    const [loadingGenre, setLoadingGenre] = useState(true)
    const [loadingEvents, setLoadingEvents] = useState(true)


    useEffect(() => {
        const getGenreName = async () => {
            setLoadingGenre(true)
            try {
                const response = await axios.get(`/GetGenre/${props.genreId}`);
                //const response = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetGenre/${props.genreId}`);
                setGenreName(response.data.name);
            } catch (error) {
                console.error('Error fetching genre name:', error);
            } finally {
                setLoadingGenre(false)
            }
        };
        getGenreName();
    }, [props.genreId]);

    useEffect(() => {

        const fetchEventNames = async () => {
            const eventNames = ["defaultEventName 1", "defaultEventName 2", "defaultEventName 3"];
            const limitedFutureEvents = [...props.futureEvents].slice(0, 3);

            while (limitedFutureEvents.length < 3) {
                limitedFutureEvents.push("");
            }

            for (let i = 0; i < 3; i++) {
                if (limitedFutureEvents[i] !== "") {
                    setLoadingEvents(true);
                    try {
                        const response = await axios.get(`/GetEvent/${limitedFutureEvents[i]}`);
                        //const response = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetEvent/${limitedFutureEvents[i]}`);
                        eventNames[i] = response.data.event_name;
                    } catch (error) {
                        console.error('Error fetching event name:', error);
                    } finally {
                        setLoadingEvents(false)
                    }
                }
            }


            const eventIdPairs = Object.fromEntries(
                limitedFutureEvents.map((key, index) => [key, eventNames[index]])
            );
            console.log(eventIdPairs + "asdf")
            setEventIdPairs(eventIdPairs);
            setLoadingEvents(false)
        };
        fetchEventNames();
    }, [props.futureEvents]);


    return (
        <>
            {

                loadingEvents || loadingGenre ? (
                    <div className="card artist-card p-2 border-0">
                        <div className="d-flex justify-content-center mt-4">
                            <img className="card-img-top circle-image" src={""} alt="" />
                        </div>
                        <div className="card-body artist-card-body text-start d-flex flex-column mb-1">
                        </div>
                        <div className="card-body artist-card-body text-start d-flex flex-column mb-4">
                        </div>
                    </div>
                ) :

                    <div className="card artist-card p-2 border-0">
                        <div className="d-flex justify-content-center mt-4">
                            <img className="card-img-top circle-image" src={props.image_url} alt="artistsPic" />
                        </div>

                        <div className="card-body artist-card-body text-start d-flex flex-column mb-1">
                            <div className="artist-card-container mb-4">
                                <HighlightArtistName name={props.name} id={props.id} searchQuery={props.searchQuery}></HighlightArtistName>
                            </div>

                            <span><h1 className="artist-card-text"><Link className="artist-card-link artist-card-genre" to={`/genre/${props.genreId}`}>Genre: {genreName}</Link></h1></span>
                            {
                                loadingGenre ?
                                    <span><h1 className="artist-card-text">Loading...</h1></span>
                                    :
                                    props.albums.length === 0 ?
                                        <span><h1 className="artist-card-text">&nbsp;</h1></span>
                                        :
                                        props.albums[0].length < 8 ?
                                            <span><h1 className="artist-card-text">Latest Album : {props.albums[0]}</h1></span>
                                            :
                                            <span><h1 className="artist-card-text">Latest Album : {props.albums[0].substring(0, 7) + "..."}</h1></span>
                            }
                            <span><h1 className="artist-card-text">Popularity: {props.popularity}</h1></span>
                        </div>

                        <div className="card-body artist-card-body text-start d-flex flex-column mb-4">
                            <h1 className="artist-card-subtitle artist-card-headers">Events</h1>
                            {
                                loadingEvents ?
                                    <span key={0} class="artist-card-text text-start">Loading events</span>
                                    :
                                    availableEvents ?
                                        <>
                                            <span key={0} class="artist-card-text text-start">No available events</span>
                                            <span key={1}><Link className="artist-card-link artist-card-text">&nbsp;</Link></span>
                                            <span key={2}><Link className="artist-card-link artist-card-text">&nbsp;</Link></span>
                                        </>
                                        :
                                        Object.entries(eventIdPairs).map(([key, value], index) => (
                                            key !== "" ?
                                                (value.length < 30 ?
                                                    <span key={index}><Link className="artist-card-link artist-card-text" to={`/venue/${key}`}>{value}</Link></span>
                                                    :
                                                    <span key={index}><Link className="artist-card-link artist-card-text" to={`/venue/${key}`}>{value.substring(0, 30) + "..."}</Link></span>
                                                )
                                                :
                                                <span key={index}><Link className="artist-card-link artist-card-text">&nbsp;</Link></span>
                                        ))
                            }
                        </div>

                    </div>
            }
        </>
    );
}

export default ArtistsCard;