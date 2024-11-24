import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function VenueInfo() {
    const { eventId } = useParams();
    const [eventData, setEventData] = useState({
        "id": "Z698xZu0ZaGQo",
        "event_name": "Childish Gambino",
        "artist_names": ["Childish Gambino"],
        "artistIds": ['id'],
        "event_date": 20240122,
        "sales_start": "20248888",
        "price_range_min": 1,
        "price_range_max": 1,
        "venue": { "name": "O2 Arena", "address": "\u010ceskomoravsk\u00e1 2345/17a, Praha 9", "phoneNumber": "020 8463 2000", "rating": "4.5 / 5", "website": "https://www.theo2.co.uk/" },
        "ticketmaster_URL": "https://www.ticketmaster.cz/event/childish-gambino-tickets/50833?language=en-us",
        "eventImageURL": "www.",
        "genre_id": "KnvZfZ7vAvv",
        "genre_name": "alter",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`/GetEvent/${eventId}`);
                //const response = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetEvent/${eventId}`);
                setEventData(response.data);
            } catch (error) {
                console.error("Error fetching event data: ", error);
            }
        };
        fetchEventData();
    }, [eventId]);

    if (!eventData) {
        return <div>Loading...</div>;
    }

    const handleBackClick = () => {
        navigate('/venue');
    };

    const formattedSalesDate = formatDate(eventData.sales_start);
    const formattedEventDate = formatDate(eventData.event_date);

    return (
        <div className="container my-5 text-white d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="col">
                <div>
                    <img src={eventData.eventImageURL} alt="Image Unavailable" className="img-fluid event-instance-image" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
                </div>
                <div>
                    <h2>{eventData.event_name}</h2>
                    <p><strong>Artists:</strong> {eventData.artist_names.join(', ')}</p>
                    <p><strong>Event Date: </strong>{formattedEventDate}</p>
                    <p><strong>Sales Start On: </strong> {formattedSalesDate}</p>
                    {
                        eventData.price_range_min == -1 ?
                        (<p><strong>Price Range:</strong> Unavailable</p>)
                        :
                        <p><strong>Price Range:</strong> ${eventData.price_range_min} - ${eventData.price_range_max}</p>
                    } 
                    <p><strong>Genre:</strong> {eventData.genre_name}</p>
                    <br></br>
                    <hr></hr>
                    <h3>Venue Information</h3>
                    <p><strong>Name:</strong> {eventData.venue.name}</p>
                    <p><strong>Address:</strong> {eventData.venue.address}</p>
                    <p><strong>Phone Number:</strong> {eventData.venue.phoneNumber}</p>
                    <p><strong>Website:</strong> <a href={eventData.venue.website} target="_blank" rel="noopener noreferrer">{eventData.venue.website}</a></p>
                    <div className="col d-flex justify-content-center">
                        <a href={eventData.ticketmaster_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-3 mx-2">Buy Tickets</a>
                        <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back to Events</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatDate(event_date) {
    if (!event_date || event_date < 20230601) {
        return "Unavailable";
    } else {
        const date_str = event_date.toString();
        const year = date_str.slice(0, 4);
        const month = date_str.slice(4, 6);
        const day = date_str.slice(6, 8);
        return `${year}-${month}-${day}`;
    }
}

export default VenueInfo;
