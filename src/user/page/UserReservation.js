import {Button, Card, Col, Container, Form, Image, Row, Stack} from "react-bootstrap";

const UserReservation = () => {
    return (
        <Container>
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Card className={'w-50'}>
                        <Card.Header>
                            <div className={'h1 font-HakMulB'}>Checkout</div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className={'font-HakDotR'}>Movie Info.</Card.Title>
                            <Stack className={'mt-4'} direction={'horizontal'} gap={3}>
                                <Image src={'https://cdn.pixabay.com/photo/2022/11/17/22/49/city-7599045_1280.jpg'} height={200} />
                                <Stack>
                                    <div className={'h3'}>Last City</div>
                                    <Stack className={'justify-content-end'}>
                                        <div>연령: 12</div>
                                        <div>감독: Benedict Benjamin</div>
                                        <div>장르: SF</div>
                                        <div>시간: 120m</div>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <hr/>
                            <Card.Title className={'font-HakDotR'}>Options</Card.Title>
                            <Form className={'mt-4'}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>영화관</Form.Label>
                                    <Col>
                                        <Form.Select>
                                            <option>전체</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group className={'mt-3'} as={Row}>
                                    <Form.Label column sm={3}>상영관</Form.Label>
                                    <Col>
                                        <Form.Select>
                                            <option>전체</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group className={'mt-3'} as={Row}>
                                    <Form.Label column sm={3}>시작시간</Form.Label>
                                    <Col>
                                        <Form.Select>
                                            <option>전체</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group className={'mt-3'} as={Row}>
                                    <Form.Label column sm={3}>좌석</Form.Label>
                                    <Col>
                                        <Form.Select>
                                            <option>전체</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Form>
                            <hr/>
                            <Card.Title className={'font-HakDotR'}>Total</Card.Title>
                            <Stack className={'justify-content-between'} direction={'horizontal'}>
                                <div>Amount</div>
                                <div className={'h2'}>14,000</div>
                            </Stack>
                            <hr/>
                            <Stack>
                                <Button variant={'dark'}>
                                    <div className={'h3'}>Payment</div>
                                </Button>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserReservation;