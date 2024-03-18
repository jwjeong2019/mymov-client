import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import apiTimetable from "../api/apiTimetable";

const ManagementTimetableList = (props) => {
    const dropdownMenu = [
        { id: 'MOVIE_TITLE', text: '영화명' },
        { id: 'CINEMA_NAME', text: '영화관' },
    ];
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
    const onClickSearchBar = () => getTimetableList(1, currentSortType);
    const onClickSortButton = id => {
        if (id === currentSortType) {
            getTimetableList(1);
            setCurrentSortType(undefined);
        } else {
            getTimetableList(1, id);
            setCurrentSortType(id);
        }
    }
    const onClickButton = value => {
        if (value === 'register') navigate(`/admin/management/timetable/${value}`);
    }
    const onClickPage = number => getTimetableList(number);
    const onClickButtonDelete = value => console.log(`delete button value: ${value}`);
    const init = () => {
        setHeaders(['상영표번호', '영화명', '연령', '상영관', '영화관', '지역', '시작시간', '종료시간', '삭제']);
        setSortList([
            { id: 'startTime', text: '시작시간순' },
            { id: 'cinema.name', text: '영화관순' },
            { id: 'movie.title', text: '영화명순' },
        ]);
        getTimetableList(1);
    };
    const getTimetableList = (page, sortType) => {
        const params = {
            page: page - 1,
            size: 10,
            keyword: search,
            keywordField: filterType,
            sortField: sortType,
            sortType: 'DESC'
        };
        apiTimetable.getList(params)
            .then(response => {
                const { data } = response;
                if (data.result.totalElements > 0) {
                    const array = data.result.content.map(value => ({
                        id: value.id,
                        timetableId: value.id,
                        movieTitle: value.movie.title,
                        age: value.movie.age,
                        theaterNumber: `${value.theater.number}상영관`,
                        cinemaName: value.cinema.name,
                        cinemaRegions: value.cinema.region,
                        startTime: value.startTime,
                        endTime: value.endTime,
                        button: <Button title={'삭제'}
                                        type={'caution'}
                                        value={value.id}
                                        onClick={onClickButtonDelete} />,
                    }));
                    setBodies(array);
                    setPage(page);
                    setSize(10);
                    setTotalElements(data.result.totalElements);
                }
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    useMemo(init, []);
    return (
        <div className="management-timetable-list-container">
            <div className="management-timetable-list-title">{props.title}</div>
            <div className="management-timetable-list-content">
                <div className="management-timetable-list-content-box">
                    <div className="management-timetable-list-content-box-row-search">
                        <div className="management-timetable-list-content-box-row-search-col-left">
                            <DropDown menu={dropdownMenu} onClickMenu={onClickDropDown} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="management-timetable-list-content-box-row-search-col-right">
                            <Button title={'등록'}
                                    value={'register'}
                                    width={80} onClick={onClickButton} />
                            <SortButton list={sortList} onClickMenu={onClickSortButton} />
                        </div>
                    </div>
                    <div className="management-timetable-list-content-box-row-table">
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

export default ManagementTimetableList;