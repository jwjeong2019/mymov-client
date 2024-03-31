import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";

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
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            name: genre,
        };
        apiAdmin.createGenre(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`장르 생성 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`장르 생성 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('authority', data.msg)) return alert(`권한 실패:\n${data.msg}`);
                alert('장르를 정상적으로 등록하였습니다.');
                navigate('/admin/management/genre/list');
            })
            .catch(err => alert(`ERROR: ${err.message}`));
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