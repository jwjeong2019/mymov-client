import {
    Badge,
    Button,
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    Image,
    Pagination,
    Row,
    Stack
} from "react-bootstrap";

const UserTickets = () => {
    return (
        <Container>
            <Row className={'mt-4'}>
                <Col md={3}>
                    <Image className={'w-100'} src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'} />
                </Col>
                <Col>
                    <Row className={'h5 fw-bold'}>
                        <Col md={1}>#</Col>
                        <Col>제목</Col>
                        <Col>영화관</Col>
                        <Col>상영관</Col>
                        <Col>시작시간</Col>
                        <Col>좌석</Col>
                        <Col>상태</Col>
                    </Row>
                    <Row className={'mt-3'}>
                        <Col md={1}>1</Col>
                        <Col>Last City</Col>
                        <Col>강남점</Col>
                        <Col>1상영관</Col>
                        <Col>13:50</Col>
                        <Col>A12</Col>
                        <Col className={'h4'}>
                            <Badge bg={'primary'}>예매중</Badge>
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
                        <Col md={1}>#</Col>
                        <Col>제목</Col>
                        <Col>영화관</Col>
                        <Col>상영관</Col>
                        <Col>시작시간</Col>
                        <Col>좌석</Col>
                        <Col>상태</Col>
                    </Row>
                    <Row className={'mt-3'}>
                        <Col md={1}>1</Col>
                        <Col>Last City</Col>
                        <Col>강남점</Col>
                        <Col>1상영관</Col>
                        <Col>13:50</Col>
                        <Col>A12</Col>
                        <Col className={'h4'}>
                            <Badge bg={'secondary'}>예매취소</Badge>
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
                        <Col md={1}>#</Col>
                        <Col>제목</Col>
                        <Col>영화관</Col>
                        <Col>상영관</Col>
                        <Col>시작시간</Col>
                        <Col>좌석</Col>
                        <Col>상태</Col>
                    </Row>
                    <Row className={'mt-3'}>
                        <Col md={1}>1</Col>
                        <Col>Last City</Col>
                        <Col>강남점</Col>
                        <Col>1상영관</Col>
                        <Col>13:50</Col>
                        <Col>A12</Col>
                        <Col className={'h4'}>
                            <Badge bg={'success'}>예매완료</Badge>
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

export default UserTickets;