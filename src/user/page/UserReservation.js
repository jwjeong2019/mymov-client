import {Button, Card, Col, Container, Form, Image, Row, Stack} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router";
import {useMemo, useState} from "react";
import apiMovie from "../../api/apiMovie";
import apiCinema from "../../api/apiCinema";
import apiTheater from "../../api/apiTheater";
import apiTimetable from "../../api/apiTimetable";
import apiMember from "../../api/apiMember";
import {Utils} from "../../utils/Utils";

const UserReservation = () => {
    const storageItemAuth = JSON.parse(localStorage.getItem('auth'));
    const location = useLocation();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [movie, setMovie] = useState({});
    const [cinemas, setCinemas] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [seats, setSeats] = useState([]);
    const [timetables, setTimetables] = useState([]);
    const [price, setPrice] = useState(14000);
    const handleChangeInputsCinema = e => {
        if (e.target.value !== 'ALL') {
            const cinema = JSON.parse(e.target.value);
            setInputs(prevState => ({ ...prevState, cinemaId: cinema.id }));
            const _nextTheaters = cinema.theaters.map(theater => ({
                value: theater.id,
                name: theater.number
            }));
            setTheaters(_nextTheaters);
            return;
        }
        setInputs(prevState => ({ ...prevState, cinemaId: undefined }));
    };
    const handleChangeInputsTheater = e => {
        const _theaterId = e.target.value;
        if (_theaterId !== 'ALL') {
            setInputs(prevState => ({ ...prevState, theaterId: _theaterId }));
            getTheater(_theaterId);
            getTimetables(_theaterId);
            return;
        }
        setInputs(prevState => ({ ...prevState, theaterId: undefined }));
    };
    const handleChangeInputsTimetableId = e => {
        const _timetableId = e.target.value;
        if (_timetableId !== 'ALL') {
            setInputs(prevState => ({ ...prevState, timetableId: _timetableId }));
            return;
        }
        setInputs(prevState => ({ ...prevState, timetableId: undefined }));
    };
    const handleChangeInputsSeat = e => {
        const _seatId = e.target.value;
        if (_seatId !== 'ALL') {
            setInputs(prevState => ({ ...prevState, seatId: _seatId }));
            return;
        }
        setInputs(prevState => ({ ...prevState, seatId: undefined }));
    };
    const handleClickPayment = () => createTicket();
    const getMovie = () => {
        const _params = {
            id: location.state.movieId
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
    const getTimetable = () => {
        const _params = {
            id: location.state.timetableId
        };
        apiTimetable.getDetail(_params)
            .then(response => {
                const { data } = response;
                const timetable = data.result;
                setInputs({
                    timetableId: timetable.id,
                    cinema: {
                        id: timetable.cinema.id,
                        name: timetable.cinema.name
                    },
                    theater: {
                        id: timetable.theater.id,
                        name: timetable.theater.number
                    },
                    startTime: timetable.startTime
                });
                getTheater(timetable.theater.id);
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const getCinemas = () => {
        apiCinema.getList()
            .then(response => {
                const { data } = response;
                const _cinemas = data.result.map(cinema => ({
                    id: cinema.id,
                    name: cinema.name,
                    theaters: cinema.theaters,
                }));
                setCinemas(_cinemas);
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const getTheater = (id) => {
        const _params = {
            id,
        };
        apiTheater.getDetail(_params)
            .then(response => {
                const { data } = response;
                const _seats = data.result.seats
                    .filter(seat => seat.status === 'EMPTY')
                    .map(seat => ({
                        value: seat.id,
                        name: seat.position
                    }));
                setSeats(_seats);
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const getTimetables = (theaterId) => {
        const _params = {
            movieId: movie.id,
            cinemaId: inputs.cinemaId,
            theaterId,
        };
        apiTimetable.getListByIds(_params)
            .then(response => {
                const { data } = response;
                const _timetables = data.result.map(timetable => ({
                    value: timetable.id,
                    name: timetable.startTime,
                }));
                setTimetables(_timetables);
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const createTicket = () => {
        const _params = {
            grantType: storageItemAuth.grantType,
            accessToken: storageItemAuth.accessToken,
            timetableId: inputs.timetableId,
            seatId: inputs.seatId,
            price,
        };
        apiMember.createTicket(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`예매 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`예매 실패:\n${data.msg}`);
                alert('정상적으로 예매를 완료하였습니다.')
                navigate(-1);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    const init = () => {
        if (location.state.timetableId) getTimetable();
        getMovie();
        getCinemas();
    };
    useMemo(init, []);
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
                                <Image src={movie.imageUrl} height={200} />
                                <Stack>
                                    <div className={'h3'}>{movie.title}</div>
                                    <Stack className={'justify-content-end'}>
                                        <div>연령: {movie.age}</div>
                                        <div>감독: {movie.director}</div>
                                        <div>장르: {movie.genres}</div>
                                        <div>시간: {movie.runningTime}</div>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <hr/>
                            <Card.Title className={'font-HakDotR'}>Options</Card.Title>
                            <Form className={'mt-4'}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>영화관</Form.Label>
                                    <Col>
                                        {inputs.cinema ?
                                            <Form.Select disabled>
                                                <option>{inputs.cinema.name}</option>
                                            </Form.Select>
                                            :
                                            <Form.Select defaultValue={'ALL'} onChange={handleChangeInputsCinema}>
                                                <option value={'ALL'}>전체</option>
                                                {cinemas.map((cinema, cinemaIdx) => {
                                                    const valueCinema = JSON.stringify(cinema);
                                                    return <option key={`option-cinema-${cinemaIdx}`} value={valueCinema}>{cinema.name}</option>
                                                })}
                                            </Form.Select>
                                        }
                                    </Col>
                                </Form.Group>
                                <Form.Group className={'mt-3'} as={Row}>
                                    <Form.Label column sm={3}>상영관</Form.Label>
                                    <Col>
                                        {inputs.theater ?
                                            <Form.Select disabled>
                                                <option>{inputs.theater.name}상영관</option>
                                            </Form.Select>
                                            :
                                            <Form.Select defaultValue={'ALL'} onChange={handleChangeInputsTheater}>
                                                <option value={'ALL'}>전체</option>
                                                {theaters.map((theater, theaterIdx) => {
                                                    return <option key={`option-theater-${theaterIdx}`} value={theater.value}>{theater.name}상영관</option>
                                                })}
                                            </Form.Select>
                                        }
                                    </Col>
                                </Form.Group>
                                <Form.Group className={'mt-3'} as={Row}>
                                    <Form.Label column sm={3}>시작시간</Form.Label>
                                    <Col>
                                        {inputs.startTime ?
                                            <Form.Select disabled>
                                                <option>{inputs.startTime}</option>
                                            </Form.Select>
                                            :
                                            <Form.Select defaultValue={'ALL'} onChange={handleChangeInputsTimetableId}>
                                                <option value={'ALL'}>전체</option>
                                                {timetables.map((timetable, timetableIdx) => {
                                                    return <option key={`option-timetable-${timetableIdx}`} value={timetable.value}>{timetable.name}</option>
                                                })}
                                            </Form.Select>
                                        }
                                    </Col>
                                </Form.Group>
                                <Form.Group className={'mt-3'} as={Row}>
                                    <Form.Label column sm={3}>좌석</Form.Label>
                                    <Col>
                                        <Form.Select defaultValue={'ALL'} onChange={handleChangeInputsSeat}>
                                            <option value={'ALL'}>전체</option>
                                            {seats.map((seat, seatIdx) => {
                                                return <option key={`option-seat-${seatIdx}`} value={seat.value}>{seat.name}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Form>
                            <hr/>
                            <Card.Title className={'font-HakDotR'}>Total</Card.Title>
                            <Stack className={'justify-content-between'} direction={'horizontal'}>
                                <div>Amount</div>
                                <div className={'h2'}>{price}</div>
                            </Stack>
                            <hr/>
                            <Stack>
                                <Button variant={'dark'} onClick={handleClickPayment}>
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