import {useNavigate} from "react-router";
import {useState} from "react";
import Select from "../components/Select";
import Button from "../components/Button";

const ManagementTheaterRegister = (props) => {
    const optionList = [
        { id: 'hongdae', value: 0, text: 'MOV홍대점' },
        { id: 'gangnam', value: 1, text: 'MOV강남점' },
        { id: 'haundae', value: 2, text: 'MOV해운대점' },
    ];
    let navigate = useNavigate();
    const [cinema, setCinema] = useState();
    const [number, setNumber] = useState();
    const onChangeName = e => setNumber(e.target.value);
    const onClickButton = value => {
        if (value === 'complete') console.log({ cinema, number });
        if (value === 'cancel') navigate(-1);
    };
    const onClickOption = id => setCinema(id);
    return (
        <div className="management-cinema-register-container">
            <div className="management-cinema-register-title">{props.title}</div>
            <div className="management-cinema-register-content">
                <div className="management-cinema-register-content-box">
                    <div className="management-cinema-register-content-box-top">
                        <div className="management-cinema-register-content-box-top-row">
                            <div className="management-cinema-register-content-box-top-row-col-title">영화관:</div>
                            <Select options={optionList} onChange={onClickOption} />
                        </div>
                        <div className="management-cinema-register-content-box-top-row">
                            <div className="management-cinema-register-content-box-top-row-col-title">번호:</div>
                            <input type="text" placeholder={'번호를 입력하세요.'} onChange={onChangeName}/>
                        </div>
                    </div>
                    <div className="management-cinema-register-content-box-bottom">
                        <Button title={'완료'} width={80} value={'complete'} onClick={onClickButton} />
                        <Button title={'취소'} width={80} outline value={'cancel'} onClick={onClickButton} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementTheaterRegister;