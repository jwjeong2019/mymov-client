import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import Table from "../components/Table";
import apiCinema from "../api/apiCinema";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";

const ManagementCinemaList = (props) => {
    const dropdownMenu = [
        { id: 'name', text: '이름' },
        { id: 'region', text: '지역' },
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
    const [sortType, setSortType] = useState();
    const [sortList, setSortList] = useState([]);
    const onClickDropDown = id => console.log(`dropdown id: ${id}`);
    const onChangeSearchBar = value => setSearch(value);
    const onClickSearchBar = () => console.log(`search: ${search}`);
    const onClickSortButton = id => console.log(`sort id: ${id}`);
    const onClickButton = value => {
        if (value === 'register') navigate(`/admin/management/cinema/${value}`);
    }
    const onClickPage = number => console.log(`click page: ${number}`);
    const onClickButtonDelete = id => {
        let isOk = window.confirm('삭제하시겠습니까?');
        if (isOk) deleteCinema(id);
    }
    const init = () => {
        setHeaders(['영화관번호', '이름', '지역', '삭제']);
        setSortList([
            { id: 'region', text: '지역순' },
        ]);
        getCinemaList();
    }
    const getCinemaList = () => {
        apiCinema.getList()
            .then(response => {
                const { data } = response;
                if (data.result.length > 0) {
                    const array = data.result.map(value => ({
                        id: value.id,
                        cinemaId: value.id,
                        name: value.name,
                        region: value.region,
                        button: <Button title={'삭제'}
                                        type={'caution'}
                                        value={value.id}
                                        onClick={onClickButtonDelete}/>
                    }));
                    setBodies(array);
                }
            })
            .catch(err => alert(`데이터 로드 실패:\n${err.message}`));
    }
    const deleteCinema = (id) => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            id,
        };
        apiAdmin.deleteCinema(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화 삭제 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('영화를 정상적으로 삭제하였습니다.');
                getCinemaList();
            })
            .catch(err => alert(`영화 삭제 실패:\n${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="management-cinema-list-container">
            <div className="management-cinema-list-title font-HakDotR">{props.title}</div>
            <div className="management-cinema-list-content">
                <div className="management-cinema-list-content-box">
                    <div className="management-cinema-list-content-box-row-search">
                        <div className="management-cinema-list-content-box-row-search-col-left">
                            <DropDown menu={dropdownMenu} onClickMenu={onClickDropDown} />
                            <SearchBar onChange={onChangeSearchBar} onClick={onClickSearchBar} />
                        </div>
                        <div className="management-cinema-list-content-box-row-search-col-right">
                            <Button title={'등록'}
                                    value={'register'}
                                    width={80} onClick={onClickButton} />
                            <SortButton list={sortList} onClickMenu={onClickSortButton} />
                        </div>
                    </div>
                    <div className="management-cinema-list-content-box-row-table">
                        <Table headers={headers}
                               bodies={bodies}
                               onClickPage={onClickPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementCinemaList;