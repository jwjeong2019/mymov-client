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
    const onClickSearchBar = () => getReservationList(1, currentSortType);
    const onClickSortButton = id => {
        if (id === currentSortType) {
            getReservationList(1);
            setCurrentSortType(undefined);
        } else {
            getReservationList(1, id);
            setCurrentSortType(id);
        }
    }
    const onClickButtonStatus = value => {
        let isOk = window.confirm('삭제하시겠습니까?');
        if (isOk) deleteReservation(value);
    }
    const onClickPage = number => getReservationList(number);
    const init = () => {
        setHeaders(['예매번호', '제목', '영화관', '상영관', '시작시간', '좌석', '예매상태']);
        setSortList([
            { id: 'ticket.timetable.startTime', text: '시작시간순' },
            { id: 'ticket.timetable.movie.title', text: '제목순' },
            { id: 'ticket.timetable.cinema.name', text: '영화관순' },
            { id: 'status', text: '상태순' },
        ]);
        getReservationList(1);
    };
    const getReservationList = (page, sortType) => {
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
                        cinemaName: reservation.ticket.timetable.cinema.name,
                        theaterNumber: reservation.ticket.timetable.theater.number,
                        startTime: reservation.ticket.timetable.startTime,
                        seatPosition: reservation.ticket.seat.position,
                        status: makeStatusFromReservation(reservation),
                    }));
                    setBodies(array);
                    setPage(page);
                    setSize(10);
                    setTotalElements(data.result.totalElements);
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
    const deleteReservation = (id) => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            id,
        };
        apiMember.deleteReservation(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`예매 취소 실패:\n${data.msg}`);
                alert('예매 취소를 정상적으로 완료하였습니다.');
                getReservationList(1);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="mypage-reservation-container">
            <div className="mypage-reservation-title font-HakDotR">{props.title}</div>
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