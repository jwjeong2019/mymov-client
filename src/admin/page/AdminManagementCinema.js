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
import CustomTable from "../component/CustomTable";
import apiAdmin from "../../api/apiAdmin";
import {Utils} from "../../utils/Utils";
import apiCinema from "../../api/apiCinema";
import {StorageUtils} from "../../utils/StorageUtil";

const AdminManagementCinema = () => {
    const [isShow, setIsShow] = useState(false);
    const [modalInputs, setModalInputs] = useState({});
    const [searchData, setSearchData] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [tablePage, setTablePage] = useState({});
    const [filters, setFilters] = useState([]);
    const [sorts, setSorts] = useState([]);
    const [currentFilter, setCurrentFilter] = useState({});
    const [currentSort, setCurrentSort] = useState({});
    const [options, setOptions] = useState([]);
    const handleClickRegister = () => setIsShow(true);
    const handleClickModalClose = () => setIsShow(false);
    const handleClickModalComplete = () => createCinema();
    const handleChangeModalInputsCinemaName = e => setModalInputs(prevState => ({ ...prevState, cinemaName: e.target.value }));
    const handleChangeModalInputsCinemaRegion = e => setModalInputs(prevState => ({ ...prevState, cinemaRegion: e.target.value }));
    const handleClickDelete = e => {
        const isOk = window.confirm('삭제 하시겠습니까?');
        if (isOk) deleteCinema(e.target.value);
    };
    const handleClickTablePage = number => getCinemas(number);
    const handleChangeSearchDataKeyword = e => setSearchData(prevState => ({ ...prevState, keyword: e.target.value }));
    const handleChangeSearchDataFilter = filter => {
        setSearchData(prevState => ({...prevState, filter: filter.value}));
        setCurrentFilter(filter);
    };
    const handleChangeSearchDataSort = sort => {
        const _nextSearchData = { ...searchData, sort: sort.value };
        setSearchData(_nextSearchData);
        setCurrentSort(sort);
        getCinemas(tablePage.page, _nextSearchData);
    };
    const handleClickSearch = () => getCinemas(1, searchData);
    const createCinema = () => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            name: modalInputs.cinemaName,
            region: modalInputs.cinemaRegion,
        };
        apiAdmin.createCinema(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화관 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('영화관을 정상적으로 등록하였습니다.');
                setIsShow(false);
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const getCinemas = (page, search) => {
        const _params = {
            page: page - 1,
            size: 10,
            keyword: search?.keyword,
            keywordField: search?.filter,
            sortField: search?.sort,
            sortType: 'DESC'
        };
        apiCinema.getList()
            .then(response => {
                const { data } = response;
                const _cinemas = data.result.map(cinema => ({
                    id: cinema.id,
                    name: cinema.name,
                    region: cinema.region,
                    button: <Button variant={'danger'}
                                    value={cinema.id}
                                    onClick={handleClickDelete}>삭제</Button>,
                }));
                setCinemas(_cinemas);
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
    const deleteCinema = (id) => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            id
        };
        apiAdmin.deleteCinema(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화 삭제 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('영화를 정상적으로 삭제하였습니다.');
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const makeTableHeaders = () => {
        setTableHeaders([ '#', '이름', '지역', '삭제']);
    };
    const makeFilters = () => {
        setFilters([
            { title: '전체' },
            { value: 'NAME', title: '이름' },
            { value: 'REGION', title: '지역' },
        ]);
    };
    const makeSorts = () => {
        setSorts([
            { title: '전체' },
            { value: 'region', title: '지역순' },
        ]);
    };
    const makeOptions = () => {
        setOptions([
            { id: 'ALL', value: 'ALL', title: '전체' },
            { id: 'SEOUL', value: '서울', title: '서울'  },
            { id: 'INCHEON', value: '인천', title: '인천'  },
            { id: 'SUWON', value: '수원', title: '수원'  },
            { id: 'DAEJEON', value: '대전', title: '대전'  },
            { id: 'DAEGU', value: '대구', title: '대구'  },
            { id: 'ULSAN', value: '울산', title: '울산'  },
            { id: 'BUSAN', value: '부산', title: '부산'  },
            { id: 'JEJU', value: '제주도', title: '제주도'  },
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
        makeOptions();
        getCinemas(1);
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
                                        bodyData={cinemas}
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
                    <Modal.Title>영화관 등록하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>이름</Form.Label>
                            <Form.Control onChange={handleChangeModalInputsCinemaName} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>지역</Form.Label>
                            <Form.Select defaultValue={'ALL'} onChange={handleChangeModalInputsCinemaRegion}>
                                {options.map((option, optionIdx) => {
                                    return <option key={`option-region-${optionIdx}`}
                                                   value={option.value}>{option.title}</option>;
                                })}
                            </Form.Select>
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

export default AdminManagementCinema;