import {
    Badge,
    Button,
    Card,
    Col,
    Container, Dropdown,
    DropdownButton,
    DropdownItem, Form,
    Image,
    Nav,
    Pagination,
    Row,
    Stack
} from "react-bootstrap";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useMemo, useState} from "react";
import apiCinema from "../../api/apiCinema";
import apiTimetable from "../../api/apiTimetable";
import CustomTimeTable from "../component/CustomTimeTable";
import {useNavigate} from "react-router";

const UserTimetable = () => {
    const navigate = useNavigate();
    const [cinemas, setCinemas] = useState([]);
    const [timetables, setTimetables] = useState([]);
    const [tablePage, setTablePage] = useState({});
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState({});
    const [currentFilter, setCurrentFilter] = useState({});
    const handleClickNavLinkCinema = e => {
        const cinemaName = e.target.dataset.rrUiEventKey;
        let _nextSearch = {};
        if (cinemaName !== 'ALL') _nextSearch = {
            ...search,
            keywordTab: cinemaName,
            filterTab: 'CINEMA_NAME'
        };
        getTimetables(1, _nextSearch);
        setSearch(_nextSearch);
    };
    const handleClickReservation = e => {
        const timetable = JSON.parse(e.target.value);
        navigate('/reservation', {
            state: {
                movieId: timetable.movie.id,
                timetableId: timetable.id
            }
        })
    };
    const handleClickTablePage = number => getTimetables(number);
    const handleChangeSearchKeyword = e => setSearch(prevState => ({...prevState, keyword: e.target.value }));
    const handleChangeSearchFilter = filter => {
        setSearch(prevState => ({...prevState, filter: filter.value}));
        setCurrentFilter(filter);
    };
    const handleClickSearch = () => getTimetables(1, search);
    const getCinemas = () => {
        apiCinema.getList()
            .then(response => {
                const { data } = response;
                const _cinemas = data.result.map(cinema => ({
                    value: cinema.name,
                    title: cinema.name,
                }));
                setCinemas(_cinemas);
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
            keyword: makeKeyword(search),
            keywordField: makeKeywordField(search),
        };
        apiTimetable.getList(_params)
            .then(response => {
                const { data } = response;
                const _timetables = data.result.content.map(timetable => ({
                    id: timetable.id,
                    image: {
                        url: timetable.movie.attachment
                    },
                    headers: [ '제목', '연령', '감독', '장르', '영화시간', '영화관', '상영관', '시작시간', '예매하기' ],
                    contents: [
                        timetable.movie.title,
                        makeAge(timetable.movie.age),
                        timetable.movie.director,
                        timetable.movie.genres.map(genre => genre.name).join(', '),
                        timetable.movie.runningTime,
                        timetable.cinema.name,
                        timetable.theater.number,
                        timetable.startTime,
                        <Button variant={'dark'}
                                value={JSON.stringify(timetable)}
                                onClick={handleClickReservation}>예매</Button>
                    ],
                }));
                setTimetables(_timetables);
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
    const makeKeyword = search => {
        let keywords = [];
        if (search?.keywordTab) keywords.push(search.keywordTab);
        if (search?.keyword) keywords.push(search.keyword);
        return keywords.join(',');
    };
    const makeKeywordField = search => {
        let keywords = [];
        if (search?.filterTab) keywords.push(search.filterTab);
        if (search?.filter) keywords.push(search.filter);
        return keywords.join(',');
    };
    const makeAge = age => {
        const _title = age < 12 ? 'ALL' : age;
        let _bg = 'success';
        switch (age) {
            case 12: _bg = 'primary'; break;
            case 15: _bg = 'warning'; break;
            case 18: _bg = 'danger'; break;
        }
        return (
            <Badge bg={_bg}>
                <div className={'h5 m-0'}>{_title}</div>
            </Badge>
        );
    };
    const makeFilters = () => {
        setFilters([
            { title: '전체' },
            { value: 'MOVIE_TITLE', title: '제목' },
        ]);
    };
    const init = () => {
        makeFilters();
        getCinemas();
        getTimetables(1);
    };
    useMemo(init, []);
    return (
        <Container>
            <Row className={'mt-4'}>
                <Col>
                    <Stack>
                        <p className={'font-HakMulB'} style={{ fontSize: 60 }}>TIMETABLE</p>
                        <p style={{ fontSize: 40 }}>Welcome. You can check out which movies are currently playing in theaters here. Watch any movie you want!</p>
                    </Stack>
                </Col>
                <Col>
                    <Card>
                        <Card.Img src={'https://cdn.pixabay.com/photo/2016/12/29/04/57/airport-1937761_1280.jpg'} />
                    </Card>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col>
                    <Nav className={'h2'} variant={'underline'} defaultActiveKey={'ALL'} onClick={handleClickNavLinkCinema}>
                        <Nav.Item>
                            <Nav.Link className={'text-dark'} eventKey={'ALL'}>All</Nav.Link>
                        </Nav.Item>
                        {cinemas.map((cinema, cinemaIdx) => {
                            return (
                                <Nav.Item key={`nav-item-cinema-${cinemaIdx}`}>
                                    <Nav.Link className={'text-dark'}
                                              eventKey={cinema.value}>{cinema.title}
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <CustomTimeTable
                    data={timetables}
                    pageData={tablePage}
                    onClickPage={handleClickTablePage}
                />
            </Row>
            <Row className={'mt-3'}>
                <Col className={'d-flex justify-content-center'}>
                    <Stack className={'w-50'} direction={'horizontal'} gap={3}>
                        <DropdownButton variant={'outline-dark'} title={currentFilter.title ?? '전체'}>
                            {filters.map((filter, filterIdx) => {
                                return <Dropdown.Item key={`dropdown-item-filter-${filterIdx}`}
                                                      onClick={() => handleChangeSearchFilter(filter)}>{filter.title}</Dropdown.Item>;
                            })}
                        </DropdownButton>
                        <Form.Control onChange={handleChangeSearchKeyword} />
                        <Button variant={'dark'} onClick={handleClickSearch}>Search</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default UserTimetable;