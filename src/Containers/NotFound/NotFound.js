import React from 'react';
import './NotFound.css';

function NotFound() {
    return (
        <div className='not_found' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}images/PageNotFound/PageNotFound.png)` }}>
            <h2 className='not_found_title'>Page Not Found</h2>
        </div>
    )
}

export default NotFound
