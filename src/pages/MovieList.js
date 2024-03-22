import Navigation from "../components/Navigation";
import '../css/MovieList.css';
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import CardList from "../components/CardList";
import {useEffect, useMemo, useState} from "react";
import apiMovie from "../api/apiMovie";
import {useNavigate} from "react-router";
import SideBar from "../components/SideBar";

const MovieList = () => {
    const dropdownMenuList = [
        {
            id: 'TITLE',
            text: '제목'
        },
    ];
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [search, setSearch] = useState();
    const [page, setPage] = useState(0);
    const [filterType, setFilterType] = useState();
    const [currentSortType, setCurrentSortType] = useState();
    const [sortList, setSortList] = useState([]);
    const [isOpen, setIsOpen] = useState();
    const onClickBack = () => getMovieList(page - 1, currentSortType);
    const onClickForward = () => getMovieList(page + 1, currentSortType);
    const onClickCard = (value) => navigate(`/movie/detail/${value.id}`);
    const onClickMenu = (id) => {
        if (id === currentSortType) {
            getMovieList(1);
            setCurrentSortType(undefined);
        } else {
            getMovieList(1, id);
            setCurrentSortType(id);
        }
    }
    const onClickDropdownMenu = (id) => setFilterType(id);
    const onChangeSearchBar = value => setSearch(value);
    const onClickSearchBar = () => getMovieList(1, currentSortType);
    const toggleIsOpen = () => setIsOpen(!isOpen);
    const init = () => {
        setSortList([
            { id: 'title', text: '제목순' },
            { id: 'age', text: '연령순' },
        ]);
        getMovieList(1);
    }
    const getMovieList = (page, sortType) => {
        const params = {
            page: page - 1,
            size: 9,
            keyword: search,
            keywordField: filterType,
            sortField: sortType,
            sortType: 'DESC'
        };
        apiMovie.getList(params)
            .then(response => {
                const { data } = response;
                if (data.result.totalElements > 0) {
                    const array = data.result.content.map(value => ({
                        id: value.id,
                        title: value.title,
                        age: value.age < 12 ? 'ALL' : value.age,
                        score: 4.1,
                        type: 'Family',
                        imageUrl: value.attachment
                    }));
                    setMovieList(array);
                    setPage(page);
                    setIsFirst(data.result.first);
                    setIsLast(data.result.last);
                }
            })
            .catch(err => alert('데이터가 존재하지 않습니다.'));
    }
    useMemo(init, []);
    return (
        <div>
            <Navigation toggleIsOpen={toggleIsOpen} />
            <SideBar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            <div className="movie-list-container">
                <div className="movie-list-header">
                    <div className="movie-list-header-title font-HakMulB">영화</div>
                </div>
                <div className="movie-list-content">
                    <div className="movie-list-content-box">
                        <div className="movie-list-content-box-top">
                            <DropDown menu={dropdownMenuList}
                                      onClickMenu={onClickDropdownMenu} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="movie-list-content-box-middle">
                            <SortButton list={sortList} onClickMenu={onClickMenu} />
                        </div>
                        <div className="movie-list-content-box-bottom">
                            <CardList list={movieList}
                                      isFirst={isFirst}
                                      isLast={isLast}
                                      onClickBack={onClickBack}
                                      onClickCard={onClickCard}
                                      onClickForward={onClickForward} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieList;