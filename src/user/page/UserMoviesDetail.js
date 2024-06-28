import {Button, Card, Col, Container, Form, FormCheck, Row, Stack} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {useMemo, useState} from "react";
import apiMovie from "../../api/apiMovie";
import apiMember from "../../api/apiMember";
import {Utils} from "../../utils/Utils";
import CustomRadio from "../component/CustomRadio";
import {StorageUtils} from "../../utils/StorageUtil";

const UserMoviesDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [radios, setRadios] = useState([]);
    const [inputs, setInputs] = useState({});
    const handleClickReservation = () => {
        if (!StorageUtils.isAuthorized()) {
            alert('로그인 후 이용이 가능합니다.');
            return navigate('/login');
        }
        navigate('/reservation', {
            state: {
                movieId: movie.id
            }
        });
    };
    const handleChangeScore = e => setInputs(prevState => ({ ...prevState, score: e.target.value }));
    const handleClickReview = () => createReview();
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
                    score: data.result.score,
                    imageUrl: data.result.attachment.path,
                });
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const makeGenres = genres => genres.map(genre => genre.name).join(', ');
    const createReview = () => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            movieId: movie.id,
            ...inputs,
        };
        apiMember.createReview(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`리뷰 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`리뷰 실패:\n${data.msg}`);
                alert('정상적으로 리뷰를 완료하였습니다.');
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const makeRadios = () => {
        setRadios([
            { value: 1, label: '1점' },
            { value: 2, label: '2점' },
            { value: 3, label: '3점' },
            { value: 4, label: '4점' },
            { value: 5, label: '5점' },
        ]);
    };
    const init = () => {
        makeRadios();
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
            <Row className={'mt-5'}>
                <Col>
                    <hr/>
                    <Row>
                        <Col md={10}>
                            <Stack className={'h3 m-0'} direction={'horizontal'} gap={5}>
                                <div>이 영화에 대한 나의 평가?</div>
                                <Form onChange={handleChangeScore}>
                                    <Stack direction={'horizontal'} gap={5}>
                                        <CustomRadio data={radios} selectedValue={inputs.score} />
                                    </Stack>
                                </Form>
                            </Stack>
                        </Col>
                        <Col className={'d-flex justify-content-end'}>
                            <Button variant={'dark'} onClick={handleClickReview}>평가하기</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default UserMoviesDetail;