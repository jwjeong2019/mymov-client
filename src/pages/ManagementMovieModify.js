import {useLocation, useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import Attachment from "../components/Attachment";
import apiAdmin from "../api/apiAdmin";
import {Utils} from "../utils/Utils";
import Select from "../components/Select";
import apiGenre from "../api/apiGenre";

const ManagementMovieModify = (props) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
    let location = useLocation();
    const [inputList, setInputList] = useState([]);
    const [title, setTitle] = useState();
    const [age, setAge] = useState();
    const [director, setDirector] = useState();
    const [runningTime, setRunningTime] = useState();
    const [releaseDate, setReleaseDate] = useState();
    const [screenDate, setScreenDate] = useState();
    const [detail, setDetail] = useState();
    const [imageUrl, setImageUrl] = useState();
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
        if (value === 'complete') updateMovieDetail(location.state.id);
        if (value === 'cancel') navigate('/admin/management/movie/list');
    }
    const onChangeOptionGenre = value => setGenreId(value);
    const init = () => {
        const { state } = location;
        const array = state.inputList.map(object => {
            let result = {
                keyName: object.keyName,
                text: object.text,
                value: object.value,
                placeholder: '',
                onChangeState: () => {}
            };
            if (object.keyName === 'title') {
                result.placeholder = '제목을 입력하세요.';
                result.onChangeState = onChangeTitle;
                setTitle(object.value);
            } else if (object.keyName === 'age') {
                result.placeholder = '연령을 입력하세요.';
                result.onChangeState = onChangeAge;
                setAge(object.value);
            } else if (object.keyName === 'releaseDate') {
                result.placeholder = '개봉일을 입력하세요.';
                result.onChangeState = onChangeReleaseDate;
                setReleaseDate(object.value);
            } else if (object.keyName === 'screenDate') {
                result.placeholder = '상영일을 입력하세요.';
                result.onChangeState = onChangeScreenDate;
                setScreenDate(object.value);
            } else if (object.keyName === 'director') {
                result.placeholder = '감독을 입력하세요.';
                result.onChangeState = onChangeDirector;
                setDirector(object.value);
            } else if (object.keyName === 'runningTime') {
                result.placeholder = '시간을 입력하세요.';
                result.onChangeState = onChangeRunningTime;
                setRunningTime(object.value);
            }
            return result;
        });
        setInputList(array);
        setDetail(state.detail);
        setImageUrl(state.imageUrl);
        getGenreList();
    }
    const updateMovieDetail = (id) => {
        const genreIds = [ genreId ];
        const data = JSON.stringify({
            title,
            detail,
            releaseDate,
            screenDate,
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
            id,
            formData
        }
        apiAdmin.updateMovie(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화 수정 실패: ${data.msg}`);
                alert('영화를 정상적으로 수정하였습니다.');
                navigate(`/admin/management/movie/detail`, {
                    state: location.state
                });
            })
            .catch(err => alert(`영화 수정 실패:\n${err.message}`));
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
        <div className="management-movie-modify-container">
            <div className="management-movie-modify-title font-HakDotR">{props.title}</div>
            <div className="management-movie-modify-content">
                <div className="management-movie-modify-content-box">
                    <div className="management-movie-modify-content-box-top">
                        <img src={imageUrl} alt="movie_poster" />
                        <div className="management-movie-modify-content-box-top-detail">
                            {inputList.length > 0 && inputList.map(value => {
                                let state = ''
                                if (value.keyName === 'title') state = title;
                                if (value.keyName === 'age') state = age;
                                if (value.keyName === 'releaseDate') state = releaseDate;
                                if (value.keyName === 'screenDate') state = screenDate;
                                if (value.keyName === 'director') state = director;
                                if (value.keyName === 'runningTime') state = runningTime;

                                let tagInput = <input type="text" placeholder={value.placeholder} value={state} onChange={value.onChangeState}/>;
                                if (value.keyName === 'genres') tagInput = <Select options={genreOptionList} onChange={onChangeOptionGenre} />;
                                return (
                                    <div key={`management-movie-modify-row-${value.keyName}`} className="management-movie-modify-content-box-top-row">
                                        <div className="management-movie-modify-content-box-top-row-col-title">{value.text}:</div>
                                        {tagInput}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="management-movie-modify-content-box-bottom">
                        <textarea name="textarea" id="textarea" cols="30" rows="10" placeholder={'설명을 입력하세요.'} value={detail} onChange={onChangeTextarea} />
                        <div className="management-movie-modify-content-box-bottom-row-attachment">
                            <Attachment upload={uploadFile} />
                        </div>
                        <div className="management-movie-modify-content-box-bottom-row-buttons">
                            <Button title={'완료'} width={80} value={'complete'} onClick={onClickButton} />
                            <Button title={'취소'} width={80} value={'cancel'} outline onClick={onClickButton} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagementMovieModify;