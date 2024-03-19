import Navigation from "../components/Navigation";
import '../css/Reservation.css';
import Button from "../components/Button";
import {useLocation, useNavigate, useParams} from "react-router";
import DropDown from "../components/DropDown";
import {useMemo, useState} from "react";
import {IoCheckmarkCircleOutline} from "react-icons/io5";
import apiCinema from "../api/apiCinema";
import apiTheater from "../api/apiTheater";
import apiTimetable from "../api/apiTimetable";
import apiMember from "../api/apiMember";
import {Utils} from "../utils/Utils";

const Reservation = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let params = useParams();
    let location = useLocation();
    let navigate = useNavigate();
    const [isCompleted, setIsCompleted] = useState(false);
    const [data, setData] = useState({});
    const [movieId, setMovieId] = useState();
    const [cinemaId, setCinemaId] = useState();
    const [theaterId, setTheaterId] = useState();
    const [seatId, setSeatId] = useState();
    const [timetableId, setTimetableId] = useState();
    const [cinemaMenu, setCinemaMenu] = useState([]);
    const [theaterMenu, setTheaterMenu] = useState([]);
    const [seatMenu, setSeatMenu] = useState([]);
    const [timeMenu, setTimeMenu] = useState([]);
    const onClickDropDownCinema = (value) => {
        setCinemaId(value.id);
        setTheaterId(undefined);
        setSeatId(undefined);
        setTimetableId(undefined);
        setTheaterMenu(value.theaterList);
        setSeatMenu([]);
        setTimeMenu([]);
    }
    const onClickDropDownTheater = (id) => {
        setTheaterId(id);
        getTheaterDetail(id);
        getTimetableList(id);
    }
    const onClickDropDownTime = (id) => setTimetableId(id);
    const onClickDropDownSeat = (id) => setSeatId(id);
    const onClickBack = () => navigate(-1);
    const onClickButton = value => {
        const { mode } = params;
        if (mode === 'step1' && value === 'pay') createTicketStep1();
        if (mode === 'step2' && value === 'pay') createTicketStep2();
        if (value === 'cancel') navigate(-1);
    }
    const init = () => {
        const { state } = location;
        const { mode } = params;
        setData(state);
        setMovieId(state.movieId);
        if (mode === 'step1') getCinemaList();
        if (mode === 'step2') getTheaterDetail(state.theaterId);
    };
    const getCinemaList = () => {
        apiCinema.getList()
            .then(response => {
                const { data } = response;
                if (data.result.length > 0) {
                    const array = data.result.map(cinema => ({
                        id: cinema.id,
                        text: cinema.name,
                        theaterList: makeTheaterList(cinema.theaters),
                    }));
                    setCinemaMenu(array);
                }
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    const makeTheaterList = theaters => {
        if (theaters?.length === 0) return [];
        return theaters.map(theater => ({
            id: theater.id,
            text: `${theater.number}상영관`,
        }));
    }
    const getTheaterDetail = (id) => {
        const params = {
            id,
        };
        apiTheater.getDetail(params)
            .then(response => {
                const { data } = response;
                const array = data.result.seats.map(seat => ({
                    id: seat.id,
                    text: seat.position,
                    status: seat.status,
                }));
                const emptySeatList = array.filter(value => value.status === 'EMPTY');
                setSeatMenu(emptySeatList);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    const getTimetableList = (theaterId) => {
        const params = {
            movieId,
            cinemaId,
            theaterId,
        };
        apiTimetable.getListByIds(params)
            .then(response => {
                const { data } = response;
                const array = data.result.map(timetable => ({
                    id: timetable.id,
                    text: timetable.startTime,
                }));
                setTimeMenu(array);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    const createTicketStep1 = () => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            timetableId,
            seatId,
            price: 14000,
        };
        apiMember.createTicket(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`예매 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`예매 실패:\n${data.msg}`);
                setIsCompleted(true);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    const createTicketStep2 = () => {
        const { state } = location;
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            timetableId: state.timetableId,
            seatId,
            price: 14000,
        };
        apiMember.createTicket(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`예매 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`예매 실패:\n${data.msg}`);
                setIsCompleted(true);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    useMemo(init, []);
    return (
        <div>
            <Navigation />
            <div className="reservation-container">
                <div className="reservation-header">
                    <div className="reservation-header-title">예매</div>
                </div>
                <div className="reservation-content">
                    {isCompleted ?
                        <div className="reservation-complete-box">
                            <div className="reservation-complete-box-center">
                                <div className="reservation-complete-box-center-top">
                                    <div className="reservation-complete-box-center-top-icon"><IoCheckmarkCircleOutline /></div>
                                    <div className="reservation-complete-box-center-top-text">예매를 완료하였습니다.</div>
                                </div>
                                <Button title="돌아가기" outline onClick={onClickBack} />
                            </div>
                        </div>
                        :
                        <div className="reservation-box">
                            <div className="reservation-box-top">
                                <div className="reservation-box-row">{`제목: ${data?.movieTitle}`}</div>
                                <div className="reservation-box-row">{`연령: ${data?.movieAge}`}</div>
                                <div className="reservation-box-row">{`감독: ${data?.movieDirector}`}</div>
                                <div className="reservation-box-row">{`시간: ${data?.movieTime}`}</div>
                                {params?.mode === 'step1' ?
                                    <div className="reservation-box-row-dropdown">
                                        <div className="reservation-box-column-text">영화관:</div>
                                        <DropDown width={185}
                                                  menu={cinemaMenu}
                                                  advanced
                                                  onClickMenu={onClickDropDownCinema} />
                                    </div>
                                    :
                                    <div className="reservation-box-row">{`영화관: ${data?.cinemaName}`}</div>
                                }
                                {params?.mode === 'step1' ?
                                    <div className="reservation-box-row-dropdown">
                                        <div className="reservation-box-column-text">상영관:</div>
                                        <DropDown width={185}
                                                  menu={theaterMenu}
                                                  onClickMenu={onClickDropDownTheater} />
                                    </div>
                                    :
                                    <div className="reservation-box-row">{`상영관: ${data?.theaterNumber}상영관`}</div>
                                }
                                {params?.mode === 'step1' ?
                                    <div className="reservation-box-row-dropdown">
                                        <div className="reservation-box-column-text">시작시간:</div>
                                        <DropDown width={185}
                                                  menu={timeMenu}
                                                  onClickMenu={onClickDropDownTime} />
                                    </div>
                                    :
                                    <div className="reservation-box-row">{`시작시간: ${data?.startTime}`}</div>
                                }
                                <div className="reservation-box-row-dropdown">
                                    <div className="reservation-box-column-text">좌석:</div>
                                    <DropDown width={185}
                                              menu={seatMenu}
                                              onClickMenu={onClickDropDownSeat} />
                                </div>
                            </div>
                            <div className="reservation-box-bottom">
                                <div className="reservation-box-row-account">
                                    <div className="reservation-box-column-text">총 결제금액</div>
                                    <div className="reservation-box-column-account">14,000원</div>
                                </div>
                                <Button title="결제하기"
                                        value={'pay'}
                                        onClick={onClickButton} />
                                <Button title="취소"
                                        outline
                                        value={'cancel'}
                                        onClick={onClickButton} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Reservation;