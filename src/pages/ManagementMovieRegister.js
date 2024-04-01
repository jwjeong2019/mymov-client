import Button from "../components/Button";
import {useMemo, useState} from "react";
import Attachment from "../components/Attachment";
import {useNavigate} from "react-router";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";
import apiGenre from "../api/apiGenre";
import Select from "../components/Select";

const ManagementMovieRegister = (props) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
    const [inputList, setInputList] = useState([]);
    const [title, setTitle] = useState();
    const [age, setAge] = useState();
    const [director, setDirector] = useState();
    const [runningTime, setRunningTime] = useState();
    const [releaseDate, setReleaseDate] = useState(Utils.getDateFormat(new Date(), 'yyyy-MM-dd'));
    const [detail, setDetail] = useState();
    const [screenDate, setScreenDate] = useState(Utils.getDateFormat(new Date(), 'yyyy-MM-dd'));
    const [file, setFile] = useState();
    const [genreOptionList, setGenreOptionList] = useState([]);
    const [genreId, setGenreId] = useState();
    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeAge = e => setAge(e.target.value);
    const onChangeDirector = e => setDirector(e.target.value);
    const onChangeRunningTime = e => setRunningTime(e.target.value);
    const onChangeReleaseDate = e => setReleaseDate(e.target.value);
    const onChangeScreenDate = e => setScreenDate(e.target.value);
    const onChangeTextarea = e => setDetail(e.target.value);
    const uploadFile = file => setFile(file);
    const onClickButton = value => {
        if (value === 'complete') createMovie();
        if (value === 'cancel') navigate(-1);
    }
    const onChangeOptionGenre = value => setGenreId(value);
    const init = () => {
        makeInputList();
        makeInitState();
        getGenreList();
    };
    const makeInputList = () => {
        setInputList([
            { keyName: 'title', type: 'text', text: '제목', placeholder: '제목을 입력하세요.', onChange: onChangeTitle },
            { keyName: 'age', type: 'text', text: '연령', placeholder: '연령을 입력하세요.', onChange: onChangeAge },
            { keyName: 'director', type: 'text', text: '감독', placeholder: '감독을 입력하세요.', onChange: onChangeDirector },
            { keyName: 'runningTime', type: 'text', text: '시간', placeholder: '시간을 입력하세요.', onChange: onChangeRunningTime },
            { keyName: 'releaseDate', type: 'date', text: '개봉일', placeholder: '개봉일을 입력하세요.', onChange: onChangeReleaseDate },
            { keyName: 'screenDate', type: 'date', text: '상영일', placeholder: '상영일을 입력하세요.', onChange: onChangeScreenDate },
            { keyName: 'genres', text: '장르' },
        ]);
    };
    const makeInitState = () => {
        const nowDate = new Date();
        const date = Utils.getDateFormat(nowDate, 'yyyy-MM-dd');
        setReleaseDate(date);
        setScreenDate(date);
    }
    const createMovie = () => {
        const genreIds = [ genreId ];
        const data = JSON.stringify({
            title,
            detail,
            releaseDate: `${releaseDate} 00:00:00`,
            screenDate: `${screenDate} 00:00:00`,
            age,
            genreIds,
            director,
            runningTime
        });
        const formData = new FormData();
        formData.append('data', data);
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
                navigate('/admin/management/movie/list');
            })
            .catch(err => alert(`영화 등록 실패: ${err}`));
    }
    const getGenreList = () => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            page: 0,
            size: 1000,
        };
        apiGenre.getList(params)
            .then(response => {
                const { data } = response;
                if (data.result.totalElements > 0) {
                    const array = data.result.content.map(genre => ({
                        id: genre.id,
                        value: genre.id,
                        text: genre.name,
                    }));
                    setGenreOptionList(array);
                }
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="management-movie-register-container">
            <div className="management-movie-register-title font-HakDotR">{props.title}</div>
            <div className="management-movie-register-content">
                <div className="management-movie-register-content-box">
                    <div className="management-movie-register-content-box-top">
                        {inputList.length > 0 && inputList.map(input => {
                            let value = undefined;
                            if (input.keyName === 'releaseDate') value = releaseDate;
                            if (input.keyName === 'screenDate') value = screenDate;

                            let tagInput = <input className="font-HakDotR" type={input.type} placeholder={input.placeholder} value={value} onChange={input.onChange}/>;
                            if (input.keyName === 'genres') tagInput = <Select options={genreOptionList} onChange={onChangeOptionGenre} />
                            return (
                                <div key={`management-movie-register-row-${input.keyName}`} className="management-movie-register-content-box-top-row">
                                    <div className="management-movie-register-content-box-top-row-col-title font-HakDotR">{input.text}:</div>
                                    {tagInput}
                                </div>
                            )
                        })}
                    </div>
                    <div className="management-movie-register-content-box-bottom">
                        <textarea className="font-HakDotR" name="textarea" id="textarea" cols="30" rows="10" placeholder={'설명을 입력하세요.'} onChange={onChangeTextarea} />
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