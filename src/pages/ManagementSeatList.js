import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import apiSeat from "../api/apiSeat";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";

const ManagementSeatList = (props) => {
    const dropdownMenu = [
        { id: 'THEATER_NUMBER', text: '상영관' },
        { id: 'CINEMA_NAME', text: '영화관' },
    ];
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
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
    const onClickSearchBar = () => getSeatList(1, currentSortType);
    const onClickSortButton = id => {
        if (id === currentSortType) {
            getSeatList(1);
            setCurrentSortType(undefined);
        } else {
            getSeatList(1, id);
            setCurrentSortType(id);
        }
    }
    const onClickButton = value => {
        if (value === 'register') navigate(`/admin/management/seat/${value}`);
    }
    const onClickPage = number => getSeatList(number);
    const onClickButtonDelete = value => {
        let isOk = window.confirm('삭제하시겠습니까?');
        if (isOk) {
            const seatIdList = [
                value,
            ]
            deleteSeat(seatIdList);
        }
    }
    const init = () => {
        setHeaders(['좌석번호', '좌석명', '상태', '상영관', '영화관', '지역', '삭제']);
        setSortList([
            { id: 'theater.cinema.name', text: '영화관순' },
            { id: 'theater.number', text: '상영관순' },
        ]);
        getSeatList(1);
    }
    const getSeatList = (page, sortType) => {
        const params = {
            page: page - 1,
            size: 10,
            keyword: search,
            keywordField: filterType,
            sortField: sortType,
            sortType: 'DESC'
        };
        apiSeat.getList(params)
            .then(response => {
                const { data } = response;
                if (data.result.totalElements > 0) {
                    const array = data.result.content.map(value => ({
                        id: value.id,
                        seatId: value.id,
                        position: value.position,
                        status: value.status,
                        theaterNumber: `${value.theater.number}상영관`,
                        cinemaName: value.theater.cinema.name,
                        cinemaRegion: value.theater.cinema.region,
                        button: <Button title={'삭제'}
                                        type={'caution'}
                                        value={value.id}
                                        onClick={onClickButtonDelete} />
                    }));
                    setBodies(array);
                    setPage(page);
                    setSize(10);
                    setTotalElements(data.result.totalElements);
                }
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    const deleteSeat = (seatIdList) => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            seatIds: seatIdList,
        };
        apiAdmin.deleteSeat(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화 삭제 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('좌석을 정상적으로 삭제하였습니다.');
                getSeatList(page, currentSortType);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="management-seat-list-container">
            <div className="management-seat-list-title font-HakDotR">{props.title}</div>
            <div className="management-seat-list-content">
                <div className="management-seat-list-content-box">
                    <div className="management-seat-list-content-box-row-search">
                        <div className="management-seat-list-content-box-row-search-col-left">
                            <DropDown menu={dropdownMenu} onClickMenu={onClickDropDown} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="management-seat-list-content-box-row-search-col-right">
                            <Button title={'등록'}
                                    value={'register'}
                                    width={80} onClick={onClickButton} />
                            <SortButton list={sortList} onClickMenu={onClickSortButton} />
                        </div>
                    </div>
                    <div className="management-seat-list-content-box-row-table">
                        <Table headers={headers}
                               bodies={bodies}
                               page={page}
                               size={size}
                               total={totalElements}
                               onClickPage={onClickPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementSeatList;