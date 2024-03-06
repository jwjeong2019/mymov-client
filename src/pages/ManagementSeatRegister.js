import {useNavigate} from "react-router";
import {useState} from "react";
import Select from "../components/Select";
import Button from "../components/Button";

const ManagementSeatRegister = (props) => {
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
    const [cinema, setCinema] = useState();
    const [theater, setTheater] = useState();
    const [seat, setSeat] = useState();
    const onChangeSeat = e => setSeat(e.target.value);
    const onClickButton = value => {
        if (value === 'complete') console.log({ cinema, theater, seat });
        if (value === 'cancel') navigate(-1);
    };
    const onClickOptionCinema = value => setCinema(value);
    const onClickOptionTheater = value => setTheater(value);
    return (
        <div className="management-seat-register-container">
            <div className="management-seat-register-title">{props.title}</div>
            <div className="management-seat-register-content">
                <div className="management-seat-register-content-box">
                    <div className="management-seat-register-content-box-top">
                        <div className="management-seat-register-content-box-top-row">
                            <div className="management-seat-register-content-box-top-row-col-title">영화관:</div>
                            <Select options={cinemaOptionList} onChange={onClickOptionCinema} />
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