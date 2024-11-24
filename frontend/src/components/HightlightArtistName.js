import React from 'react';
import { Link } from 'react-router-dom';

function HighlightArtistName({ name, id, searchQuery }) {
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = name.split(regex);


    return (
        <Link className="artist-card-title artist-card-headers artist-card-link" to={`/artists/artistspage/${id}`}>
            {parts.map((part, index) =>
                part.toLowerCase() === searchQuery.toLowerCase() ? (
                    <span key={index} style={{ backgroundColor: 'lightblue' }}>{part}</span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </Link>
    );
}

export default HighlightArtistName;
