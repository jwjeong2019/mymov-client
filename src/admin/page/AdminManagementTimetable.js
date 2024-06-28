import {
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    InputGroup, Modal, Pagination,
    Row,
    Stack,
    Table
} from "react-bootstrap";
import {IoIosSearch} from "react-icons/io";
import {useMemo, useState} from "react";
import apiAdmin from "../../api/apiAdmin";
import {Utils} from "../../utils/Utils";
import apiTimetable from "../../api/apiTimetable";
import CustomTable from "../component/CustomTable";
import apiMovie from "../../api/apiMovie";
import apiCinema from "../../api/apiCinema";
import {StorageUtils} from "../../utils/StorageUtil";

const AdminManagementTimetable = () => {
    const [isShow, setIsShow] = useState(false);
    const [optionsMovie, setOptionsMovie] = useState([]);
    const [optionsCinema, setOptionsCinema] = useState([]);
    const [optionsTheater, setOptionsTheater] = useState([]);
    const [modalInputs, setModalInputs] = useState({});
    const [searchData, setSearchData] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
    const [timetables, setTimetables] = useState([]);
    const [tablePage, setTablePage] = useState({});
    const [filters, setFilters] = useState([]);
    const [sorts, setSorts] = useState([]);
    const [currentFilter, setCurrentFilter] = useState({});
    const [currentSort, setCurrentSort] = useState({});
    const handleClickRegister = () => setIsShow(true);
    const handleClickModalClose = () => setIsShow(false);
    const handleClickModalComplete = () => createTimetable();
    const handleChangeModalInputsMovie = e => setModalInputs(prevState => ({ ...prevState, movieId: e.target.value }));
    const handleChangeModalInputsCinema = e => {
        const cinema = JSON.parse(e.target.value);
        setModalInputs(prevState => ({ ...prevState, cinemaId: cinema.id }));
        const _theaters = cinema.theaters.map(theater => ({
            id: theater.id,
            title: theater.number
        }))
        setOptionsTheater(_theaters);
    };
    const handleChangeModalInputsTheater = e => setModalInputs(prevState => ({ ...prevState, theaterId: e.target.value }));
    const handleChangeModalInputsStartDate = e => setModalInputs(prevState => ({ ...prevState, startDate: e.target.value }));
    const handleChangeModalInputsEndDate = e => setModalInputs(prevState => ({ ...prevState, endDate: e.target.value }));
    const handleChangeModalInputsStartTime = e => setModalInputs(prevState => ({ ...prevState, startTime: e.target.value }));
    const handleChangeModalInputsEndTime = e => setModalInputs(prevState => ({ ...prevState, endTime: e.target.value }));
    const handleClickDelete = e => {
        const isOk = window.confirm('삭제 하시겠습니까?');
        if (isOk) deleteTimetable(e.target.value);
    };
    const handleClickTablePage = number => getTimetables(number);
    const handleChangeSearchDataKeyword = e => setSearchData(prevState => ({ ...prevState, keyword: e.target.value }));
    const handleChangeSearchDataFilter = filter => {
        setSearchData(prevState => ({...prevState, filter: filter.value}));
        setCurrentFilter(filter);
    };
    const handleChangeSearchDataSort = sort => {
        const _nextSearchData = { ...searchData, sort: sort.value };
        setSearchData(_nextSearchData);
        setCurrentSort(sort);
        getTimetables(tablePage.page, _nextSearchData);
    };
    const handleClickSearch = () => getTimetables(1, searchData);
    const getMovies = () => {
        const _params = {
            page: 0,
            size: 1000,
        };
        apiMovie.getList(_params)
            .then(response => {
                const { data } = response;
                const _movies = data.result.content.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                }));
                setOptionsMovie(_movies);
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
                const _options = data.result.map(cinema => ({
                    id: cinema.id,
                    value: cinema.id,
                    title: cinema.name,
                    theaters: cinema.theaters,
                }));
                setOptionsCinema(_options);
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const createTimetable = () => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            cinemaId: modalInputs.cinemaId,
            theaterId: modalInputs.theaterId,
            movieId: modalInputs.movieId,
            startDate: modalInputs.startDate,
            endDate: modalInputs.endDate,
            startTime: `${modalInputs.startTime}:00`,
            endTime: `${modalInputs.endTime}:00`,
        };
        apiAdmin.createTimetable(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`상영표 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('must', data.msg)) return alert(`상영표 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert(`상영표를 정상적으로 등록하였습니다.`);
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const getTimetables = (page, search) => {
        const _params = {
            page: page - 1,
            size: 10,
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            keyword: search?.keyword,
            keywordField: search?.filter,
            sortField: search?.sort,
            sortType: 'DESC'
        };
        apiTimetable.getList(_params)
            .then(response => {
                const { data } = response;
                const _timetables = data.result.content.map(timetable => ({
                    id: timetable.id,
                    movieTitle: timetable.movie.title,
                    age: timetable.movie.age < 12 ? '전체' : timetable.movie.age,
                    theaterNumber: `${timetable.theater.number}상영관`,
                    cinemaName: timetable.cinema.name,
                    cinemaRegions: timetable.cinema.region,
                    startTime: timetable.startTime.slice(0, 5),
                    endTime: timetable.endTime.slice(0, 5),
                    button: <Button variant={'danger'}
                                    value={timetable.id}
                                    onClick={handleClickDelete}>삭제</Button>,
                }));
                setTimetables(_timetables)
                setTablePage(prevState => ({
                    ...prevState,
                    page,
                    size: 10,
                    total: data.result.totalElements ?? 0
                }));
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const deleteTimetable = id => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            id,
        };
        apiAdmin.deleteTimetable(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`상영표 삭제 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('상영표를 정상적으로 삭제하였습니다.');
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const makeTableHeaders = () => {
        setTableHeaders([ '#', '영화명', '연령', '상영관', '영화관', '지역', '시작시간', '종료시간', '삭제' ]);
    };
    const makeFilters = () => {
        setFilters([
            { title: '전체' },
            { value: 'MOVIE_TITLE', title: '영화명' },
            { value: 'CINEMA_NAME', title: '영화관' },
        ]);
    };
    const makeSorts = () => {
        setSorts([
            { title: '전체' },
            { value: 'cinema.name', title: '영화관순' },
            { value: 'movie.title', title: '영화명순' },
        ]);
    };
    const init = () => {
        if (!StorageUtils.isAuthorized()) {
            alert('로그인 후 이용이 가능합니다.');
            window.location.href='/admin/login';
            return;
        }
        makeTableHeaders();
        makeFilters();
        makeSorts();
        getMovies();
        getCinemas();
        getTimetables(1);
    };
    useMemo(init, []);
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Conditions</Card.Title>
                                <Stack direction={'horizontal'} gap={3}>
                                    <DropdownButton variant={'outline-dark'} title={currentFilter.title ?? '전체'}>
                                        {filters.map((filter, filterIdx) => {
                                            return <Dropdown.Item key={`dropdown-item-filter-${filterIdx}`}
                                                                  onClick={() => handleChangeSearchDataFilter(filter)}>{filter.title}</Dropdown.Item>;
                                        })}
                                    </DropdownButton>
                                    <InputGroup>
                                        <Form.Control onChange={handleChangeSearchDataKeyword} />
                                        <Button variant={'dark'} onClick={handleClickSearch}>
                                            <IoIosSearch className={'h3 m-0'} />
                                        </Button>
                                    </InputGroup>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className={'mt-3'}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Result</Card.Title>
                                <Stack className={'justify-content-end'} direction={'horizontal'} gap={2}>
                                    <Button variant={'dark'} onClick={handleClickRegister}>등록</Button>
                                    <DropdownButton variant={'outline-dark'} title={currentSort.title ?? '전체'}>
                                        {sorts.map((sort, sortIdx) => {
                                            return <Dropdown.Item key={`dropdown-item-sort-${sortIdx}`}
                                                                  onClick={() => handleChangeSearchDataSort(sort)}>{sort.title}</Dropdown.Item>;
                                        })}
                                    </DropdownButton>
                                </Stack>
                                <Stack className={'mt-3'}>
                                    <CustomTable
                                        headerData={tableHeaders}
                                        bodyData={timetables}
                                        pageData={tablePage}
                                        onClickPage={handleClickTablePage}
                                    />
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal show={isShow}>
                <Modal.Header className={'bg-dark text-light'}>
                    <Modal.Title>상영표 등록하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>영화</Form.Label>
                            <Form.Select defaultValue={'ALL'} onChange={handleChangeModalInputsMovie}>
                                <option value={'ALL'}>전체</option>
                                {optionsMovie.map((option, optionIdx) => {
                                    return <option key={`option-movie-${optionIdx}`} value={option.id}>{option.title}</option>;
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>영화관</Form.Label>
                            <Form.Select defaultValue={'ALL'} onChange={handleChangeModalInputsCinema}>
                                <option value={'ALL'}>전체</option>
                                {optionsCinema.map((option, optionIdx) => {
                                    const optionValue = JSON.stringify(option);
                                    return <option key={`option-cinema-${optionIdx}`} value={optionValue}>{option.title}</option>;
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>상영관</Form.Label>
                            <Form.Select defaultValue={'ALL'} onChange={handleChangeModalInputsTheater}>
                                <option value={'ALL'}>전체</option>
                                {optionsTheater.map((option, optionIdx) => {
                                    return <option key={`option-theater-${optionIdx}`} value={option.id}>{option.title}상영관</option>;
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>상영시작일</Form.Label>
                            <Form.Control type={'date'} onChange={handleChangeModalInputsStartDate} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>상영종료일</Form.Label>
                            <Form.Control type={'date'} onChange={handleChangeModalInputsEndDate} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>시작시간</Form.Label>
                            <Form.Control type={'time'} onChange={handleChangeModalInputsStartTime} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>종료시간</Form.Label>
                            <Form.Control type={'time'} onChange={handleChangeModalInputsEndTime} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'dark'} onClick={handleClickModalComplete}>완료</Button>
                    <Button variant={'outline-dark'} onClick={handleClickModalClose}>닫기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminManagementTimetable;