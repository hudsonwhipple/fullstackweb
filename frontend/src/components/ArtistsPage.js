import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArtistsPage() {
    const { artistId } = useParams();
    const [artistData, setArtistData] = useState(null);  // Initialize with null
    const [genreName, setGenreName] = useState("");
    const [albumCoverPairs, setAlbumCoverPairs] = useState({});
    const [eventIdPairs, setEventIdPairs] = useState({});

    useEffect(() => {
        const GetArtistInfo = async () => {
            try {
                const response = await axios.get(`/GetArtist/${artistId}`);
                setArtistData(response.data);
            } catch (error) {
                console.error('Error ', error);
            }
        };
        GetArtistInfo();
    }, [artistId]);

    useEffect(() => {
        if (artistData) {
            const GetGenreName = async () => {
                try {
                    const genreResponse = await axios.get(`/GetGenre/${artistData.genre_id}`);
                    setGenreName(genreResponse.data.name);
                } catch (error) {
                    console.error('Error ', error);
                }
            };

            const getEventNames = async () => {
                try {
                    const eventPromises = artistData.future_events.map(async (eventId) => {
                        const response = await axios.get(`/GetEvent/${eventId}`);
                        return { eventId, eventName: response.data.event_name };
                    });
                    const eventNames = await Promise.all(eventPromises);

                    const eventIdPairs = Object.fromEntries(
                        eventNames.map(event => [event.eventId, event.eventName])
                    );
                    setEventIdPairs(eventIdPairs);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            if (artistData.albums && artistData.album_covers) {
                const albumCoverPairs = Object.fromEntries(
                    artistData.albums.map((key, index) => [key, artistData.album_covers[index]])
                );
                setAlbumCoverPairs(albumCoverPairs);
            }

            GetGenreName();
            getEventNames();
        }
    }, [artistData]);

    if (!artistData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="artist-page m-5 g-5 text-start d-flex flex-column">
                <h1 className="artist-page-title">{artistData.name}</h1>
                <h3 className="artist-page-text">Popularity: {artistData.popularity} / 100</h3>
                <h1 className="artist-page-text mb-5"><Link to={`/genre/${artistData.genre_id}`} className="artist-page-text">{genreName}</Link></h1>
                <h1 className="artist-page-subtitle">Albums</h1>
                <div className="row artist-page-albums flex-wrap">
                    {
                        Object.entries(albumCoverPairs).map(([key, value]) => (
                            <div className="text-white col-lg-4" key={key}>
                                <img className="artist-page-album" src={value} alt="albumCover" />
                                <p><b>{key}</b></p>
                            </div>
                        ))
                    }
                </div>
                <h1 className="artist-page-subtitle mb-4">Events</h1>
                <div className="d-flex flex-column">
                    {
                        Object.entries(eventIdPairs).map(([key, value]) => (
                            <p key={key}><b><Link to={`/venue/${key}`} className="artist-page-smalltext">{value}</Link></b></p>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default ArtistsPage;
