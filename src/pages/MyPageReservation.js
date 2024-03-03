import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import {useMemo, useState} from "react";
import Button from "../components/Button";

const MyPageReservation = (props) => {
    const dropdownMenu = [
        { id: 'title', text: '제목' },
        { id: 'cinema', text: '영화관' },
        { id: 'status', text: '예매상태' },
    ];
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
    const onClickButtonStatus = () => console.log('click button status');
    const onClickPage = number => console.log(`click page: ${number}`);
    const makeTable = () => {
        setHeaders(['예매번호', '제목', '내용', '영화관', '상영관', '시작시간', '좌석', '예매상태']);
        setBodies([
            { id: 0, number: 0, title: 'First Movie', detail: '상세보기', cinema: 'MOV홍대점', theater: 1, startTime: '16:55', seat: 'A1', status: <Button title={'예매취소'} outline onClick={onClickButtonStatus} /> },
            { id: 1, number: 1, title: 'Second Movie', detail: '상세보기', cinema: 'MOV강남점', theater: 1, startTime: '13:55', seat: 'B1', status: '예매완료' },
            { id: 2, number: 2, title: 'Third Movie', detail: '상세보기', cinema: 'MOV홍대점', theater: 2, startTime: '15:55', seat: 'A3', status: '취소완료' },
        ]);
        setPage(3);
        setSize(10);
        setTotalElements(27);
    };
    useMemo(makeTable, []);
    return (
        <div className="mypage-reservation-container">
            <div className="mypage-reservation-title">{props.title}</div>
            <div className="mypage-reservation-search">
                <div className="mypage-reservation-search-left">
                    <DropDown menu={dropdownMenu} onClickMenu={onClickDropDown} />
                    <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                </div>
                <div className="mypage-reservation-search-right">
                    <SortButton onClickMenu={onClickSortButton} />
                </div>
            </div>
            <div className="mypage-reservation-table">
                <Table headers={headers}
                       bodies={bodies}
                       page={page}
                       size={size}
                       total={totalElements}
                       onClickPage={onClickPage} />
            </div>
        </div>
    )
}

export default MyPageReservation;