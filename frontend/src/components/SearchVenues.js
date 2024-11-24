import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function SearchVenues({ onOrderChange, onSortChange, onValuesChange, onSearchChange}) { //onRatingChange
    
    // const [priceRange, setPriceRange] = useState([minValue, maxValue]);
    // useEffect(() => {
    //     setPriceRange([minValue, maxValue]);
    // }, [minValue, maxValue]) 

    const handleSearchQuery = (event) => {
        onSearchChange(event.target.value);
    };

    const [rangeDisplay, setRangeDisplay] = useState([1, 3000])
    const handlePriceChange = (value) => {
        setRangeDisplay(value);
        onValuesChange(value);
    };

    const [activeButtonSortBy, setActiveButtonSortBy] = useState('');
    const handleSortBy = (value) => {
        setActiveButtonSortBy(value);
        onSortChange(value);
    };

    const [activeButton, setActiveButton] = useState(null);
    const handleOrderBy = (value) => {
        setActiveButton(value);
        onOrderChange(value);
    };

    return (
        <div className="d-flex flex-row justify-content-center align-items-center p-4">
            <div className="me-2">
                <input type="text" placeholder="Search..." onChange={handleSearchQuery} />
            </div>

            <div className="dropdown me-2">
                <button className="btn btn-secondary dropdown-toggle drop-down-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Ranges
                </button>
                <ul className="dropdown-menu">
                    <li>            
                        <div className="d-flex flex-column align-items-start p-2">
                            <span>Min Price: $ {rangeDisplay[0]}</span>
                            <span>Max Price: $ {rangeDisplay[1]}</span>
                            <ReactSlider
                                className="horizontal-slider d-flex align-items-center"
                                thumbClassName="thumb"

                                min={1}
                                max ={3000}
                                onChange={handlePriceChange}
                                defaultValue={[1,3000]}
                                pearling
                                minDistance={10}
                              
                            />
                            
                        </div>
                    </li>
                </ul>
            </div>

            <div className="dropdown me-2">
                <button className="btn btn-secondary dropdown-toggle drop-down-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort By
                </button>
                <ul className="dropdown-menu">
                <li><button className={`dropdown-item ${activeButtonSortBy === '' ? 'active' : ''}`}  onClick={() => handleSortBy('')}>None</button></li>
                    <li><button className={`dropdown-item ${activeButtonSortBy === 'name' ? 'active' : ''}`} onClick={() => handleSortBy('name')}>Name</button></li>
                    <li><button className={`dropdown-item ${activeButtonSortBy === 'price_range_max' ? 'active' : ''}`} onClick={() => handleSortBy('price_range_max')}>Price high</button></li>
                    <li><button className={`dropdown-item ${activeButtonSortBy === 'price_range_min' ? 'active' : ''}`} onClick={() => handleSortBy('price_range_min')}>Price low</button></li>

                    <li><button className={`dropdown-item ${activeButtonSortBy === 'event_date' ? 'active' : ''}`} onClick={() => handleSortBy('event_date')}>Date</button></li>
                </ul>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle drop-down-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Order By
                </button>
                <ul className="dropdown-menu">
                <li><button className={`dropdown-item ${activeButton === '' ? 'active' : ''}`} onClick={() => handleOrderBy('')}>None</button></li>
                    <li><button className={`dropdown-item ${activeButton === 'asc' ? 'active' : ''}`} onClick={() => handleOrderBy('asc')}>Ascending</button></li>
                    <li><button className={`dropdown-item ${activeButton === 'desc' ? 'active' : ''}`} onClick={() => handleOrderBy('desc')}>Descending</button></li>
                </ul>
            </div>
        </div>
    );
}

export default SearchVenues;