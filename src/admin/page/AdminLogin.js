import {Button, Card, Col, Container, Form, Row, Stack} from "react-bootstrap";

const AdminLogin = () => {
    return (
        <Container className={'font-TAEBAEK'}>
            <Row className={'mt-5'}>
                <Col md={7}>
                    <Card>
                        <Card.Img src={'https://cdn.pixabay.com/photo/2018/05/09/17/38/gears-3385696_1280.jpg'} />
                    </Card>
                </Col>
                <Col className={'d-flex flex-column'} md={5}>
                    <Stack>
                        <div className={'font-HakMulB'} style={{ fontSize: 60 }}>LOGIN PAGE</div>
                        <div>Please put your ID and PASSWORD.</div>
                    </Stack>
                    <Stack className={'justify-content-end'}>
                        <Form>
                            <Form.Group>
                                <Form.Label>ID</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group className={'mt-3'}>
                                <Form.Label>PASSWORD</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Form>
                        <Button className={'mt-5'} variant={'dark'}>
                            <div className={'h3 m-0 fw-bold'}>Try It</div>
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLogin;