import Button from "../components/Button";
import {useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import apiMovie from "../api/apiMovie";
import {Utils} from "../utils/Utils";
import apiAdmin from "../api/apiAdmin";

const ManagementMovieRegister = (props) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
    let location = useLocation();
    const [inputList, setInputList] = useState([]);
    const [detail, setDetail] = useState();
    const [imageUrl, setImageUrl] = useState();
    const onClickButton = value => {
        if (value === 'modify') navigate(`/admin/management/movie/${value}`, {
            state: {
                id: location.state.id,
                inputList,
                detail,
                imageUrl
            }
        });
        if (value === 'delete') {
            let isOk = window.confirm('삭제하시겠습니까?');
            if (isOk) deleteMovie(location.state.id);
        }
        if (value === 'back') navigate(-1);
    }
    const init = () => {
        const { state } = location;
        getMovieDetail(state.id);
    }
    const getMovieDetail = (id) => {
        const params = { id };
        apiMovie.getDetail(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert('영화 정보가 존재하지 않습니다.');

                const resultKeys = Object.keys(data.result);
                const filteredResultKeys = resultKeys.filter(key => key === 'title' || key === 'age' || key === 'releaseDate' || key === 'screenDate');
                const array = filteredResultKeys.map(key => {
                    let result = {
                        keyName: key,
                        text: '',
                        value: data.result[key]
                    }
                    if (key === 'title') result.text = '제목';
                    else if (key === 'age') {
                        result.text = '연령';
                        result.value = result.value < 12 ? '전체이용가' : result.value;
                    }
                    else if (key === 'releaseDate') {
                        result.text = '개봉일';
                        result.value = result.value.replace('T', ' ');
                    }
                    else if (key === 'screenDate') {
                        result.text = '상영일';
                        result.value = result.value.replace('T', ' ');
                    }
                    else result.text = 'No Text';
                    return result;
                });
                setInputList(array);
                setDetail(data.result.detail);
                setImageUrl(data.result.attachment);
            })
            .catch(err => alert(`영화 정보 불러오기 실패: ${err}`));
    }
    const deleteMovie = (id) => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            id
        };
        apiAdmin.deleteMovie(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화 삭제 실패:\n${data.msg}`);
                navigate('/admin/management/movie/list');
            })
            .catch(err => alert(`영화 삭제 실패:\n${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="management-movie-detail-container">
            <div className="management-movie-detail-title font-HakDotR">{props.title}</div>
            <div className="management-movie-detail-content">
                <div className="management-movie-detail-content-box">
                    <div className="management-movie-detail-content-box-top">
                        <img src={imageUrl} alt="movie_poster" />
                        <div className="management-movie-detail-content-box-top-detail">
                        {inputList.length > 0 && inputList.map(value => {
                            return (
                                <div key={`management-movie-detail-row-${value.keyName}`} className="management-movie-detail-content-box-top-row">
                                    <div className="management-movie-detail-content-box-top-row-col-title font-HakDotR">{value.text}: {value.value}</div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <div className="management-movie-detail-content-box-bottom">
                        <div className="font-HakDotR">{detail}</div>
                        <div className="management-movie-detail-content-box-bottom-row-buttons">
                            <Button title={'수정'} width={80} value={'modify'} onClick={onClickButton} />
                            <Button title={'삭제'} width={80} value={'delete'} type={'caution'} onClick={onClickButton} />
                            <Button title={'목록'} width={80} value={'back'} outline onClick={onClickButton} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagementMovieRegister;