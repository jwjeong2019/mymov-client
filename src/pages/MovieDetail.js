import Navigation from "../components/Navigation";
import '../css/MovieDetail.css';
import Button from "../components/Button";
import Tag from "../components/Tag";
import Score from "../components/Score";
import {useNavigate, useParams} from "react-router";
import {useMemo, useState} from "react";
import apiMovie from "../api/apiMovie";
import SideBar from "../components/SideBar";

const MovieDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [isOpen, setIsOpen] = useState();
    const onClickButtonReservation = () => navigate(`/reservation/step1`, {
        state: {
            movieTitle: data.title,
            movieAge: data.age,
            movieDirector: data.director,
            movieTime: data.movieTime,
            movieId: data.id,
        }
    });
    const onClickButtonBack = () => navigate("/movie");
    const toggleIsOpen = () => setIsOpen(!isOpen);
    const init = () => getMovieDetail();
    const getMovieDetail = () => {
        apiMovie.getDetail(params)
            .then(response => {
                const { data } = response;
                setData({
                    id: data.result.id,
                    title: data.result.title,
                    age: data.result.age < 12 ? '전체이용가' : data.result.age,
                    director: '존 스미스',
                    movieTime: `${120}분`,
                    score: 4.5,
                    genreList: ['Family', 'Fun', 'Comedy'],
                    detail: data.result.detail,
                    imageUrl: data.result.attachment,
                });
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    useMemo(init, []);
    return (
        <div>
            <Navigation toggleIsOpen={toggleIsOpen} />
            <SideBar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            <div className="movie-detail-container">
                <div className="movie-detail-header">
                    <div className="movie-detail-header-title font-HakMulB">영화</div>
                </div>
                <div className="movie-detail-content">
                    <div className="movie-detail-content-box">
                        <div className="movie-detail-content-box-top">
                            <img src={data.imageUrl} alt="movie_poster"/>
                            <div className="movie-detail-content-box-content">
                                <div className="movie-detail-content-box-content-title font-HakDotR">{data.title}</div>
                                <div className="movie-detail-content-box-content-box">
                                    <div className="movie-detail-content-box-content-box-common font-HakDotR">{data.age}</div>
                                    <div className="movie-detail-content-box-content-box-common font-HakDotR">{data.director}</div>
                                    <div className="movie-detail-content-box-content-box-common font-HakDotR">{data.movieTime}</div>
                                    <div className="movie-detail-content-box-content-box-score font-HakDotR">
                                        <Score value={data.score} />
                                    </div>
                                    <div className="movie-detail-content-box-content-box-tag">
                                        {data.genreList?.map(value => <Tag title={value} />)}
                                    </div>
                                    <div className="movie-detail-content-box-content-box-reservation">
                                        <Button title="예매하기"
                                                width={220}
                                                onClick={onClickButtonReservation} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="movie-detail-content-box-middle font-HakDotR">
                            {data.detail}
                        </div>
                        <div className="movie-detail-content-box-bottom">
                            <Button title="다른 영화 찾아보기"
                                    width={220}
                                    onClick={onClickButtonBack}
                                    outline />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;