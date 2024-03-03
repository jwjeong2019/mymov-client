import Navigation from "../components/Navigation";
import '../css/Timetable.css';
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import {useState} from "react";

const Timetable = () => {
    const headers = ['제목', '연령', '평점', '감독', '장르', '영화시간', '영화관', '상영관', '시작시간', '예매하기'];
    const bodies = [
        { id: 0, title: 'First Movie', age: 'ALL', score: 4.5, director: '존 스미스', genre: 'comedy', movieTime: 120, cinema: 'MOV홍대점', theater: 1, startTime: '16:55' },
        { id: 1, title: 'Second Movie', age: 12, score: 4.1, director: '존 스미스', genre: 'fun', movieTime: 126, cinema: 'MOV홍대점', theater: 2, startTime: '15:55' },
        { id: 2, title: 'Third Movie', age: 15, score: 4.2, director: '존 스미스', genre: 'action', movieTime: 132, cinema: 'MOV강남점', theater: 3, startTime: '17:55' },
    ];
    const dropdownMenu = [
        { id: 'title', text: '제목' },
        { id: 'cinema', text: '영화관' },
    ];
    const totalElements = 27;
    const page = 3;
    const size = 10;
    const [search, setSearch] = useState();
    const onClickTable = id => console.log(`timetable id: ${id}`);
    const onClickPage = number => console.log(`go page: ${number}`);
    const onClickMenu = id => console.log(`menu id: ${id}`);
    const onChangeSearchBar = value => setSearch(value);
    const onClickSearchBar = () => console.log(`search: ${search}`);
    const onClickSortButton = id => console.log(`sort id: ${id}`);
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
                            <SortButton onClickMenu={onClickSortButton} />
                        </div>
                        <div className="timetable-content-box-bottom">
                            <Table headers={headers}
                                   bodies={bodies}
                                   total={totalElements}
                                   page={page}
                                   size={size}
                                   onClickPage={onClickPage}
                                   onClick={onClickTable} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timetable;