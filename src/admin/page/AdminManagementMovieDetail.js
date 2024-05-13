import {Button, Card, Col, Container, Form, Image, Row, Stack} from "react-bootstrap";

const AdminManagementMovieDetail = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Details</Card.Title>
                            <Container className={'mt-4'} fluid>
                                <Row>
                                    <Col md={3}>
                                        <Image className={'w-100'} src={'https://cdn.pixabay.com/photo/2024/05/05/05/55/goose-8740266_1280.jpg'} />
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>제목</Form.Label>
                                                <Form.Control readOnly plaintext value={'해리포터와 마법사의 창'} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>연령</Form.Label>
                                                <Form.Control readOnly plaintext value={'12'} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>감독</Form.Label>
                                                <Form.Control readOnly plaintext value={'토마스 카일릿'} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>설명</Form.Label>
                                                <Form.Control as={'textarea'} readOnly plaintext value={'해리포터의 모험이 시작된다!'} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>시간</Form.Label>
                                                <Form.Control type={'time'} readOnly plaintext value={'12:33'} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>개봉일</Form.Label>
                                                <Form.Control type={'date'} readOnly plaintext value={'2024-04-10'} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>상영일</Form.Label>
                                                <Form.Control type={'date'} readOnly plaintext value={'2024-04-10'} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col md={4}>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>장르</Form.Label>
                                                <Form.Select disabled>
                                                    <option value={0}>All</option>
                                                    <option value={1}>Family</option>
                                                    <option value={2}>Action</option>
                                                    <option value={3}>SF</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form hidden={true}>
                                            <Form.Group as={Row}>
                                                <Form.Label>첨부파일</Form.Label>
                                                <Col>
                                                    <Form.Control />
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label className={'btn btn-outline-dark'} htmlFor={'file'}>파일찾기</Form.Label>
                                                        <Form.Control type={'file'} id={'file'} accept={'image/*'} hidden />
                                                    </Form.Group>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Stack className={'justify-content-end'} direction={'horizontal'} gap={2}>
                                            <Button variant={'dark'}>수정</Button>
                                            <Button variant={'danger'}>삭제</Button>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminManagementMovieDetail;