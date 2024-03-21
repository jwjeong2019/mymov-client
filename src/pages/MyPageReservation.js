import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import apiMember from "../api/apiMember";
import {Utils} from "../utils/Utils";

const MyPageReservation = (props) => {
    const dropdownMenu = [
        { id: 'MOVIE_TITLE', text: '제목' },
        { id: 'CINEMA_NAME', text: '영화관' },
    ];
    const auth = JSON.parse(localStorage.getItem('auth'));
    const [search, setSearch] = useState();
    const [headers, setHeaders] = useState([]);
    const [bodies, setBodies] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [filterType, setFilterType] = useState();
    const [currentSortType, setCurrentSortType] = useState();
    const [sortList, setSortList] = useState([]);
    const onClickDropDown = id => setFilterType(id);
    const onChangeSearchBar = value => setSearch(value);
    const onClickSearchBar = () => getTicketList(1, currentSortType);
    const onClickSortButton = id => {
        if (id === currentSortType) {
            getTicketList(1);
            setCurrentSortType(undefined);
        } else {
            getTicketList(1, id);
            setCurrentSortType(id);
        }
    }
    const onClickButtonStatus = value => console.log(`click button status value: ${value}`);
    const onClickPage = number => getTicketList(number);
    const init = () => {
        setHeaders(['예매번호', '제목', '내용', '영화관', '상영관', '시작시간', '좌석', '예매상태']);
        setSortList([
            { id: 'ticket.timetable.startTime', text: '시작시간순' },
            { id: 'ticket.timetable.movie.title', text: '제목순' },
            { id: 'ticket.timetable.cinema.name', text: '영화관순' },
            { id: 'status', text: '상태순' },
        ]);
        getTicketList(1);
    };
    const getTicketList = (page, sortType) => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            page: page - 1,
            size: 10,
            keyword: search,
            keywordField: filterType,
            sortField: sortType,
            sortType: 'DESC'
        };
        apiMember.getReservationList(params)
            .then(response => {
                const { data } = response;
                if (data.result.totalElements > 0) {
                    const array = data.result.content.map(reservation => ({
                        id: reservation.id,
                        reservationId: reservation.id,
                        movieTitle: reservation.ticket.timetable.movie.title,
                        movieDetail: '상세보기',
                        cinemaName: reservation.ticket.timetable.cinema.name,
                        theaterNumber: reservation.ticket.timetable.theater.number,
                        startTime: reservation.ticket.timetable.startTime,
                        seatPosition: reservation.ticket.seat.position,
                        status: makeStatusFromReservation(reservation),
                    }));
                    setBodies(array);
                }
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    const makeStatusFromReservation = (reservation) => {
        if (reservation.status === 'COM') return '예매완료';
        if (reservation.status === 'CAN') return '취소완료';
        if (reservation.status === 'ING') return <Button title={'예매취소'}
                                                    outline value={reservation.id}
                                                    onClick={onClickButtonStatus} />;
        return '알수없음';
    }
    useMemo(init, []);
    return (
        <div className="mypage-reservation-container">
            <div className="mypage-reservation-title">{props.title}</div>
            <div className="mypage-reservation-search">
                <div className="mypage-reservation-search-left">
                    <DropDown menu={dropdownMenu} onClickMenu={onClickDropDown} />
                    <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                </div>
                <div className="mypage-reservation-search-right">
                    <SortButton list={sortList} onClickMenu={onClickSortButton} />
                </div>
            </div>
            <div className="mypage-reservation-table">
                <Table headers={headers}
                       bodies={bodies}
                       page={page}
                       size={size}
                       total={totalElements}
                       onClickPage={onClickPage} />
            </div>
        </div>
    )
}

export default MyPageReservation;