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

const AdminManagementGenre = () => {
    const storageItemAuth = JSON.parse(localStorage.getItem('auth'));
    const [isShow, setIsShow] = useState(false);
    const [modalInputs, setModalInputs] = useState({});
    const [searchData, setSearchData] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
    const [genres, setGenres] = useState([]);
    const [tablePage, setTablePage] = useState({});
    const [filters, setFilters] = useState([]);
    const [sorts, setSorts] = useState([]);
    const [currentFilter, setCurrentFilter] = useState({});
    const [currentSort, setCurrentSort] = useState({});
    const handleClickRegister = () => setIsShow(true);
    const handleClickModalClose = () => setIsShow(false);
    const handleClickModalComplete = () => createGenre();
    const handleChangeModalInputsGenreName = e => setModalInputs(prevState => ({ ...prevState, genreName: e.target.value }));
    const handleClickDelete = e => {
        const isOk = window.confirm('삭제 하시겠습니까?');
        if (isOk) deleteGenre(e.target.value);
    };
    const handleClickTablePage = number => getGenres(number);
    const handleChangeSearchDataKeyword = e => setSearchData(prevState => ({ ...prevState, keyword: e.target.value }));
    const handleChangeSearchDataFilter = filter => {
        setSearchData(prevState => ({...prevState, filter: filter.value}));
        setCurrentFilter(filter);
    };
    const handleChangeSearchDataSort = sort => {
        const _nextSearchData = { ...searchData, sort: sort.value };
        setSearchData(_nextSearchData);
        setCurrentSort(sort);
        getGenres(tablePage.page, _nextSearchData);
    };
    const handleClickSearch = () => getGenres(1, searchData);
    const createGenre = () => {
        const _params = {
            name: modalInputs.genreName,
            grantType: storageItemAuth.grantType,
            accessToken: storageItemAuth.accessToken
        };
        apiAdmin.createGenre(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`장르 생성 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`장르 생성 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('장르를 정상적으로 등록하였습니다.');
                setIsShow(false);
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const getGenres = (page, search) => {
        const _params = {
            page: page - 1,
            size: 10,
            grantType: storageItemAuth.grantType,
            accessToken: storageItemAuth.accessToken,
            keyword: search?.keyword,
            keywordField: search?.filter,
            sortField: search?.sort,
            sortType: 'DESC'
        };
        apiGenre.getList(_params)
            .then(response => {
                const { data } = response;
                const _genres = data.result.content.map(genre => ({
                    id: genre.id,
                    name: genre.name,
                    button: <Button variant={'danger'}
                                    value={genre.id}
                                    onClick={handleClickDelete}>삭제</Button>,
                }));
                setGenres(_genres);
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
    const deleteGenre = id => {
        const _params = {
            grantType: storageItemAuth.grantType,
            accessToken: storageItemAuth.accessToken,
            id
        };
        apiAdmin.deleteGenre(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`장르 삭제 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('장르를 정상적으로 삭제하였습니다.');
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    }
    const makeTableHeaders = () => {
        setTableHeaders([ '#', '장르명', '삭제' ]);
    };
    const makeFilters = () => {
        setFilters([
            { title: '전체' },
            { value: 'NAME', title: '장르명' },
        ]);
    };
    const makeSorts = () => {
        setSorts([
            { title: '전체' },
            { value: 'name', title: '이름순' },
        ]);
    };
    const init = () => {
        makeTableHeaders();
        makeFilters();
        makeSorts();
        getGenres(1);
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
                                        bodyData={genres}
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
                    <Modal.Title>장르 등록하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>장르명</Form.Label>
                            <Form.Control onChange={handleChangeModalInputsGenreName} />
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

export default AdminManagementGenre;