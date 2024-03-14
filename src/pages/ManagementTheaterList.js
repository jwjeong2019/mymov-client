import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import apiTheater from "../api/apiTheater";

const ManagementTheaterList = (props) => {
    const dropdownMenu = [
        { id: 'CINEMA_NAME', text: '영화관명' },
        { id: 'CINEMA_REGION', text: '지역' },
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
    const onClickSearchBar = () => getTheaterList(1, currentSortType);
    const onClickSortButton = id => {
        if (id === currentSortType) {
            getTheaterList(1);
            setCurrentSortType(undefined);
        } else {
            getTheaterList(1, id);
            setCurrentSortType(id);
        }
    }
    const onClickButton = value => {
        if (value === 'register') navigate(`/admin/management/theater/${value}`);
    }
    const onClickPage = number => getTheaterList(number);
    const onClickButtonDelete = value => console.log(`delete button value: ${value}`);
    const init = () => {
        setHeaders(['상영관번호', '번호', '영화관명', '지역', '삭제']);
        setSortList([
            { id: 'cinema.name', text: '영화관순' }
        ]);
        getTheaterList(1);
    }
    const getTheaterList = (page, sortType) => {
        const params = {
            page: page - 1,
            size: 10,
            keyword: search,
            keywordField: filterType,
            sortField: sortType,
            sortType: 'DESC'
        };
        apiTheater.getList(params)
            .then(response => {
                const { data } = response;
                if (data.result.totalElements > 0) {
                    const array = data.result.content.map(value => ({
                        id: value.id,
                        theaterId: value.id,
                        number: value.number,
                        cinemaName: value.cinema.name,
                        cinemaRegion: value.cinema.region,
                        button: <Button title={'삭제'}
                                        type={'caution'}
                                        value={value.id}
                                        onClick={onClickButtonDelete}/>
                    }));
                    setBodies(array);
                    setPage(page);
                    setSize(10);
                    setTotalElements(data.result.totalElements);
                }
            })
            .catch(err => alert(`데이터 로드 실패:\n${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="management-theater-list-container">
            <div className="management-theater-list-title">{props.title}</div>
            <div className="management-theater-list-content">
                <div className="management-theater-list-content-box">
                    <div className="management-theater-list-content-box-row-search">
                        <div className="management-theater-list-content-box-row-search-col-left">
                            <DropDown menu={dropdownMenu} onClickMenu={onClickDropDown} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="management-theater-list-content-box-row-search-col-right">
                            <Button title={'등록'}
                                    value={'register'}
                                    width={80} onClick={onClickButton} />
                            <SortButton list={sortList} onClickMenu={onClickSortButton} />
                        </div>
                    </div>
                    <div className="management-theater-list-content-box-row-table">
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

export default ManagementTheaterList;