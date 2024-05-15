import {
    Badge,
    Button,
    Card,
    Col,
    Container, Dropdown,
    DropdownButton,
    DropdownItem, Form,
    Image,
    Nav,
    Pagination,
    Row,
    Stack
} from "react-bootstrap";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

const UserTimetable = () => {
    return (
        <Container>
            <Row className={'mt-4'}>
                <Col>
                    <Stack>
                        <p className={'font-HakMulB'} style={{ fontSize: 60 }}>TIMETABLE</p>
                        <p style={{ fontSize: 40 }}>Welcome. You can check out which movies are currently playing in theaters here. Watch any movie you want!</p>
                    </Stack>
                </Col>
                <Col>
                    <Card>
                        <Card.Img src={'https://cdn.pixabay.com/photo/2016/12/29/04/57/airport-1937761_1280.jpg'} />
                    </Card>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col>
                    <Nav className={'h2'} variant={'underline'} defaultActiveKey={'ALL'}>
                        <Nav.Item>
                            <Nav.Link className={'text-dark'} eventKey={'ALL'}>All</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={'text-dark'} eventKey={1}>강남점</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={'text-dark'} eventKey={2}>홍대점</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={'text-dark'} eventKey={3}>영등포점</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={'text-dark'} eventKey={4}>용인점</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col md={3}>
                    <Image className={'w-100'} src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'} />
                </Col>
                <Col>
                    <Row className={'h5 fw-bold'}>
                        <Col>제목</Col>
                        <Col>연령</Col>
                        <Col>감독</Col>
                        <Col>장르</Col>
                        <Col>영화시간</Col>
                        <Col>영화관</Col>
                        <Col>상영관</Col>
                        <Col>시작시간</Col>
                        <Col>예매하기</Col>
                    </Row>
                    <Row className={'mt-3'}>
                        <Col>Last City</Col>
                        <Col className={'h4'}><Badge>12</Badge></Col>
                        <Col>Benedict Benjamin</Col>
                        <Col>SF</Col>
                        <Col>120m</Col>
                        <Col>강남점</Col>
                        <Col>1상영관</Col>
                        <Col>13:50</Col>
                        <Col>
                            <Button variant={'dark'}>예매하기</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={'mt-4'}>
                <Col md={3}>
                    <Image className={'w-100'} src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'} />
                </Col>
                <Col>
                    <Row className={'h5 fw-bold'}>
                        <Col>제목</Col>
                        <Col>연령</Col>
                        <Col>감독</Col>
                        <Col>장르</Col>
                        <Col>영화시간</Col>
                        <Col>영화관</Col>
                        <Col>상영관</Col>
                        <Col>시작시간</Col>
                        <Col>예매하기</Col>
                    </Row>
                    <Row className={'mt-3'}>
                        <Col>Last City</Col>
                        <Col className={'h4'}><Badge bg={'warning'}>15</Badge></Col>
                        <Col>Benedict Benjamin</Col>
                        <Col>SF</Col>
                        <Col>120m</Col>
                        <Col>강남점</Col>
                        <Col>1상영관</Col>
                        <Col>13:50</Col>
                        <Col>
                            <Button variant={'dark'}>예매하기</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={'mt-4'}>
                <Col md={3}>
                    <Image className={'w-100'} src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'} />
                </Col>
                <Col>
                    <Row className={'h5 fw-bold'}>
                        <Col>제목</Col>
                        <Col>연령</Col>
                        <Col>감독</Col>
                        <Col>장르</Col>
                        <Col>영화시간</Col>
                        <Col>영화관</Col>
                        <Col>상영관</Col>
                        <Col>시작시간</Col>
                        <Col>예매하기</Col>
                    </Row>
                    <Row className={'mt-3'}>
                        <Col>Last City</Col>
                        <Col className={'h4'}><Badge bg={'danger'}>18</Badge></Col>
                        <Col>Benedict Benjamin</Col>
                        <Col>SF</Col>
                        <Col>120m</Col>
                        <Col>강남점</Col>
                        <Col>1상영관</Col>
                        <Col>13:50</Col>
                        <Col>
                            <Button variant={'dark'}>예매하기</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Pagination>
                        <Pagination.Prev linkClassName={'text-dark'} />
                        <Pagination.Item linkClassName={'bg-dark text-light'}>1</Pagination.Item>
                        <Pagination.Item linkClassName={'text-dark'}>2</Pagination.Item>
                        <Pagination.Next linkClassName={'text-dark'} />
                    </Pagination>
                </Col>
            </Row>
            <Row className={'mt-3'}>
                <Col className={'d-flex justify-content-center'}>
                    <Stack className={'w-50'} direction={'horizontal'} gap={3}>
                        <DropdownButton variant={'outline-dark'} title={'전체'}>
                            <Dropdown.Item>제목</Dropdown.Item>
                            <Dropdown.Item>영화관</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control />
                        <Button variant={'dark'}>Search</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default UserTimetable;