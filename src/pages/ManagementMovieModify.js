import {useNavigate} from "react-router";
import {useMemo, useState} from "react";
import Button from "../components/Button";
import Attachment from "../components/Attachment";

const ManagementMovieModify = (props) => {
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
        if (value === 'complete') console.log({ title, age, director, releaseDate, detail });
        if (value === 'cancel') navigate(-1);
    }
    const makeInputList = () => {
        setInputList([
            { keyName: 'title', text: '제목', value: 'First Movie', placeholder: '제목을 입력하세요.', onChange: onChangeTitle },
            { keyName: 'age', text: '연령', value: '전체', placeholder: '연령을 입력하세요.', onChange: onChangeAge },
            { keyName: 'director', text: '감독', value: '존 스미스', placeholder: '감독을 입력하세요.', onChange: onChangeDirector },
            { keyName: 'releaseDate', text: '개봉일', value: '2024-01-20', placeholder: '개봉일을 입력하세요.', onChange: onChangeReleaseDate },
        ]);
        setDetail('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim, urna ut semper pharetra, eros dui viverra sapien, vitae eleifend tortor nisl et quam. Nullam dapibus malesuada egestas. Sed gravida, odio sit amet bibendum dignissim, augue mi dignissim nibh, nec fringilla dui magna ut libero. Integer mollis ex sed quam sodales faucibus. Nunc ut tortor sollicitudin, auctor ligula eu, sollicitudin est. In condimentum tristique arcu, at tincidunt risus sollicitudin et. Curabitur venenatis justo at nibh porttitor ornare.');
    }
    useMemo(makeInputList, []);
    return (
        <div className="management-movie-modify-container">
            <div className="management-movie-modify-title">{props.title}</div>
            <div className="management-movie-modify-content">
                <div className="management-movie-modify-content-box">
                    <div className="management-movie-modify-content-box-top">
                        <div className="management-movie-modify-content-box-top-image" />
                        <div className="management-movie-modify-content-box-top-detail">
                            {inputList.length > 0 && inputList.map(value => {
                                return (
                                    <div key={`management-movie-modify-row-${value.keyName}`} className="management-movie-modify-content-box-top-row">
                                        <div className="management-movie-modify-content-box-top-row-col-title">{value.text}:</div>
                                        <input type="text" placeholder={value.placeholder} value={value.value} onChange={value.onChange}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="management-movie-modify-content-box-bottom">
                        <textarea name="textarea" id="textarea" cols="30" rows="10" placeholder={'설명을 입력하세요.'} value={detail} onChange={onChangeTextarea} />
                        <div className="management-movie-modify-content-box-bottom-row-attachment">
                            <Attachment />
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