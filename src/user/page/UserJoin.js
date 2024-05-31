import {Button, Card, Col, Container, Form, InputGroup, Row, Stack} from "react-bootstrap";

const UserJoin = () => {
    return (
        <Container>
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Card className={'w-50'}>
                        <Card.Body>
                            <Card.Title className={'d-flex justify-content-center'}>
                                <div className={'h1 font-HakDotR'}>Join</div>
                            </Card.Title>
                            <Card.Text className={'mt-5'}>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>ID</Form.Label>
                                        <InputGroup>
                                            <Form.Control placeholder={'Enter your ID'} />
                                            <Button variant={'outline-dark'}>중복확인</Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className={'mt-3'}>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type={'password'} placeholder={'Enter your Password'} />
                                    </Form.Group>
                                    <Form.Group className={'mt-3'}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control placeholder={'Enter your Name'} />
                                    </Form.Group>
                                    <Form.Group className={'mt-3'}>
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control placeholder={'Enter your Phone'} />
                                    </Form.Group>
                                    <Form.Group className={'mt-3'}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control placeholder={'Enter your Email'} />
                                    </Form.Group>
                                    <Form.Group className={'mt-3'}>
                                        <Form.Label>Address</Form.Label>
                                        <InputGroup>
                                            <Form.Control placeholder={'Enter your Address'} />
                                            <Button variant={'outline-dark'}>검색</Button>
                                        </InputGroup>
                                        <Form.Control className={'mt-2'} placeholder={'Enter detail of Address'} />
                                    </Form.Group>
                                </Form>
                                <Stack className={'mt-5'}>
                                    <Button variant={'dark'}>Create account</Button>
                                </Stack>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserJoin;