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
import apiCinema from "../../api/apiCinema";
import apiAdmin from "../../api/apiAdmin";
import {Utils} from "../../utils/Utils";
import apiTheater from "../../api/apiTheater";
import apiSeat from "../../api/apiSeat";
import CustomTable from "../component/CustomTable";
import {StorageUtils} from "../../utils/StorageUtil";

const AdminManagementSeat = () => {
    const [isShow, setIsShow] = useState(false);
    const [modalInputs, setModalInputs] = useState({});
    const [searchData, setSearchData] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
    const [seats, setSeats] = useState([]);
    const [tablePage, setTablePage] = useState({});
    const [filters, setFilters] = useState([]);
    const [sorts, setSorts] = useState([]);
    const [currentFilter, setCurrentFilter] = useState({});
    const [currentSort, setCurrentSort] = useState({});
    const [optionsCinema, setOptionsCinema] = useState([]);
    const [optionsTheater, setOptionsTheater] = useState([]);
    const handleClickRegister = () => setIsShow(true);
    const handleClickModalClose = () => setIsShow(false);
    const handleClickModalComplete = () => createSeat();
    const handleChangeModalInputsCinema = e => {
        const cinema = JSON.parse(e.target.value);
        let _nextOptionsTheater = [{ value: 'ALL', title: '전체' }];
        if (cinema.value !== 'ALL') _nextOptionsTheater = [ ..._nextOptionsTheater, ...cinema.theaters ];
        setModalInputs(prevState => ({...prevState, cinemaId: cinema.id}));
        setOptionsTheater(_nextOptionsTheater);
    };
    const handleChangeModalInputsTheater = e => setModalInputs(prevState => ({ ...prevState, theaterId: e.target.value }));
    const handleChangeModalInputsSeats = e => {
        let _seatNames = e.target.value
            .replaceAll(' ', '')
            .split(',');
        const _nextSeats = _seatNames.map(seatName => ({ position: seatName }));
        setModalInputs(prevState => ({...prevState, seats: _nextSeats }));
    }
    const handleClickDelete = e => {
        const isOk = window.confirm('삭제 하시겠습니까?');
        if (isOk) {
            const ids = [ e.target.value ];
            deleteSeat(ids);
        }
    };
    const handleClickTablePage = number => getSeats(number);
    const handleChangeSearchDataKeyword = e => setSearchData(prevState => ({ ...prevState, keyword: e.target.value }));
    const handleChangeSearchDataFilter = filter => {
        setSearchData(prevState => ({...prevState, filter: filter.value}));
        setCurrentFilter(filter);
    };
    const handleChangeSearchDataSort = sort => {
        const _nextSearchData = { ...searchData, sort: sort.value };
        setSearchData(_nextSearchData);
        setCurrentSort(sort);
        getSeats(tablePage.page, _nextSearchData);
    };
    const handleClickSearch = () => getSeats(1, searchData);
    const getCinemas = () => {
        apiCinema.getList()
            .then(response => {
                const { data } = response;
                if (data.result.length > 0) {
                    const _options = data.result.map(cinema => ({
                        id: cinema.id,
                        value: cinema.id,
                        title: cinema.name,
                        theaters: makeTheaters(cinema.theaters),
                    }));
                    setOptionsCinema([
                        { value: 'ALL', title: '전체' },
                        ..._options
                    ]);
                    setOptionsTheater([{ value: 'ALL', title: '전체' }]);
                }
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const makeTheaters = theaters => {
        if (theaters?.length === 0) return [];
        return theaters.map(value => ({
            id: value.id,
            value: value.id,
            title: `${value.number}상영관`,
        }));
    };
    const createSeat = () => {
        const _params = {
            theaterId: modalInputs.theaterId,
            seats: modalInputs.seats,
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken
        };
        apiAdmin.createSeat(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`좌석 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('좌석을 정상적으로 등록하였습니다.');
                setIsShow(false);
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const getSeats = (page, search) => {
        const _params = {
            page: page - 1,
            size: 10,
            keyword: search?.keyword,
            keywordField: search?.filter,
            sortField: search?.sort,
            sortType: 'DESC'
        };
        apiSeat.getList(_params)
            .then(response => {
                const { data } = response;
                const _seats = data.result.content.map(seat => ({
                    id: seat.id,
                    position: seat.position,
                    status: seat.status,
                    theaterNumber: `${seat.theater.number}상영관`,
                    cinemaName: seat.theater.cinema.name,
                    cinemaRegion: seat.theater.cinema.region,
                    button: <Button variant={'danger'}
                                    value={seat.id}
                                    onClick={handleClickDelete}>삭제</Button>,
                }));
                setSeats(_seats);
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
    const deleteSeat = ids => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            seatIds: ids
        };
        apiAdmin.deleteSeat(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`좌석 삭제 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('좌석을 정상적으로 삭제하였습니다.');
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    }
    const makeTableHeaders = () => {
        setTableHeaders([ '#', '좌석명', '상태', '상영관', '영화관', '지역', '삭제' ]);
    };
    const makeFilters = () => {
        setFilters([
            { title: '전체' },
            { value: 'THEATER_NUMBER', title: '상영관' },
            { value: 'CINEMA_NAME', title: '영화관' },
        ]);
    };
    const makeSorts = () => {
        setSorts([
            { title: '전체' },
            { value: 'theater.cinema.name', title: '영화관순' },
            { value: 'theater.number', title: '상영관순' },
        ]);
    };
    const init = () => {
        makeTableHeaders();
        makeFilters();
        makeSorts();
        getCinemas();
        getSeats(1);
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
                                        bodyData={seats}
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
                    <Modal.Title>좌석 등록하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>영화관</Form.Label>
                            <Form.Select defaultValue={'ALL'} onChange={handleChangeModalInputsCinema}>
                                {optionsCinema.map((option, optionIdx) => {
                                    const strOption = JSON.stringify(option);
                                    return <option key={`option-cinema-${optionIdx}`}
                                                   value={strOption}>{option.title}</option>;
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>상영관</Form.Label>
                            <Form.Select defaultValue={'ALL'} onChange={handleChangeModalInputsTheater}>
                                {optionsTheater.map((option, optionIdx) => {
                                    return <option key={`option-theater-${optionIdx}`}
                                                   value={option.value}>{option.title}</option>;
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>좌석명</Form.Label>
                            <Form.Control placeholder={'예) A0,A1,A2'} onChange={handleChangeModalInputsSeats} />
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

export default AdminManagementSeat;