import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import apiGenre from "../api/apiGenre";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";

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
            deleteGenre(value);
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
        apiGenre.getList(params)
            .then(response => {
                const { data } = response;
                if (data.result.totalElements > 0) {
                    const array = data.result.content.map(genre => ({
                        id: genre.id,
                        genreId: genre.id,
                        name: genre.name,
                        button: <Button title={'삭제'}
                                        type={'caution'}
                                        value={genre.id}
                                        onClick={onClickButtonDelete}/>
                    }));
                    setBodies(array);
                    setPage(page);
                    setSize(10);
                    setTotalElements(data.result.totalElements);
                }
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    const deleteGenre = (id) => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            id,
        };
        apiAdmin.deleteGenre(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`장르 삭제 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('장르를 정상적으로 삭제하였습니다.');
                getGenreList(1, currentSortType);
            })
            .catch();
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