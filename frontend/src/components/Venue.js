import React from 'react';
import VenueCard from './VenueCard';
import { useState, useEffect } from 'react';
import axios from 'axios'
import SearchVenues from './SearchVenues';
import Pagination from './Pagination';


function Venue() {

  const [eventData, setEventData] = useState({
    "events": [
      {
        "id": "Z698xZu0ZaGQo",
        "event_name": "Childish Gambino",
        "artist_names": ["Childish Gambino"],
        "dateAndTime": [2024, 11, 12],
        "sales_start_end": "2024-05-17T08:00:00Z to 2024-11-12T22:59:00Z",
        "price_range": [1490.0, 4242.0],
        "genre_id": "KnvZfZ7vAvv",
        "venue": { "name": "O2 Arena", "address": "\u010ceskomoravsk\u00e1 2345/17a, Praha 9", "phoneNumber": "020 8463 2000", "rating": "4.5 / 5", "website": "https://www.theo2.co.uk/" },
        "ticketmaster_URL": "https://www.ticketmaster.cz/event/childish-gambino-tickets/50833?language=en-us"
      }
    ]
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [priceRange, setPriceRange] = useState([0,3000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');

  const fetchData = async (page) => {
    try {
      
      // const response = await axios.get(`https://www.cheapcheapticket.xyz/GetEvents`, {
      console.log("NEW values ==-==--------------")
      
      console.log(priceRange+" Debug value")
      console.log(searchQuery+" Debug value")
      console.log(sortBy+" Debug value")
      console.log(orderBy+" Debug value")
      

        const response = await axios.get(`/GetEvents`, {
        params: { page,
           per_page: 30,
          'price_range_min.min' : priceRange[0], 
          'price_range_max.max': priceRange[1], 
          q: searchQuery,
          sort_by: sortBy,
          sort_order: orderBy,
         }
      });
      
      //const responseLength = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetAllEvents`);

      const newEvents = response.data.map((newEvent, index) => {
        const defaultEvent = eventData.events[index] || {
          id: "",
          event_name: "",
          artist_names: [],
          event_date: "",
          sales_start_end: "",
          price_range: [],
          genre_id: "",
          venue: {
            name: "",
            address: "",
            phoneNumber: "",
            rating: "",
            website: ""
          },
          ticketmaster_URL: ""
        };
        return {
          ...defaultEvent,
          ...newEvent,
          venue: {
            ...defaultEvent.venue,
            ...newEvent.venue
          }
        };
      });
      setEventData({ events: newEvents });

      const responseLength = await axios.get(`/GetEvents`, {
        params: { page,
           per_page: 3000,
          'price_range_min.min' : priceRange[0], 
          'price_range_max.max': priceRange[1], 
          q: searchQuery,
          sort_by: sortBy,
          sort_order: orderBy,
         }
      });
      const totalEvents = responseLength.data.length;
      setTotalPages(Math.ceil(totalEvents / 30));
      
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage,priceRange,searchQuery,sortBy,orderBy]); 

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchQuery = (value) => {
    setSearchQuery(value);
  };
  // const handleValuesRange = (newValues) => {
  //   setValuesRange(newValues);
  // };
  const handleSortBy = (value) => {
    setSortBy(value);
  };
  const handleOrderBy = (value) => {
    setOrderBy(value);
  };
  const handlePriceChange=(value)=>{
    setPriceRange(value)
  }

  return (
    <div class ="pb-5">
      <div>
        <h2 class="page-title">Events</h2>
        <p class="page-title">Events all across the US! </p>
      </div>

      <SearchVenues
        onSearchChange={handleSearchQuery}
        onValuesChange={handlePriceChange}
        // minValue={0}
        // maxValue={10000}
   
        onSortChange={handleSortBy}
        onOrderChange={handleOrderBy}
      />
      <div className="row g-4 m-5">
        {
          eventData.events.map((event, index) => (
            <div className="col-lg-4" key={index}>
              <VenueCard
                eventId={event.id}
                event_name={event.event_name}
                artistNames={event.artist_names}
                artistIds={event.artistIds}
                
                event_date={event.event_date}
                salesStartEnd={event.sales_start}
                price_range_min={event.price_range_min}
                price_range_max={event.price_range_max}
                genreId={event.genre_id}
                genre_name={event.genre_name}
                venue={event.venue}
                ticketmasterURL={event.ticketmaster_URL}
                eventImageURL ={event.eventImageURL}
              />
            </div>
          ))
        }
      </div>


      <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            />

    </div>
  );
}

export default Venue;
