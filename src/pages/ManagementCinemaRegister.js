import Button from "../components/Button";
import {useState} from "react";
import {useNavigate} from "react-router";
import Select from "../components/Select";

const ManagementCinemaRegister = (props) => {
    const optionList = [
        { id: 'seoul', value: 'seoul', text: '서울' },
        { id: 'incheon', value: 'incheon', text: '인천' },
        { id: 'suwon', value: 'suwon', text: '수원' },
        { id: 'daejeon', value: 'daejeon', text: '대전' },
        { id: 'daegu', value: 'daegu', text: '대구' },
        { id: 'ulsan', value: 'ulsan', text: '울산' },
        { id: 'busan', value: 'busan', text: '부산' },
        { id: 'jeju', value: 'jeju', text: '제주도' },
    ];
    let navigate = useNavigate();
    const [name, setName] = useState();
    const [region, setRegion] = useState();
    const onChangeName = e => setName(e.target.value);
    const onClickButton = value => {
        if (value === 'complete') console.log({ name, region });
        if (value === 'cancel') navigate(-1);
    };
    const onClickOption = id => setRegion(id);
    return (
        <div className="management-cinema-register-container">
            <div className="management-cinema-register-title">{props.title}</div>
            <div className="management-cinema-register-content">
                <div className="management-cinema-register-content-box">
                    <div className="management-cinema-register-content-box-top">
                        <div className="management-cinema-register-content-box-top-row">
                            <div className="management-cinema-register-content-box-top-row-col-title">이름:</div>
                            <input type="text" placeholder={'이름을 입력하세요.'} onChange={onChangeName}/>
                        </div>
                        <div className="management-cinema-register-content-box-top-row">
                            <div className="management-cinema-register-content-box-top-row-col-title">지역:</div>
                            <Select options={optionList} onChange={onClickOption} />
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

export default ManagementCinemaRegister;