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
import apiGenre from "../../api/apiGenre";
import CustomTable from "../component/CustomTable";
import apiTheater from "../../api/apiTheater";
import apiCinema from "../../api/apiCinema";
import {StorageUtils} from "../../utils/StorageUtil";

const AdminManagementTheater = () => {
    const [isShow, setIsShow] = useState(false);
    const [modalInputs, setModalInputs] = useState({});
    const [searchData, setSearchData] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [tablePage, setTablePage] = useState({});
    const [filters, setFilters] = useState([]);
    const [sorts, setSorts] = useState([]);
    const [currentFilter, setCurrentFilter] = useState({});
    const [currentSort, setCurrentSort] = useState({});
    const [options, setOptions] = useState([]);
    const handleClickRegister = () => setIsShow(true);
    const handleClickModalClose = () => setIsShow(false);
    const handleClickModalComplete = () => createTheaters();
    const handleChangeModalInputsCinemaId = e => setModalInputs(prevState => ({ ...prevState, cinemaId: e.target.value }));
    const handleChangeModalInputsTheaterNumber = e => setModalInputs(prevState => ({ ...prevState, theaterNumber: e.target.value }));
    const handleClickDelete = e => {
        const isOk = window.confirm('삭제 하시겠습니까?');
        if (isOk) deleteTheater(e.target.value);
    };
    const handleClickTablePage = number => getTheaters(number);
    const handleChangeSearchDataKeyword = e => setSearchData(prevState => ({ ...prevState, keyword: e.target.value }));
    const handleChangeSearchDataFilter = filter => {
        setSearchData(prevState => ({...prevState, filter: filter.value}));
        setCurrentFilter(filter);
    };
    const handleChangeSearchDataSort = sort => {
        const _nextSearchData = { ...searchData, sort: sort.value };
        setSearchData(_nextSearchData);
        setCurrentSort(sort);
        getTheaters(tablePage.page, _nextSearchData);
    };
    const handleClickSearch = () => getTheaters(1, searchData);
    const getCinemas = () => {
        apiCinema.getList()
            .then(response => {
                const { data } = response;
                if (data.result.length > 0) {
                    const _options = data.result.map(cinema => ({
                        id: cinema.id,
                        value: cinema.id,
                        title: cinema.name,
                    }));
                    setOptions([
                        { value: 'ALL', title: '전체' },
                        ..._options
                    ]);
                }
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const createTheaters = () => {
        const _params = {
            cinemaId: modalInputs.cinemaId,
            number: modalInputs.theaterNumber,
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken
        };
        apiAdmin.createTheater(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`상영관 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`상영관 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('상영관을 정상적으로 등록하였습니다.');
                setIsShow(false);
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const getTheaters = (page, search) => {
        const _params = {
            page: page - 1,
            size: 10,
            keyword: search?.keyword,
            keywordField: search?.filter,
            sortField: search?.sort,
            sortType: 'DESC'
        };
        apiTheater.getList(_params)
            .then(response => {
                const { data } = response;
                const _theaters = data.result.content.map(theater => ({
                    id: theater.id,
                    number: theater.number,
                    cinemaName: theater.cinema.name,
                    cinemaRegion: theater.cinema.region,
                    button: <Button variant={'danger'}
                                    value={theater.id}
                                    onClick={handleClickDelete}>삭제</Button>,
                }));
                setTheaters(_theaters);
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
    const deleteTheater = id => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            id
        };
        apiAdmin.deleteTheater(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`상영관 삭제 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('상영관을 정상적으로 삭제하였습니다.');
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    }
    const makeTableHeaders = () => {
        setTableHeaders([ '#', '번호', '영화관명', '지역', '삭제' ]);
    };
    const makeFilters = () => {
        setFilters([
            { title: '전체' },
            { value: 'CINEMA_NAME', title: '영화관명' },
            { value: 'CINEMA_REGION', title: '지역' },
        ]);
    };
    const makeSorts = () => {
        setSorts([
            { title: '전체' },
            { value: 'cinema.name', title: '영화관순' }
        ]);
    };
    const init = () => {
        makeTableHeaders();
        makeFilters();
        makeSorts();
        getCinemas();
        getTheaters(1);
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
                                        bodyData={theaters}
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
                    <Modal.Title>상영관 등록하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>영화관</Form.Label>
                            <Form.Select defaultValue={'ALL'} onChange={handleChangeModalInputsCinemaId}>
                                {options.map((option, optionIdx) => {
                                    return <option key={`option-cinema-${optionIdx}`}
                                                   value={option.value}>{option.title}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>번호</Form.Label>
                            <Form.Control onChange={handleChangeModalInputsTheaterNumber} />
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

export default AdminManagementTheater;