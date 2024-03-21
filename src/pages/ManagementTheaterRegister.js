import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Select from "../components/Select";
import Button from "../components/Button";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";
import apiCinema from "../api/apiCinema";

const ManagementTheaterRegister = (props) => {
    // const optionList = [
    //     { id: 'hongdae', value: 0, text: 'MOV홍대점' },
    //     { id: 'gangnam', value: 1, text: 'MOV강남점' },
    //     { id: 'haundae', value: 2, text: 'MOV해운대점' },
    // ];
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
    const [cinemaId, setCinemaId] = useState();
    const [number, setNumber] = useState();
    const [optionList, setOptionList] = useState([]);
    const onChangeNumber = e => setNumber(e.target.value);
    const onClickButton = value => {
        if (value === 'complete') createTheater();
        if (value === 'cancel') navigate(-1);
    };
    const onClickOption = value => setCinemaId(value);
    const init = () => getCinemaList();
    const getCinemaList = () => {
        apiCinema.getList()
            .then(response => {
                const { data } = response;
                if (data.result.length > 0) {
                    const array = data.result.map(value => ({
                        id: value.id,
                        value: value.id,
                        text: value.name,
                    }));
                    setOptionList(array);
                }
            })
            .catch(err => alert(`영화관 데이터 로드 실패:\n${err.message}`));
    }
    const createTheater = () => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            cinemaId: cinemaId,
            number
        };
        apiAdmin.createTheater(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`상영관 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`상영관 등록 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('상영관을 정상적으로 등록하였습니다.');
                navigate('/admin/management/theater/list');
            })
            .catch(err => alert(`상영관 등록 실패:\n${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="management-cinema-register-container">
            <div className="management-cinema-register-title font-HakDotR">{props.title}</div>
            <div className="management-cinema-register-content">
                <div className="management-cinema-register-content-box">
                    <div className="management-cinema-register-content-box-top">
                        <div className="management-cinema-register-content-box-top-row">
                            <div className="management-cinema-register-content-box-top-row-col-title font-HakDotR">영화관:</div>
                            <Select options={optionList} onChange={onClickOption} />
                        </div>
                        <div className="management-cinema-register-content-box-top-row">
                            <div className="management-cinema-register-content-box-top-row-col-title font-HakDotR">번호:</div>
                            <input className="font-HakDotR" type="text" placeholder={'번호를 입력하세요.'} onChange={onChangeNumber}/>
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