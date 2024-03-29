import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";

const ManagementGenreRegister = (props) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
    const [genre, setGenre] = useState();
    const onChangeGenre = e => setGenre(e.target.value);
    const onClickButton = value => {
        if (value === 'complete') createGenre();
        if (value === 'cancel') navigate(-1);
    };
    const createGenre = () => {
    }
    return (
        <div className="management-genre-register-container">
            <div className="management-genre-register-title font-HakDotR">{props.title}</div>
            <div className="management-genre-register-content">
                <div className="management-genre-register-content-box">
                    <div className="management-genre-register-content-box-top">
                        <div className="management-genre-register-content-box-top-row">
                            <div className="management-genre-register-content-box-top-row-col-title font-HakDotR">장르명:</div>
                            <input className="font-HakDotR" type="text" placeholder={'장르명을 입력하세요.'} onChange={onChangeGenre}/>
                        </div>
                    </div>
                    <div className="management-genre-register-content-box-bottom">
                        <Button title={'완료'} width={80} value={'complete'} onClick={onClickButton} />
                        <Button title={'취소'} width={80} outline value={'cancel'} onClick={onClickButton} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementGenreRegister;