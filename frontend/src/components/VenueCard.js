import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'

function VenueCard(props) {

    const [genreName, setGenreName] = useState("defaultGenreName")
    useEffect(() => {
        const getGenreName = async () => {
            try {
                //const response = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetGenre/${props.genreId}`)
                const response = await axios.get(`/GetGenre/${props.genreId}`);
                setGenreName(response.data.name);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        getGenreName();
    },[props.genreId]);

    const formattedDate = formatDate(props.event_date);

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-12">
                    <div className="card-body event-card">
                        <Link to={`/venue/${props.eventId}`}><h5  class="event-name event-card-link">{props.event_name}</h5></Link> 
                        {
                                props.price_range_min == -1 ? 
                            ( <p>Ticket Price: <strong>No listed price</strong></p>)
                            :
                             props.price_range_min === props.price_range_max ?
                            (<p>Ticket Price: <strong>${props.price_range_min}</strong></p>)
                            :
                            ( <p>Ticket Price: <strong>${props.price_range_min} to ${props.price_range_max}</strong></p>)
                        }
                        <p className="card-text">{formattedDate}</p> 
                        
                        <Link to={`/artists/artistspage/${props.artistIds}`} className="btn btn-primary">{props.artistNames[0]}</Link>

                        <p className="card-text"><small className="text-body-secondary" class="event-address">{props.venue.address}</small></p>
                        <p><strong>Genres: </strong> <Link class="event-card-link" to={`/genre/${props.genreId}`}>{genreName}</Link> </p> 
                    </div>
                </div>
            </div>
        </div>
    )
}

function formatDate(event_date) {
    if (!event_date) {
        return "Unavailable"
    }
    const date_str = event_date.toString();
    const year = date_str.slice(0,4);
    const month = date_str.slice(4,6);
    const day = date_str.slice(6,8);
    return `${year}-${month}-${day}`
}

export default VenueCard;