import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import {useMemo, useState} from "react";
import {useNavigate} from "react-router";
import apiMovie from "../api/apiMovie";

const ManagementMovieList = (props) => {
    const dropdownMenu = [
        { id: 'TITLE', text: '제목' },
    ];
    let navigate = useNavigate();
    const [search, setSearch] = useState();
    const [headers, setHeaders] = useState([]);
    const [bodies, setBodies] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [filterType, setFilterType] = useState();
    const [sortType, setSortType] = useState();
    const [sortList, setSortList] = useState([]);
    const onClickDropDown = id => setFilterType(id);
    const onChangeSearchBar = value => setSearch(value);
    const onClickSearchBar = () => getMovieList(0);
    const onClickSortButton = id => setSortType(id);
    const onClickButton = value => {
        if (value === 'register') navigate(`/admin/management/movie/${value}`);
    }
    const onClickPage = page => getMovieList(page);
    const onClickTableRow = id => console.log(`table row id: ${id}`);
    const init = () => {
        setHeaders(['영화번호', '제목', '연령', '감독', '개봉일']);
        setSortList([
            { id: 'title', text: '제목순' },
            { id: 'releaseDate', text: '개봉순' },
            { id: 'screenDate', text: '상영순' },
            { id: 'age', text: '연령순' },
        ]);
        getMovieList(1);
    };
    const getMovieList = (page) => {
        const params = {
            page: page - 1,
            size: 10,
            keyword: search,
            keywordField: filterType,
            sortField: sortType,
            sortType: 'DESC'
        };
        apiMovie.getList(params)
            .then(response => {
                const { data } = response;
                if (data.result.totalElements > 0) {
                    let arr = [];
                    data.result.content.forEach(value => {
                        let obj = {};
                        obj.id = value.id;
                        obj.movieId = value.id;
                        obj.title = value.title;
                        obj.age = value.age;
                        obj.director = '존 스미스';
                        obj.releaseDate = value.releaseDate;
                        arr.push(obj);
                    });
                    setBodies(arr);
                    setPage(page);
                    setSize(10);
                    setTotalElements(data.result.totalElements);
                }
            })
            .catch(err => alert('데이터가 존재하지 않습니다.'));
    }
    useMemo(init, []);
    return (
        <div className="management-movie-list-container">
            <div className="management-movie-list-title">{props.title}</div>
            <div className="management-movie-list-content">
                <div className="management-movie-list-content-box">
                    <div className="management-movie-list-content-box-row-search">
                        <div className="management-movie-list-content-box-row-search-col-left">
                            <DropDown menu={dropdownMenu} onClickMenu={onClickDropDown} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="management-movie-list-content-box-row-search-col-right">
                            <Button title={'등록'}
                                    value={'register'}
                                    width={80} onClick={onClickButton} />
                            <SortButton list={sortList} onClickMenu={onClickSortButton} />
                        </div>
                    </div>
                    <div className="management-movie-list-content-box-row-table">
                        <Table headers={headers}
                               bodies={bodies}
                               page={page}
                               size={size}
                               total={totalElements}
                               onClickPage={onClickPage}
                               onClickRow={onClickTableRow} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ManagementMovieList;