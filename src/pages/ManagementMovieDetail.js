import Button from "../components/Button";
import {useMemo, useState} from "react";
import Attachment from "../components/Attachment";
import {useNavigate} from "react-router";

const ManagementMovieRegister = (props) => {
    let navigate = useNavigate();
    const [inputList, setInputList] = useState([]);
    const [title, setTitle] = useState();
    const [age, setAge] = useState();
    const [director, setDirector] = useState();
    const [releaseDate, setReleaseDate] = useState();
    const [detail, setDetail] = useState();
    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeAge = e => setAge(e.target.value);
    const onChangeDirector = e => setDirector(e.target.value);
    const onChangeReleaseDate = e => setReleaseDate(e.target.value);
    const onChangeTextarea = e => setDetail(e.target.value);
    const onClickButton = value => {
        if (value === 'modify') navigate(`/admin/management/movie/${value}`);
        if (value === 'delete') {
            let result = window.confirm('삭제하시겠습니까?');
            console.log(`confirm result: ${result}`);
        }
        if (value === 'back') navigate(-1);
    }
    const makeInputList = () => {
        setInputList([
            { keyName: 'title', text: '제목', value: 'First Movie', onChange: onChangeTitle },
            { keyName: 'age', text: '연령', value: '전체', onChange: onChangeAge },
            { keyName: 'director', text: '감독', value: '존 스미스', onChange: onChangeDirector },
            { keyName: 'releaseDate', text: '개봉일', value: '2024-01-20', onChange: onChangeReleaseDate },
        ]);
        setDetail('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim, urna ut semper pharetra, eros dui viverra sapien, vitae eleifend tortor nisl et quam. Nullam dapibus malesuada egestas. Sed gravida, odio sit amet bibendum dignissim, augue mi dignissim nibh, nec fringilla dui magna ut libero. Integer mollis ex sed quam sodales faucibus. Nunc ut tortor sollicitudin, auctor ligula eu, sollicitudin est. In condimentum tristique arcu, at tincidunt risus sollicitudin et. Curabitur venenatis justo at nibh porttitor ornare.');
    }
    useMemo(makeInputList, []);
    return (
        <div className="management-movie-detail-container">
            <div className="management-movie-detail-title">{props.title}</div>
            <div className="management-movie-detail-content">
                <div className="management-movie-detail-content-box">
                    <div className="management-movie-detail-content-box-top">
                        <div className="management-movie-detail-content-box-top-image" />
                        <div className="management-movie-detail-content-box-top-detail">
                        {inputList.length > 0 && inputList.map(value => {
                            return (
                                <div key={`management-movie-detail-row-${value.keyName}`} className="management-movie-detail-content-box-top-row">
                                    <div className="management-movie-detail-content-box-top-row-col-title">{value.text}: {value.value}</div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <div className="management-movie-detail-content-box-bottom">
                        <div>{detail}</div>
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