import {Button, Card, Col, Container, Form, InputGroup, Nav, Row, Stack} from "react-bootstrap";

const UserLogin = () => {
    return (
        <Container>
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Card className={'w-50'}>
                        <Card.Body>
                            <Card.Title className={'d-flex justify-content-center'}>
                                <div className={'h1 font-HakDotR'}>Login</div>
                            </Card.Title>
                            <Card.Text className={'mt-5'}>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control placeholder={'Enter your ID'} />
                                    </Form.Group>
                                    <Form.Group className={'mt-3'}>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type={'password'} placeholder={'Enter your Password'} />
                                    </Form.Group>
                                </Form>
                                <Stack className={'mt-5'} gap={2}>
                                    <Button variant={'dark'}>Log in</Button>
                                    <Stack className={'justify-content-center'} direction={'horizontal'} gap={2}>
                                        <div>Don't have an account?</div>
                                        <Nav.Link className={'fw-bold'} href={'/join'}>Join</Nav.Link>
                                    </Stack>
                                </Stack>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserLogin;