import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";

const ManagementGenreList = (props) => {
    const dropdownMenu = [
        { id: 'NAME', text: '장르명' },
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
    const onClickSearchBar = () => getGenreList(1, currentSortType);
    const onClickSortButton = id => {
        if (id === currentSortType) {
            getGenreList(1);
            setCurrentSortType(undefined);
        } else {
            getGenreList(1, id);
            setCurrentSortType(id);
        }
    }
    const onClickButton = value => {
        if (value === 'register') navigate(`/admin/management/genre/${value}`);
    }
    const onClickPage = number => getGenreList(number);
    const onClickButtonDelete = value => {
        let isOk = window.confirm('삭제하시겠습니까?');
        if (isOk) {
            const genreIdList = [
                value,
            ]
            deleteGenre(genreIdList);
        }
    }
    const init = () => {
        setHeaders(['장르번호', '장르명', '삭제']);
        setSortList([
            { id: 'name', text: '장르순' },
        ]);
        getGenreList(1);
    }
    const getGenreList = (page, sortType) => {
    }
    const deleteGenre = (genreIdList) => {
    }
    useMemo(init, []);
    return (
        <div className="management-genre-list-container">
            <div className="management-genre-list-title font-HakDotR">{props.title}</div>
            <div className="management-genre-list-content">
                <div className="management-genre-list-content-box">
                    <div className="management-genre-list-content-box-row-search">
                        <div className="management-genre-list-content-box-row-search-col-left">
                            <DropDown menu={dropdownMenu} onClickMenu={onClickDropDown} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="management-genre-list-content-box-row-search-col-right">
                            <Button title={'등록'}
                                    value={'register'}
                                    width={80} onClick={onClickButton} />
                            <SortButton list={sortList} onClickMenu={onClickSortButton} />
                        </div>
                    </div>
                    <div className="management-genre-list-content-box-row-table">
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

export default ManagementGenreList;