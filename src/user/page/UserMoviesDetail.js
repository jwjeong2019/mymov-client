import {Button, Card, Col, Container, Form, Row, Stack} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {useMemo, useState} from "react";
import apiMovie from "../../api/apiMovie";

const UserMoviesDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const handleClickReservation = () => navigate('/reservation', {
        state: {
            movieId: movie.id
        }
    });
    const getMovie = () => {
        const _params = {
            ...params
        };
        apiMovie.getDetail(_params)
            .then(response => {
                const { data } = response;
                setMovie({
                    id: data.result.id,
                    title: data.result.title,
                    age: data.result.age < 12 ? '전체이용가' : `${data.result.age}세`,
                    director: data.result.director,
                    releaseDate: data.result.releaseDate.split('T')[0],
                    runningTime: `${data.result.runningTime}분`,
                    genres: makeGenres(data.result.genres),
                    detail: data.result.detail,
                    imageUrl: data.result.attachment,
                });
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const makeGenres = genres => genres.map(genre => genre.name).join(', ');
    const init = () => {
        getMovie();
    };
    useMemo(init, []);
    return (
        <Container>
            <Row className={'mt-5'}>
                <Col md={4}>
                    <Card>
                        <Card.Img src={movie.imageUrl} />
                    </Card>
                </Col>
                <Col>
                    <Stack gap={5}>
                        <Stack style={{ fontSize: 60 }}>
                            <p className={'font-HakDotR'}>{movie.title}</p>
                        </Stack>
                        <Stack className={'h5'}>
                            <p>Score: {movie.score} / 5</p>
                            <p>Genre: {movie.genres}</p>
                            <p>Age: {movie.age}</p>
                            <p>Director: {movie.director}</p>
                            <p>Duration: {movie.runningTime}</p>
                            <p>Released: {movie.releaseDate}</p>
                        </Stack>
                    </Stack>
                </Col>
            </Row>
            <Row className={'mt-5 h4'}>
                <Col>
                    <div className={'bg-secondary-subtle p-3'} style={{ borderLeft: '5px solid #ccc' }}>
                        {movie.detail}
                    </div>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Button className={'w-50'} variant={'dark'} onClick={handleClickReservation}>
                        <div className={'h3 m-0 font-HakDotR'}>예매하기</div>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UserMoviesDetail;