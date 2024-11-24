import React from 'react';
import { useState } from 'react';

import { createProxy } from 'react-shadow';

function Pagination({ totalPages, currentPage, handlePageChange }) {
    const ShadowRoot = createProxy();

    const [pageHover, setPageHover] = useState(0);

    const handleMouseEnter = (page) => {
        setPageHover(page);
    };

    const handleMouseLeave = () => {
        setPageHover(0);
    };
    return (
        <ShadowRoot.div>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/semantic.min.css"
            />
            <div className="ui pagination menu">
                {Array.from({ length: totalPages }, (_, index) => (
                    index < currentPage + 2 && index > currentPage - 4 ?
                        (
                            <a key={index}
                                className={`item  ${index + 1 === currentPage ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                                onMouseEnter={() => handleMouseEnter(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    color: 'white',
                                    background: pageHover === index + 1 ? "#4f527d" : '#b87d97',
                                }}
                            >
                                {index + 1}
                            </a>
                        ) :
                        index === currentPage + 3 || index === currentPage - 5 ?
                            <a className="disabled item"
                                style={{ color: 'white', background: '#b87d97' }}
                            >...</a>
                            :
                            null
                ))}
            </div>
        </ShadowRoot.div>
    );
}

export default Pagination;
