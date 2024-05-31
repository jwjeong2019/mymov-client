import {Badge, Button, Card, Col, Container, Row, Stack} from "react-bootstrap";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useMemo, useState} from "react";

const CustomCardTable = ({ data, onClickRecord, onClickPrev, onClickNext }) => {
    const [totalRecord, setTotalRecord] = useState([]);
    const makeRecords = () => {
        if (data && data.length > 0) {
            let _cols = [];
            let _rows = [];
            data.forEach((values, valuesIdx) => {
                const number = valuesIdx + 1;
                _cols.push(values);
                if (number % 3 === 0) {
                    _rows.push(_cols);
                    _cols = [];
                }
                if (number === data.length) _rows.push(_cols);
            });
            setTotalRecord(_rows);
        }
    };
    useMemo(makeRecords, [data]);
    return (
        <>
            {totalRecord.map((records, recordsIdx) => {
                return (
                    <Row key={`row-record-${recordsIdx}`} className={'mt-4'}>
                        {records.map((record, itemIdx) => {
                            return (
                                <Col key={`col-item-${itemIdx}`} md={4}>
                                    <Card onClick={() => onClickRecord(record.id)}>
                                        {record.image &&
                                        <Card.Img
                                            variant={'top'}
                                            src={record.image.url}
                                            height={300}
                                        />
                                        }
                                        <Card.Body>
                                            {record.title &&
                                            <Card.Title className={'fw-bold'}>
                                                <Stack direction={'horizontal'} gap={2}>
                                                    {record.title.badge && <Badge bg={record.title.badge.bg}>{record.title.badge.value}</Badge>}
                                                    <div>{record.title.title}</div>
                                                </Stack>
                                            </Card.Title>
                                            }
                                            {record.contents &&
                                            <Card.Text>
                                                {record.contents.map((content, contentIdx) => {
                                                    return <div key={`content-${contentIdx}`}>{content.title}: {content.detail}</div>
                                                })}
                                            </Card.Text>
                                            }
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                );
            })}
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Stack direction={'horizontal'} gap={4}>
                        <Button variant={'outline-dark'} onClick={onClickPrev}>
                            <Stack direction={'horizontal'} gap={2}>
                                <IoIosArrowBack />
                                <div>Prev</div>
                            </Stack>
                        </Button>
                        <Button variant={'outline-dark'} onClick={onClickNext}>
                            <Stack direction={'horizontal'} gap={2}>
                                <div>Next</div>
                                <IoIosArrowForward />
                            </Stack>
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </>
    );
};

export default CustomCardTable;