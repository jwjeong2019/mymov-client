import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import {useMemo, useState} from "react";
import {useNavigate} from "react-router";

const ManagementMovieList = (props) => {
    const dropdownMenu = [
        { id: 'title', text: '제목' },
    ];
    let navigate = useNavigate();
    const [search, setSearch] = useState();
    const [headers, setHeaders] = useState([]);
    const [bodies, setBodies] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const onClickDropDown = id => console.log(`dropdown id: ${id}`);
    const onChangeSearchBar = value => setSearch(value);
    const onClickSearchBar = () => console.log(`search: ${search}`);
    const onClickSortButton = id => console.log(`sort id: ${id}`);
    const onClickButton = value => {
        if (value === 'register') navigate(`/admin/management/movie/${value}`);
    }
    const onClickPage = number => console.log(`click page: ${number}`);
    const onClickTableRow = id => console.log(`table row id: ${id}`);
    const makeTable = () => {
        setHeaders(['영화번호', '제목', '연령', '감독', '개봉일']);
        setBodies([
            { id: 0, movieId: 0, title: 'First Movie', age: 'ALL', director: '존 스미스', releaseDate: '2024-01-05' },
            { id: 1, movieId: 1, title: 'Second Movie', age: 12, director: '존 다니엘', releaseDate: '2024-02-05' },
            { id: 2, movieId: 2, title: 'Third Movie', age: 15, director: '존 찰리', releaseDate: '2024-03-05' },
        ]);
        setPage(3);
        setSize(10);
        setTotalElements(27);
    };
    useMemo(makeTable, []);
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
                            <SortButton onClickMenu={onClickSortButton} />
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