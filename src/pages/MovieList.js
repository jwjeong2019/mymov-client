import Navigation from "../components/Navigation";
import '../css/MovieList.css';
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import CardList from "../components/CardList";
import {useEffect, useMemo, useState} from "react";

const MovieList = () => {
    const dropdownMenuList = [
        {
            id: 'all',
            text: '전체'
        },
        {
            id: 'title',
            text: '제목'
        },
        {
            id: 'type',
            text: '종류'
        },
    ];

    const [movieList, setMovieList] = useState();
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [search, setSearch] = useState();

    const onClickBack = () => console.log('Click card list back');
    const onClickForward = () => console.log('Click card list forward');
    const onClickCard = (value) => console.log(`Click a card with ${value.title} Title.`);
    const onClickMenu = (id) => console.log(`Menu: ${id}`);
    const onClickDropdownMenu = (id) => console.log(`drop down Menu: ${id}`);
    const onChangeSearchBar = value => setSearch(value);
    const onClickSearchBar = () => console.log(`search: ${search}`);

    const makeMovieList = () => {
        setMovieList([
            { title: 'First Movie', age: 'ALL', score: 4.1, type: 'Family' },
            { title: 'Second Movie', age: '12', score: 4.3, type: 'Comedy' },
            { title: 'Third Movie', age: '15', score: 3.9, type: 'Action' },
            { title: 'Forth Movie', age: '19', score: 3.1, type: 'Ero' },
            { title: 'Fifth Movie', age: 'ALL', score: 4.1, type: 'Family' },
            { title: 'Sixth Movie', age: 'ALL', score: 4.1, type: 'Family' },
            { title: 'Seventh Movie', age: 'ALL', score: 4.1, type: 'Family' },
            { title: 'Eighth Movie', age: 'ALL', score: 4.1, type: 'Family' },
            { title: 'Ninth Movie', age: 'ALL', score: 4.1, type: 'Family' },
        ]);
    }

    useMemo(makeMovieList, [])

    return (
        <div>
            <Navigation />
            <div className="movie-list-container">
                <div className="movie-list-header">
                    <div className="movie-list-header-title">영화</div>
                </div>
                <div className="movie-list-content">
                    <div className="movie-list-content-box">
                        <div className="movie-list-content-box-top">
                            <DropDown menu={dropdownMenuList}
                                      onClickMenu={onClickDropdownMenu} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="movie-list-content-box-middle">
                            <SortButton onClickMenu={onClickMenu} />
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