import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Select from "../components/Select";
import Button from "../components/Button";
import apiCinema from "../api/apiCinema";
import apiMovie from "../api/apiMovie";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";

const ManagementTimetableRegister = (props) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
    const [movieId, setMovieId] = useState();
    const [cinemaId, setCinemaId] = useState();
    const [theaterId, setTheaterId] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [movieOptionList, setMovieOptionList] = useState([]);
    const [cinemaOptionList, setCinemaOptionList] = useState([]);
    const [theaterOptionList, setTheaterOptionList] = useState([]);
    const onChangeStartDate = e => setStartDate(e.target.value);
    const onChangeEndDate = e => setEndDate(e.target.value);
    const onChangeStartTime = e => setStartTime(e.target.value);
    const onChangeEndTime = e => setEndTime(e.target.value);
    const onClickButton = value => {
        if (value === 'complete') createTimetable();
        if (value === 'cancel') navigate(-1);
    };
    const onClickOptionMovie = value => setMovieId(value);
    const onClickOptionCinema = value => {
        if (value === 'no-value') setTheaterOptionList([]);
        else {
            setCinemaId(value.id);
            setTheaterOptionList(value.theaterList);
        }
    }
    const onClickOptionTheater = value => setTheaterId(value);
    const init = () => {
        getMovieList();
        getCinemaList();
    };
    const getMovieList = () => {
        const params = {
            page: 0,
            size: 10000,
        };
        apiMovie.getList(params)
            .then(response => {
                const { data } = response;
                if (data.result.totalElements > 0) {
                    const array = data.result.content.map(value => ({
                        id: value.id,
                        value: value.id,
                        text: value.title,
                    }));
                    setMovieOptionList(array);
                }
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
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
    const createTimetable = () => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            cinemaId,
            theaterId,
            movieId,
            startDate,
            endDate,
            startTime,
            endTime,
        };
        apiAdmin.createTimetable(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`상영표 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('must', data.msg)) return alert(`상영표 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert(`상영표를 정상적으로 등록하였습니다.`);
                navigate('/admin/management/timetable/list');
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="management-timetable-register-container">
            <div className="management-timetable-register-title">{props.title}</div>
            <div className="management-timetable-register-content">
                <div className="management-timetable-register-content-box">
                    <div className="management-timetable-register-content-box-top">
                        <div className="management-timetable-register-content-box-top-row">
                            <div className="management-timetable-register-content-box-top-row-col-title">영화명:</div>
                            <Select options={movieOptionList} onChange={onClickOptionMovie} />
                        </div>
                        <div className="management-timetable-register-content-box-top-row">
                            <div className="management-timetable-register-content-box-top-row-col-title">영화관:</div>
                            <Select advanced options={cinemaOptionList} onChange={onClickOptionCinema} />
                        </div>
                        <div className="management-timetable-register-content-box-top-row">
                            <div className="management-timetable-register-content-box-top-row-col-title">상영관:</div>
                            <Select options={theaterOptionList} onChange={onClickOptionTheater} />
                        </div>
                        <div className="management-timetable-register-content-box-top-row">
                            <div className="management-timetable-register-content-box-top-row-col-title">상영 시작일:</div>
                            <input type="text" placeholder={'상영 시작일을 입력하세요.'} onChange={onChangeStartDate}/>
                        </div>
                        <div className="management-timetable-register-content-box-top-row">
                            <div className="management-timetable-register-content-box-top-row-col-title">상영 종료일:</div>
                            <input type="text" placeholder={'상영 종료일을 입력하세요.'} onChange={onChangeEndDate}/>
                        </div>
                        <div className="management-timetable-register-content-box-top-row">
                            <div className="management-timetable-register-content-box-top-row-col-title">시작시간:</div>
                            <input type="text" placeholder={'시작시간을 입력하세요.'} onChange={onChangeStartTime}/>
                        </div>
                        <div className="management-timetable-register-content-box-top-row">
                            <div className="management-timetable-register-content-box-top-row-col-title">종료시간:</div>
                            <input type="text" placeholder={'종료시간을 입력하세요.'} onChange={onChangeEndTime}/>
                        </div>
                    </div>
                    <div className="management-timetable-register-content-box-bottom">
                        <Button title={'완료'} width={80} value={'complete'} onClick={onClickButton} />
                        <Button title={'취소'} width={80} outline value={'cancel'} onClick={onClickButton} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementTimetableRegister;