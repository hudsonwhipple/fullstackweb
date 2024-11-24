import React from 'react';
import ReactSlider from 'react-slider';
import axios from 'axios'

import { useState, useEffect } from 'react';



function SearchContainer({ onOrderChange, onSortChange, onFilterChange, onValuesChange, onSearchChange }) {

    const [filterValues, setfilterValues] = useState([])
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                //const response = await axios.get('https://backend-dot-cs373-idb-428121.uc.r.appspot.com/GetAllGenres');
                const response = await axios.get('/GetAllGenres');
                const optionList = response.data.map(event => ({ id: event.id, name: event.name }));

                setfilterValues(optionList);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, []);

    // search name - string
    const [stringInput, setStringInput] = useState('');
    const handleChange = (event) => {
        setStringInput(event.target.value);
    };
    const handleSearchQuery = (event) => {
        onSearchChange(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearchChange(stringInput);
            setStringInput('');
        }
    };

    const [rangeDisplay, setRangeDisplay] = useState([100, 1])
    const handleValuesChange = (value) => {
        // console.log("SLIDER DEBUG" + value)
        setRangeDisplay(value)
        onValuesChange(value)
    }

    // genres 
    const [activeButtonFilter, setActiveButtonFilter] = useState('');
    const handleFilterBy = (value) => {
        console.log(filterValues)
        console.log("hello problem")
        setActiveButtonFilter(value)
        onFilterChange(value);
    }

    // name and popularity
    const [activeButtonSort, setActiveButtonSort] = useState('');
    const handleSortBy = (value) => {
        setActiveButtonSort(value)
        onSortChange(value);
    }

    const [activeButton, setActiveButton] = useState('');
    // true ascending false descending
    const handleOrderBy = (value) => {
        setActiveButton(value);
        onOrderChange(value);

    }

    const handleMouseDown = (event) => {
        event.stopPropagation();
    };

    return (
        <>

            <div class="d-flex flex-row justify-content-center align-items-center p-4">

                <div class="me-2">
                    <input type="text" placeholder="Name search..." maxlength={100} onChange={handleSearchQuery} />
                </div>

                <div className="dropdown me-2">
                    <button className="btn btn-secondary dropdown-toggle drop-down-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Ranges
                    </button>
                    <ul className="dropdown-menu" data-bs-auto-close="false" onMouseDown={handleMouseDown}>
                        <li>
                            <div className="d-flex flex-column align-items-start p-2">
                                <span>Popularity out of 100 </span>
                                <span>Lowest : {rangeDisplay[0]}</span>
                                <span>Highest : {rangeDisplay[1]}</span>
                                <ReactSlider
                                    className="horizontal-slider d-flex align-items-center"
                                    thumbClassName="thumb"

                                    min={1}
                                    max={100}
                                    onChange={handleValuesChange}
                                    defaultValue={[1, 100]}
                                    pearling
                                    minDistance={1}
                                />

                            </div>
                        </li>
                    </ul>
                </div>

                <div class="dropdown me-2">
                    <button class="btn btn-secondary dropdown-toggle drop-down-button" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Genres
                    </button>
                    <ul class="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButtonFilter === '' ? 'active' : ''}`} onClick={() => handleFilterBy('')}>None</a></li>
                        {
                            filterValues.map((option, index) =>
                                <li key={index}><a class={`dropdown-item ${activeButtonFilter === option.name ? 'active' : ''}`} onClick={() => handleFilterBy(option.name)} >{option.name}</a></li>
                            )
                        }
                    </ul>
                </div>

                <div class="dropdown me-2">
                    <button class="btn btn-secondary dropdown-toggle drop-down-button" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButtonSort === '' ? 'active' : ''}`} onClick={() => handleSortBy('')}>None</a></li>
                        <li><a className={`dropdown-item ${activeButtonSort === 'name' ? 'active' : ''}`} onClick={() => handleSortBy('name')}>Name</a></li>
                        <li><a className={`dropdown-item ${activeButtonSort === 'popularity' ? 'active' : ''}`} onClick={() => handleSortBy('popularity')}>Popularity</a></li>
                    </ul>
                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle drop-down-button" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Order By
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className={`dropdown-item ${activeButton === '' ? 'active' : ''}`} onClick={() => handleOrderBy('')}>None</a></li>
                        <li><a className={`dropdown-item ${activeButton === 'ascending' ? 'active' : ''}`} onClick={() => handleOrderBy('asc')}>Ascending</a></li>
                        <li><a className={`dropdown-item ${activeButton === 'descending' ? 'active' : ''}`} onClick={() => handleOrderBy('desc')}>Descending</a></li>
                    </ul>
                </div>

            </div>

        </>
    );
}

export default SearchContainer;