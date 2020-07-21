import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function JobsPagination({ page, setPage, hasNextPage }) {
    const adjustPage = (amt) => {
        return setPage(s => s + amt)
    }

    return (
        <Pagination>
            {page > 1 && <Pagination.Prev onClick={() => adjustPage(-1)}></Pagination.Prev>}
            {page > 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
            {page > 2 && <Pagination.Ellipsis></Pagination.Ellipsis>}
            {page > 2 && <Pagination.Item onClick={() => adjustPage(-1)} >{page - 1}</Pagination.Item>}
            <Pagination.Item active> {page}</Pagination.Item>
            {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}> {page + 1}</Pagination.Item>}
            {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)}></Pagination.Next>}
        </Pagination>
    )
}
