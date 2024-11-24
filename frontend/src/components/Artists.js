import React from 'react';
import ArtistsCard from "./ArtistsCard";
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import SearchContainer from './SearchArtists';
import Pagination from './Pagination';

function Artists() {

    const [artistsData, setArtistsData] = useState({
        // "Artists": [
        //     {
        //         "name": "Chidish Gambino",
        //         "id": "73sIBHcqh3Z3NyqHKZ7FOL",
        //         "popularity": 79,
        //         "albums": ["Atavista"],
        //         "album_covers": ["https://i.scdn.co/image/ab67616d0000b273a9afb2484111b87abc2b4a80", "https://i.scdn.co/image/ab67616d0000b2737582716b3666a5235d5af4ea", "https://i.scdn.co/image/ab67616d0000b273d98a6832141788d8c355852b"],
        //         "future_events": ["Z698xZu0ZaGQo", "Z698xZbpZ17GA_K", "G5vHZb1niHezV", "Event 4 id"],
        //         "image_url": "https://i.scdn.co/image/ab6761610000f178c3dc5429b676b16d451e5f77",
        //         "genre_id": "KnvZfZ7vAvv",
        //     }
        // ]
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [currentRange, setCurrentRange] = useState([1, 100]);
    const [sortBy, setSortBy] = useState('');
    const [orderby, setOrderby] = useState('');
    const [loading, setLoading] = useState('');


    const fetchData = useCallback(async (page) => {
        setLoading(true)
        try {
            console.log("New inputs --------------------------");
            console.log(searchQuery + " debug search value(string) ");
            console.log(currentRange[0] + " " + currentRange[1] + "debug ranges");
            console.log(filterValue + " debug genres wip");
            console.log(sortBy + " debug sort value(string) ");
            console.log(orderby + " debug order value(string)");

            const response = await axios.get(`/GetArtists`, {
                params: {
                    page,
                    per_page: 20,
                    sort_by: sortBy,
                    sort_order: orderby,
                    q: searchQuery,
                    genre_name: filterValue,
                    'popularity.min': currentRange[0],
                    'popularity.max': currentRange[1],
                }
            });
            setArtistsData({ Artists: response.data });

            // const responseLength = await axios.get(`/GetAllArtists`);
            const totalArtists = await axios.get(`/GetArtists`, {
                params: {
                    page,
                    per_page: 225,
                    sort_by: sortBy,
                    sort_order: orderby,
                    q: searchQuery,
                    genre_name: filterValue,
                    'popularity.min': currentRange[0],
                    'popularity.max': currentRange[1],
                }
            });
            //const responseLength = await axios.get(`https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetAllArtists`);

            const totalResults = totalArtists.data.length;
            setTotalPages(Math.ceil(totalResults / 20));

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }, [sortBy, orderby, searchQuery, filterValue, currentRange]);


    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, orderby, searchQuery, filterValue, currentRange, fetchData]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchData(newPage);
        window.scrollTo(0, 0);
    };

    const handleSearchQuery = (value) => {
        setSearchQuery(value);
    }
    const handleValuesRange = (newValues) => {
        setCurrentRange(newValues);
    }
    const handleFilterBy = (value) => {
        setFilterValue(value);
    }
    const handleSortBy = (value) => {
        setSortBy(value);
    }
    const handleOrderBy = (value) => {
        setOrderby(value);
    }

    return (
        <div class="pb-5">
            <h1 class=" m-5 page-title">Artists</h1>

            <SearchContainer
                onSearchChange={handleSearchQuery}
                onValuesChange={handleValuesRange}
                onFilterChange={handleFilterBy}
                onSortChange={handleSortBy}
                onOrderChange={handleOrderBy}
            />
            

            {
                loading ?
                    <>
                        <div class="row g-5 m-5">
                <div className="col-xl-3">
                    <ArtistsCard
                        searchQuery={""}
                        name={""}
                        id={""}
                        popularity={""}
                        genreId={""}
                        albums={""}
                        albumCovers={""}
                        futureEvents={""}
                        image_url={""}
                    />
                </div>
                <div className="col-xl-3">
                    <ArtistsCard
                        searchQuery={""}
                        name={""}
                        id={""}
                        popularity={""}
                        genreId={""}
                        albums={""}
                        albumCovers={""}
                        futureEvents={""}
                        image_url={""}
                    />
                </div>
                <div className="col-xl-3">
                    <ArtistsCard
                        searchQuery={""}
                        name={""}
                        id={""}
                        popularity={""}
                        genreId={""}
                        albums={""}
                        albumCovers={""}
                        futureEvents={""}
                        image_url={""}
                    />
                </div>
                <div className="col-xl-3">
                    <ArtistsCard
                        searchQuery={""}
                        name={""}
                        id={""}
                        popularity={""}
                        genreId={""}
                        albums={""}
                        albumCovers={""}
                        futureEvents={""}
                        image_url={""}
                    />
                </div>
            </div>
                    </>
                    :
                    artistsData && artistsData.Artists && artistsData.Artists.length > 0 ?
                        (
                            <div class="row g-5 m-5">
                                {artistsData.Artists.map((artist) => (
                                    <div className="col-xl-3">
                                        <ArtistsCard
                                            searchQuery={searchQuery}
                                            name={artist.name}
                                            id={artist.id}
                                            popularity={artist.popularity}
                                            genreId={artist.genre_id}
                                            albums={artist.albums}
                                            albumCovers={artist.album_covers}
                                            futureEvents={artist.future_events}
                                            image_url={artist.image_url}
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                        :
                        (
                            <div class="d-flex justify-content-center text-white">
                                <p>Found no items</p>
                            </div>
                        )
            }

            <Pagination
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
            />

        </div>
    );
}

export default Artists;
