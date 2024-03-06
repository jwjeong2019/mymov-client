import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";

const ManagementSeatList = (props) => {
    const dropdownMenu = [
        { id: 'theaterNumber', text: '상영관' },
        { id: 'cinemaName', text: '영화관' },
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
        if (value === 'register') navigate(`/admin/management/seat/${value}`);
    }
    const onClickPage = number => console.log(`click page: ${number}`);
    const onClickButtonDelete = value => console.log(`delete button value: ${value}`);
    const makeTable = () => {
        setHeaders(['좌석번호', '좌석명', '상영관', '영화관', '지역', '삭제']);
        setBodies([
            { id: 0, seatId: 0, name: 'A1', theaterNumber: `${1}상영관`, cinemaName: 'MOV홍대점', cinemaRegion: '서울', button: <Button title={'삭제'} type={'caution'} value={0} onClick={onClickButtonDelete} /> },
            { id: 1, seatId: 1, name: 'A2', theaterNumber: `${2}상영관`, cinemaName: 'MOV강남점', cinemaRegion: '서울', button: <Button title={'삭제'} type={'caution'} value={1} onClick={onClickButtonDelete} /> },
            { id: 2, seatId: 2, name: 'A3', theaterNumber: `${3}상영관`, cinemaName: 'MOV해운대점', cinemaRegion: '부산', button: <Button title={'삭제'} type={'caution'} value={2} onClick={onClickButtonDelete} /> },
        ]);
        setPage(3);
        setSize(10);
        setTotalElements(27);
    };
    useMemo(makeTable, []);
    return (
        <div className="management-seat-list-container">
            <div className="management-seat-list-title">{props.title}</div>
            <div className="management-seat-list-content">
                <div className="management-seat-list-content-box">
                    <div className="management-seat-list-content-box-row-search">
                        <div className="management-seat-list-content-box-row-search-col-left">
                            <DropDown menu={dropdownMenu} onClickMenu={onClickDropDown} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="management-seat-list-content-box-row-search-col-right">
                            <Button title={'등록'}
                                    value={'register'}
                                    width={80} onClick={onClickButton} />
                            <SortButton onClickMenu={onClickSortButton} />
                        </div>
                    </div>
                    <div className="management-seat-list-content-box-row-table">
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

export default ManagementSeatList;