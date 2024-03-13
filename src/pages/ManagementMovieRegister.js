import Button from "../components/Button";
import {useMemo, useState} from "react";
import Attachment from "../components/Attachment";
import {useNavigate} from "react-router";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";

const ManagementMovieRegister = (props) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
    const [inputList, setInputList] = useState([]);
    const [title, setTitle] = useState();
    const [age, setAge] = useState();
    const [director, setDirector] = useState();
    const [releaseDate, setReleaseDate] = useState();
    const [detail, setDetail] = useState();
    const [screenDate, setScreenDate] = useState();
    const [file, setFile] = useState();
    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeAge = e => setAge(e.target.value);
    const onChangeDirector = e => setDirector(e.target.value);
    const onChangeReleaseDate = e => setReleaseDate(e.target.value);
    const onChangeScreenDate = e => setScreenDate(e.target.value);
    const onChangeTextarea = e => setDetail(e.target.value);
    const uploadFile = file => setFile(file);
    const onClickButton = value => {
        if (value === 'complete') {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('detail', detail);
            formData.append('releaseDate', releaseDate);
            formData.append('screenDate', screenDate);
            formData.append('age', age);
            formData.append('file', file);
            const params = {
                grantType: auth.grantType,
                accessToken: auth.accessToken,
                formData
            }
            apiAdmin.createMovie(params)
                .then(response => {
                    const { data } = response;
                    if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화 등록 실패: ${data.msg}`);
                    alert('영화를 정상적으로 등록하였습니다.');
                    navigate(-1);
                })
                .catch(err => alert(`영화 등록 실패: ${err}`));
        }
        if (value === 'cancel') navigate(-1);
    }
    const makeInputList = () => {
        setInputList([
            { keyName: 'title', text: '제목', placeholder: '제목을 입력하세요.', onChange: onChangeTitle },
            { keyName: 'age', text: '연령', placeholder: '연령을 입력하세요.', onChange: onChangeAge },
            { keyName: 'director', text: '감독', placeholder: '감독을 입력하세요.', onChange: onChangeDirector },
            { keyName: 'releaseDate', text: '개봉일', placeholder: '개봉일을 입력하세요.', onChange: onChangeReleaseDate },
            { keyName: 'screenDate', text: '상영일', placeholder: '상영일을 입력하세요.', onChange: onChangeScreenDate },
        ]);
    }
    useMemo(makeInputList, []);
    return (
        <div className="management-movie-register-container">
            <div className="management-movie-register-title">{props.title}</div>
            <div className="management-movie-register-content">
                <div className="management-movie-register-content-box">
                    <div className="management-movie-register-content-box-top">
                        {inputList.length > 0 && inputList.map(value => {
                            return (
                                <div key={`management-movie-register-row-${value.keyName}`} className="management-movie-register-content-box-top-row">
                                    <div className="management-movie-register-content-box-top-row-col-title">{value.text}:</div>
                                    <input type="text" placeholder={value.placeholder} onChange={value.onChange}/>
                                </div>
                            )
                        })}
                    </div>
                    <div className="management-movie-register-content-box-bottom">
                        <textarea name="textarea" id="textarea" cols="30" rows="10" placeholder={'설명을 입력하세요.'} onChange={onChangeTextarea} />
                        <div className="management-movie-register-content-box-bottom-row-attachment">
                            <Attachment upload={uploadFile} />
                        </div>
                        <div className="management-movie-register-content-box-bottom-row-buttons">
                            <Button title={'완료'} width={80} value={'complete'} onClick={onClickButton} />
                            <Button title={'취소'} width={80} value={'cancel'} outline onClick={onClickButton} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagementMovieRegister;