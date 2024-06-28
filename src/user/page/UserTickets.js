import {
    Badge,
    Button,
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    Image,
    Pagination,
    Row,
    Stack
} from "react-bootstrap";
import {useMemo, useState} from "react";
import CustomTimeTable from "../component/CustomTimeTable";
import {Utils} from "../../utils/Utils";
import apiTicket from "../../api/apiTicket";
import {StorageUtils} from "../../utils/StorageUtil";

const UserTickets = () => {
    const [reservations, setReservations] = useState([]);
    const [tablePage, setTablePage] = useState({});
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState({});
    const [currentFilter, setCurrentFilter] = useState({});
    const handleClickCancel = id => {
        const isOk = window.confirm('삭제하시겠습니까?');
        if (isOk) cancelTicket(id);
    };
    const handleClickTablePage = number => getTickets(number, search);
    const handleChangeSearchKeyword = e => setSearch(prevState => ({ ...prevState, keyword: e.target.value }));
    const handleChangeSearchFilter = filter => {
        setSearch(prevState => ({...prevState, filter: filter.value}));
        setCurrentFilter(filter);
    };
    const handleClickSearch = () => getTickets(1, search);
    const getTickets = (page, search) => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            page: page - 1,
            size: 10,
            keyword: search?.keyword,
            keywordField: search?.filter,
        };
        apiTicket.getList(_params)
            .then(response => {
                const { data } = response;
                const _reservations = data.result.content.map(ticket => ({
                    image: {
                        url: ticket.timetable.movie.attachment.path
                    },
                    headers: [ '#', '제목', '영화관', '상영관', '시작시간', '좌석', '상태' ],
                    contents: [
                        ticket.id,
                        ticket.timetable.movie.title,
                        ticket.timetable.cinema.name,
                        ticket.timetable.theater.number,
                        ticket.timetable.startTime,
                        ticket.seat.position,
                        makeStatus(ticket.id, ticket.status),
                    ],
                }));
                setReservations(_reservations);
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
    const makeStatus = (id, status) => {
        let buttonProps = {};
        switch (status) {
            case 'CAN': {
                buttonProps.variant = 'secondary';
                buttonProps.title = '취소완료';
                buttonProps.disabled = true;
                break;
            }
            case 'ING': {
                buttonProps.variant = 'danger';
                buttonProps.title = '예매취소';
                buttonProps.onClick = () => handleClickCancel(id);
                break;
            }
            case 'COM': {
                buttonProps.variant = 'success';
                buttonProps.title = '예매완료';
                buttonProps.disabled = true;
                break;
            }
        }
        return (
            <Button variant={buttonProps.variant}
                    disabled={buttonProps.disabled}
                    onClick={buttonProps.onClick}
            >
                <div className={'h6 m-0'}>{buttonProps.title}</div>
            </Button>
        );
    };
    const cancelTicket = (id) => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            id,
        };
        apiTicket.update(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`예매 취소 실패:\n${data.msg}`);
                alert('예매 취소를 정상적으로 완료하였습니다.');
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const makeFilters = () => {
        setFilters([
            { title: '전체' },
            { value: 'MOVIE_TITLE', title: '제목' },
            { value: 'CINEMA_NAME', title: '영화관' },
        ]);
    };
    const init = () => {
        makeFilters();
        getTickets(1);
    };
    useMemo(init, []);
    return (
        <Container>
            <CustomTimeTable
                data={reservations}
                pageData={tablePage}
                onClickPage={handleClickTablePage}
            />
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

export default UserTickets;