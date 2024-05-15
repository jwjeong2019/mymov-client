import {Badge, Button, Card, Col, Container, Nav, Row, Stack} from "react-bootstrap";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

const UserMovies = () => {
    return (
        <Container>
            <Row className={'mt-4'}>
                <Col>
                    <Stack>
                        <p className={'font-HakMulB'} style={{ fontSize: 60 }}>MOVIES</p>
                        <p style={{ fontSize: 40 }}>Welcome. You can check out a variety of movies here. Choose the movie you want and watch it!</p>
                    </Stack>
                </Col>
                <Col>
                    <Card>
                        <Card.Img src={'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg'} />
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
                            <Nav.Link className={'text-dark'} eventKey={'FAMILY'}>Family</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={'text-dark'} eventKey={'SF'}>SF</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col>
                    <Card>
                        <Card.Img
                            variant={'top'}
                            src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'}
                            height={300}
                        />
                        <Card.Body>
                            <Card.Title className={'fw-bold'}>
                                <Stack direction={'horizontal'} gap={2}>
                                    <Badge bg={'success'}>ALL</Badge>
                                    <div>Last City</div>
                                </Stack>
                            </Card.Title>
                            <Card.Text>
                                <div>Genre: SF</div>
                                <div>Director: Benedict Benjamin</div>
                                <div>Released: 2024-04-11</div>
                                <div>Duration: 120m</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img
                            variant={'top'}
                            src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'}
                            height={300}
                        />
                        <Card.Body>
                            <Card.Title className={'fw-bold'}>
                                <Stack direction={'horizontal'} gap={2}>
                                    <Badge>12</Badge>
                                    <div>Last City</div>
                                </Stack>
                            </Card.Title>
                            <Card.Text>
                                <div>Genre: SF</div>
                                <div>Director: Benedict Benjamin</div>
                                <div>Released: 2024-04-11</div>
                                <div>Duration: 120m</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img
                            variant={'top'}
                            src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'}
                            height={300}
                        />
                        <Card.Body>
                            <Card.Title className={'fw-bold'}>
                                <Stack direction={'horizontal'} gap={2}>
                                    <Badge bg={'warning'}>15</Badge>
                                    <div>Last City</div>
                                </Stack>
                            </Card.Title>
                            <Card.Text>
                                <div>Genre: SF</div>
                                <div>Director: Benedict Benjamin</div>
                                <div>Released: 2024-04-11</div>
                                <div>Duration: 120m</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col>
                    <Card>
                        <Card.Img
                            variant={'top'}
                            src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'}
                            height={300}
                        />
                        <Card.Body>
                            <Card.Title className={'fw-bold'}>
                                <Stack direction={'horizontal'} gap={2}>
                                    <Badge bg={'danger'}>18</Badge>
                                    <div>Last City</div>
                                </Stack>
                            </Card.Title>
                            <Card.Text>
                                <div>Genre: SF</div>
                                <div>Director: Benedict Benjamin</div>
                                <div>Released: 2024-04-11</div>
                                <div>Duration: 120m</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img
                            variant={'top'}
                            src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'}
                            height={300}
                        />
                        <Card.Body>
                            <Card.Title className={'fw-bold'}>
                                <Stack direction={'horizontal'} gap={2}>
                                    <Badge>12</Badge>
                                    <div>Last City</div>
                                </Stack>
                            </Card.Title>
                            <Card.Text>
                                <div>Genre: SF</div>
                                <div>Director: Benedict Benjamin</div>
                                <div>Released: 2024-04-11</div>
                                <div>Duration: 120m</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img
                            variant={'top'}
                            src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'}
                            height={300}
                        />
                        <Card.Body>
                            <Card.Title className={'fw-bold'}>
                                <Stack direction={'horizontal'} gap={2}>
                                    <Badge>12</Badge>
                                    <div>Last City</div>
                                </Stack>
                            </Card.Title>
                            <Card.Text>
                                <div>Genre: SF</div>
                                <div>Director: Benedict Benjamin</div>
                                <div>Released: 2024-04-11</div>
                                <div>Duration: 120m</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Stack direction={'horizontal'} gap={4}>
                        <Button variant={'outline-dark'}>
                            <Stack direction={'horizontal'} gap={2}>
                                <IoIosArrowBack />
                                <div>Prev</div>
                            </Stack>
                        </Button>
                        <Button variant={'outline-dark'}>
                            <Stack direction={'horizontal'} gap={2}>
                                <div>Next</div>
                                <IoIosArrowForward />
                            </Stack>
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default UserMovies;