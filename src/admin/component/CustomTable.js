import {Button, Pagination, Table} from "react-bootstrap";
import {useMemo, useState} from "react";

const CustomTable = ({ headerData, bodyData, pageData, onClickPage }) => {
    const [tableBody, setTableBody] = useState([]);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [pageLastNumber, setPageLastNumber] = useState();
    const handleClickPaginationPrev = () => {
        let _nextPage = pageData.page - 1;
        if (_nextPage > 0) onClickPage(_nextPage);
    }
    const handleClickPaginationNum = num => onClickPage(num);
    const handleClickPaginationNext = () => {
        let _nextPage = pageData.page + 1;
        if (_nextPage <= pageLastNumber) onClickPage(_nextPage);
    }
    const makeTableBody = () => {
        const _tableBody = bodyData.map(data => {
            const keys = Object.keys(data);
            return keys.map(key => data[key]);
        });
        setTableBody(_tableBody);
    };
    const makePageNumbers = () => {
        const unitPerBlock = 10;
        let _pageData = {
            offset: Math.floor((pageData.page - 1) / pageData.size) * pageData.size + 1,
            totalThisBlock: pageData.total - pageData.total % (pageData.size * unitPerBlock),
            totalLastBlock: pageData.total % (pageData.size * unitPerBlock),
            lastPageThisBlock: Math.ceil(pageData.total / pageData.size),
            pageLastNumber: Math.ceil(pageData.total / pageData.size),
        }
        if (pageData.total < (pageData.size * unitPerBlock)) _pageData.totalThisBlock = pageData.total;
        if (_pageData.offset === 1) _pageData.lastPageThisBlock = Math.ceil(_pageData.totalThisBlock / pageData.size);

        let array = [];
        for (let i = _pageData.offset; i <= _pageData.lastPageThisBlock; i++) {
            let object = {
                number: i
            };
            array.push(object);
        }
        setPageNumbers(array);
        setPageLastNumber(_pageData.pageLastNumber);
    };
    useMemo(makeTableBody, [bodyData]);
    useMemo(makePageNumbers, [pageData]);
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                {headerData.map((header, thIdx) => {
                    return <th key={`table-head-th-${thIdx}`}>{header}</th>;
                })}
            </tr>
            </thead>
            <tbody>
            {tableBody.map((values, trIdx) => {
                return (
                    <tr key={`table-body-tr-${trIdx}`}>
                        {values.map((value, tdIdx) => {
                            return <td key={`table-body-td-${tdIdx}`}>{value}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
            <tfoot>
            <tr>
                <td colSpan={3}>
                    <Pagination className={'justify-content-center'}>
                        <Pagination.Prev onClick={handleClickPaginationPrev} linkClassName={'text-dark'} />
                        {pageNumbers.map((item, itemIdx) => {
                            let className = 'text-dark';
                            if (item.number === pageData.page) className = 'text-light bg-dark';
                            return <Pagination.Item key={`page-item-${itemIdx}`}
                                                    linkClassName={className}
                                                    onClick={() => handleClickPaginationNum(item.number)}>{item.number}</Pagination.Item>;
                        })}
                        <Pagination.Next onClick={handleClickPaginationNext} linkClassName={'text-dark'} />
                    </Pagination>
                </td>
            </tr>
            </tfoot>
        </Table>
    );
};

export default CustomTable;