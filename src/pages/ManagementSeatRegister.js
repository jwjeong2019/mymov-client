import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Select from "../components/Select";
import Button from "../components/Button";
import apiCinema from "../api/apiCinema";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";

const ManagementSeatRegister = (props) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
    const [cinemaId, setCinemaId] = useState();
    const [theaterId, setTheaterId] = useState();
    const [seat, setSeat] = useState();
    const [cinemaOptionList, setCinemaOptionList] = useState([]);
    const [theaterOptionList, setTheaterOptionList] = useState([]);
    const onChangeSeat = e => setSeat(e.target.value);
    const onClickButton = value => {
        if (value === 'complete') createSeat();
        if (value === 'cancel') navigate(-1);
    };
    const onClickOptionCinema = value => {
        if (value === 'no-value') setTheaterOptionList([]);
        else {
            setCinemaId(value.id);
            setTheaterOptionList(value.theaterList);
        }
    }
    const onClickOptionTheater = value => setTheaterId(value);
    const init = () => getCinemaList();
    const getCinemaList = () => {
        const params = {
            page: 0,
            size: 10000,
        };
        apiCinema.getList(params)
            .then(response => {
                const { data } = response;
                if (data.result.length > 0) {
                    const array = data.result.map(value => ({
                        id: value.id,
                        value: value.id,
                        text: value.name,
                        theaterList: makeTheaterList(value.theaters),
                    }));
                    setCinemaOptionList(array);
                }
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    const makeTheaterList = theaters => {
        if (theaters?.length === 0) return [];
        return theaters.map(value => ({
            id: value.id,
            value: value.id,
            text: `${value.number}상영관`,
        }));
    };
    const createSeat = () => {
        const seatList = [
            { position: seat },
        ];
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            theaterId,
            seats: seatList,
        };
        apiAdmin.createSeat(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`좌석 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('좌석을 정상적으로 등록하였습니다.');
                navigate('/admin/management/seat/list');
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="management-seat-register-container">
            <div className="management-seat-register-title">{props.title}</div>
            <div className="management-seat-register-content">
                <div className="management-seat-register-content-box">
                    <div className="management-seat-register-content-box-top">
                        <div className="management-seat-register-content-box-top-row">
                            <div className="management-seat-register-content-box-top-row-col-title">영화관:</div>
                            <Select advanced options={cinemaOptionList} onChange={onClickOptionCinema} />
                        </div>
                        <div className="management-seat-register-content-box-top-row">
                            <div className="management-seat-register-content-box-top-row-col-title">상영관:</div>
                            <Select options={theaterOptionList} onChange={onClickOptionTheater} />
                        </div>
                        <div className="management-seat-register-content-box-top-row">
                            <div className="management-seat-register-content-box-top-row-col-title">좌석명:</div>
                            <input type="text" placeholder={'좌석을 입력하세요.'} onChange={onChangeSeat}/>
                        </div>
                    </div>
                    <div className="management-seat-register-content-box-bottom">
                        <Button title={'완료'} width={80} value={'complete'} onClick={onClickButton} />
                        <Button title={'취소'} width={80} outline value={'cancel'} onClick={onClickButton} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementSeatRegister;