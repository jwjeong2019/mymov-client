import Navigation from "../components/Navigation";
import '../css/Timetable.css';
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import apiTimetable from "../api/apiTimetable";
import {useNavigate} from "react-router";

const Timetable = () => {
    const dropdownMenu = [
        { id: 'MOVIE_TITLE', text: '제목' },
        { id: 'CINEMA_NAME', text: '영화관' },
    ];
    let navigate = useNavigate();
    const [search, setSearch] = useState();
    const [headers, setHeaders] = useState();
    const [bodies, setBodies] = useState();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [filterType, setFilterType] = useState();
    const [currentSortType, setCurrentSortType] = useState();
    const [sortList, setSortList] = useState([]);
    const onClickPage = number => getTimetableList(number);
    const onClickMenu = id => setFilterType(id);
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
    const onClickButtonReservation = value => navigate(`/reservation/step2`, {
        state: {
            movieId: value.movie.id,
            movieTitle: value.movie.title,
            movieAge: value.movie.age,
            movieDirector: '존 스미스',
            movieTime: `${120}분`,
            cinemaId: value.cinema.id,
            cinemaName: value.cinema.name,
            theaterId: value.theater.id,
            theaterNumber: value.theater.number,
            timetableId: value.id,
            startTime: value.startTime,
        }
    });
    const init = () => {
        setHeaders(['제목', '연령', '평점', '감독', '장르', '영화시간', '영화관', '상영관', '시작시간', '예매하기']);
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
                if (data.result.totalElements === 0) return setBodies([]);
                const array = data.result.content.map(timetable => ({
                    id: timetable.id,
                    title: timetable.movie.title,
                    age: timetable.movie.age < 12 ? '전체' : timetable.movie.age,
                    score: 4.2,
                    director: '존 스미스',
                    genre: 'action',
                    movieTime: `${120}분`,
                    cinemaName: timetable.cinema.name,
                    theaterNumber: timetable.theater.number,
                    startTime: timetable.startTime,
                    button: <Button title={'예매하기'}
                                    outline
                                    value={timetable}
                                    onClick={onClickButtonReservation} />,
                }));
                setBodies(array);
                setPage(page);
                setSize(10);
                setTotalElements(data.result.totalElements);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    useMemo(init, []);
    return (
        <div>
            <Navigation />
            <div className="timetable-container">
                <div className="timetable-header">
                    <div className="timetable-header-title">상영표</div>
                </div>
                <div className="timetable-content">
                    <div className="timetable-content-box">
                        <div className="timetable-content-box-top">
                            <DropDown menu={dropdownMenu} onClickMenu={onClickMenu} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="timetable-content-box-middle">
                            <SortButton list={sortList} onClickMenu={onClickSortButton} />
                        </div>
                        <div className="timetable-content-box-bottom">
                            <Table headers={headers}
                                   bodies={bodies}
                                   total={totalElements}
                                   page={page}
                                   size={size}
                                   onClickPage={onClickPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timetable;