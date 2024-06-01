import {Badge, Button, Col, Container, Image, Pagination, Row} from "react-bootstrap";
import {useMemo, useState} from "react";

const CustomTimeTable = ({ data, pageData, onClickPage }) => {
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
    useMemo(makePageNumbers, [pageData]);
    return (
        <>
            {data?.map((item, itemIdx) => {
                return (
                    <Row key={`row-item-${itemIdx}`} className={'mt-4'}>
                        <Col md={3}>
                            <Image className={'w-100'} height={150} src={item.image.url} />
                        </Col>
                        <Col>
                            <Row className={'h5 fw-bold'}>
                                {item.headers.map((header, headerIdx) => {
                                    return <Col key={`col-header-${headerIdx}`}>{header}</Col>;
                                })}
                            </Row>
                            <Row className={'mt-3'}>
                                {item.contents.map((content, contentIdx) => {
                                    return <Col key={`col-content-${contentIdx}`}>{content}</Col>;
                                })}
                            </Row>
                        </Col>
                    </Row>
                );
            })}
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Pagination>
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
                </Col>
            </Row>
        </>
    );
};

export default CustomTimeTable;