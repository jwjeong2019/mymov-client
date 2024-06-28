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
import apiMovie from "../../api/apiMovie";
import CustomTable from "../component/CustomTable";
import {useNavigate} from "react-router";
import {StorageUtils} from "../../utils/StorageUtil";

const AdminManagementMovie = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
    const [movies, setMovies] = useState([]);
    const [tablePage, setTablePage] = useState({});
    const [filters, setFilters] = useState([]);
    const [sorts, setSorts] = useState([]);
    const [currentFilter, setCurrentFilter] = useState({});
    const [currentSort, setCurrentSort] = useState({});
    const handleClickRegister = () => navigate('/admin/management/movie/register');
    const handleChangeSearchDataKeyword = e => setSearchData(prevState => ({ ...prevState, keyword: e.target.value }));
    const handleChangeSearchDataFilter = filter => {
        setSearchData(prevState => ({...prevState, filter: filter.value}));
        setCurrentFilter(filter);
    };
    const handleChangeSearchDataSort = sort => {
        const _nextSearchData = { ...searchData, sort: sort.value };
        setSearchData(_nextSearchData);
        setCurrentSort(sort);
        getMovies(tablePage.page, _nextSearchData);
    };
    const handleClickSearch = () => getMovies(1, searchData);
    const handleClickTablePage = number => getMovies(number);
    const handleClickTableRecord = record => navigate(`/admin/management/movie/${record.id}`);
    const getMovies = (page, search) => {
        const _params = {
            page: page - 1,
            size: 10,
            keyword: search?.keyword,
            keywordField: search?.filter,
            sortField: search?.sort,
            sortType: 'DESC'
        };
        apiMovie.getList(_params)
            .then(response => {
                const { data } = response;
                const _movies = data.result.content.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    age: movie.age,
                    director: movie.director,
                    runningTime: movie.runningTime,
                    releaseDate: movie.releaseDate?.replace('T', ' ')
                }));
                setMovies(_movies);
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
    const makeTableHeaders = () => {
        setTableHeaders([ '#', '제목', '연령', '감독', '시간', '개봉일' ]);
    };
    const makeFilters = () => {
        setFilters([
            { title: '전체' },
            { value: 'TITLE', title: '제목' },
        ]);
    };
    const makeSorts = () => {
        setSorts([
            { title: '전체' },
            { value: 'title', title: '제목순' },
            { value: 'releaseDate', title: '개봉순' },
            { value: 'screenDate', title: '상영순' },
            { value: 'age', title: '연령순' },
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
        getMovies(1);
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
                                        bodyData={movies}
                                        pageData={tablePage}
                                        onClickPage={handleClickTablePage}
                                        onClickRecord={handleClickTableRecord}
                                    />
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminManagementMovie;