import {Button, Card, Col, Container, Form, Row, Stack} from "react-bootstrap";

const UserMoviesDetail = () => {
    return (
        <Container>
            <Row className={'mt-5'}>
                <Col md={4}>
                    <Card>
                        <Card.Img src={'https://cdn.pixabay.com/photo/2023/11/22/16/08/generated-ai-8405812_1280.jpg'} />
                    </Card>
                </Col>
                <Col>
                    <Stack gap={5}>
                        <Stack style={{ fontSize: 60 }}>
                            <p className={'font-HakDotR'}>Last City</p>
                        </Stack>
                        <Stack className={'h5'}>
                            <p>Score: 4.5 / 5</p>
                            <p>Genre: SF</p>
                            <p>Age: 12</p>
                            <p>Director: Benedict Benjamin</p>
                            <p>Duration: 120m</p>
                            <p>Released: 2024-04-10</p>
                        </Stack>
                    </Stack>
                </Col>
            </Row>
            <Row className={'mt-5 h4'}>
                <Col>
                    <div className={'bg-secondary-subtle p-3'} style={{ borderLeft: '5px solid #ccc' }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Button className={'w-50'} variant={'dark'}>
                        <div className={'h3 m-0 font-HakDotR'}>RESERVE</div>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UserMoviesDetail;