import React, { useState, useEffect } from 'react';
import GenreCard from './GenreCard';
import axios from 'axios';
import SearchGenres from './SearchGenres';
import Pagination from './Pagination';


function Genre() {
  const [genresData, setGenresData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [valuesRange, setValuesRange] = useState([1, 10000]);
  const [currentRange, setCurrentRange] = useState([1, 10000]);
  const [sortBy, setSortBy] = useState('');
  const [orderby, setOrderby] = useState('');

  const fetchData = async (currentPage) => {
    try {
      const response = await axios.get(`/GetGenres`, {
        params: {
          page: currentPage,
          per_page: 5,
          sort_by: sortBy,
          sort_order: orderby,
          q: searchQuery,
          'events_price_min.min': currentRange[0],
          'events_price_max.max': currentRange[1],
        },
      });

      const newGenres = response.data.map((newGenre, index) => {
        const defaultGenre = genresData[index] || {};
        return {
          ...defaultGenre,
          ...newGenre,
        };
      });

      setGenresData(newGenres);
      const responseLength = await axios.get(`/GetGenres`, {
        params: {
          page: currentPage,
          per_page: 15,
          sort_by: sortBy,
          sort_order: orderby,
          q: searchQuery,
          'events_price_min.min': currentRange[0],
          'events_price_max.max': currentRange[1],
        },
      });
      const totalGenres = responseLength.data.length;
      console.log(totalGenres)
      setTotalPages(Math.ceil(totalGenres / 5));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, valuesRange, orderby, currentRange, sortBy, searchQuery]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchQuery = (value) => {
    setSearchQuery(value);
  };

  const handleValuesRange = (newValues) => {
    setCurrentRange(newValues);
  };

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  const handleOrderBy = (value) => {
    setOrderby(value);
  };

  return (
    
      <div class = "pb-5">
        <h1 className="m-5 page-title">Genres</h1>
        <SearchGenres
          onSearchChange={handleSearchQuery}
          onValuesChange={handleValuesRange}
          minValue={valuesRange[0]}
          maxValue={valuesRange[1]}
          onSortChange={handleSortBy}
          onOrderChange={handleOrderBy}
        />
        <div className="row d-flex justify-content-center genre-card-container">
          {genresData.length > 0 ? (
            genresData.map((genre, index) => (
              <GenreCard
                key={index}
                genreId={genre.id}
                name={genre.name}
                popularArtists={genre.popular_artists}
                upcomingEvents={genre.upcoming_events}
                topSongs={genre.top_songs}
                events_price_min={genre.events_price_min}
                events_price_max={genre.events_price_max}
              />
            ))
          ) : (
            <></>
          )}
        </div>


        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    
  );
}

export default Genre;
