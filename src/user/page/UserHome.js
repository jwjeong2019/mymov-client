import {Badge, Button, Card, Col, Container, Image, Row, Stack} from "react-bootstrap";
import {useMemo, useState} from "react";
import apiMovie from "../../api/apiMovie";
import {useNavigate} from "react-router";

const UserHome = () => {
    const titleStyle = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0),  rgba(255, 255, 255, 1)), url("https://cdn.pixabay.com/photo/2022/06/20/14/20/space-7273891_1280.jpg")'
    };
    const navigate = useNavigate();
    const [popularMovies, setPopularMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const handleClickShowMore = () => navigate('/movies');
    const getPopularMovies = () => {
        const _params = {};
        const apiResult = [
            { id: 0, title: 'Last hope', score: 4.8, img: 'https://cdn.pixabay.com/photo/2024/05/09/16/35/ai-generated-8751441_1280.png' },
            { id: 1, title: 'Last hope', score: 4.8, img: 'https://cdn.pixabay.com/photo/2024/05/09/16/35/ai-generated-8751441_1280.png' },
            { id: 2, title: 'Last hope', score: 4.8, img: 'https://cdn.pixabay.com/photo/2024/05/09/16/35/ai-generated-8751441_1280.png' },
        ];
        setPopularMovies(apiResult);
    };
    const getReleasedMovies = () => {
        const _params = {};
        const apiResult = [
            { id: 0, title: 'Last One', score: 3.8, img: 'https://cdn.pixabay.com/photo/2023/09/06/08/50/tornado-8236696_1280.jpg' },
            { id: 1, title: 'Last One', score: 3.8, img: 'https://cdn.pixabay.com/photo/2023/09/06/08/50/tornado-8236696_1280.jpg' },
            { id: 2, title: 'Last One', score: 3.8, img: 'https://cdn.pixabay.com/photo/2023/09/06/08/50/tornado-8236696_1280.jpg' },
        ];
        setReleasedMovies(apiResult);
    };
    const init = () => {
        getPopularMovies();
        getReleasedMovies();
    };
    useMemo(init, []);
    return (
        <Container>
            <Row>
                <Col>
                    <Image className={'w-100'} src={'https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_1280.jpg'} />
                    <div className={'text-light position-absolute font-HakDotR w-75'} style={{ top: '50%', left: '10%' }}>
                        <Stack gap={3}>
                            <p className={'h2'}>You’ll have bad times, but it’ll always wake you up to the good stuff you weren’t paying attention to.</p>
                            <p className={'h4'}>-Good Will Hunting-</p>
                        </Stack>
                        <Stack className={'mt-5'} gap={3}>
                            <p className={'h2'}>Suddenly, time travel seems almost unnecessary, because every detail of life is so delightful.</p>
                            <p className={'h4'}>-About Time-</p>
                        </Stack>
                    </div>
                </Col>
            </Row>
            <Row className={'mt-5'} style={titleStyle}>
                <Col>
                    <div className={'font-HakMulB text-light'} style={{ fontSize: 60 }}>Popular List</div>
                </Col>
            </Row>
            <Row>
                {popularMovies.map(movie => {
                    return (
                        <Col md={3}>
                            <Card>
                                <Card.Img
                                    variant={'top'}
                                    src={movie.img}
                                    height={300}
                                />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text className={'h4'}>
                                        <Badge pill bg={'dark'}>{movie.score} / 5</Badge>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <Row className={'mt-5'} style={titleStyle}>
                <Col>
                    <div className={'font-HakMulB text-light'} style={{ fontSize: 60 }}>Released List</div>
                </Col>
            </Row>
            <Row>
                {releasedMovies.map(movie => {
                    return (
                        <Col md={3}>
                            <Card>
                                <Card.Img
                                    variant={'top'}
                                    src={movie.img}
                                    height={300}
                                />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text className={'h4'}>
                                        <Badge pill bg={'dark'}>{movie.score} / 5</Badge>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Button variant={'dark'} onClick={handleClickShowMore}>Show More</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UserHome;