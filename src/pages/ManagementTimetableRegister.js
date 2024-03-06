import {useNavigate} from "react-router";
import {useState} from "react";
import Select from "../components/Select";
import Button from "../components/Button";

const ManagementTimetableRegister = (props) => {
    const movieOptionList = [
        { id: 'first-movie', value: 0, text: 'First Movie' },
        { id: 'second-movie', value: 1, text: 'Second Movie' },
        { id: 'third-movie', value: 2, text: 'Third Movie' },
    ];
    const cinemaOptionList = [
        { id: 'hongdae', value: 0, text: 'MOV홍대점' },
        { id: 'gangnam', value: 1, text: 'MOV강남점' },
        { id: 'haundae', value: 2, text: 'MOV해운대점' },
    ];
    const theaterOptionList = [
        { id: 'theater1', value: 0, text: '1상영관' },
        { id: 'theater2', value: 1, text: '2상영관' },
        { id: 'theater3', value: 2, text: '3상영관' },
    ];
    let navigate = useNavigate();
    const [movie, setMovie] = useState();
    const [cinema, setCinema] = useState();
    const [theater, setTheater] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const onChangeStartDate = e => setStartDate(e.target.value);
    const onChangeEndDate = e => setEndDate(e.target.value);
    const onChangeStartTime = e => setStartTime(e.target.value);
    const onChangeEndTime = e => setEndTime(e.target.value);
    const onClickButton = value => {
        if (value === 'complete') console.log({ movie, cinema, theater, startDate, endDate, startTime, endTime });
        if (value === 'cancel') navigate(-1);
    };
    const onClickOptionMovie = value => setMovie(value);
    const onClickOptionCinema = value => setCinema(value);
    const onClickOptionTheater = value => setTheater(value);
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
                            <Select options={cinemaOptionList} onChange={onClickOptionCinema} />
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