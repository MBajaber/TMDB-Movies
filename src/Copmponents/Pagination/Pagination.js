import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import './Pagination.css';

function PaginationComponent({ page, totalPages, changePageNumber }) {
    return (
        <div className="pagination">
            <Pagination page={page} count={totalPages} color="primary" onChange={(e, num) => changePageNumber(num)} />
        </div>
    )
}

export default PaginationComponent;
