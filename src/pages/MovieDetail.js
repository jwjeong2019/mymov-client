import Navigation from "../components/Navigation";
import '../css/MovieDetail.css';
import Button from "../components/Button";
import Tag from "../components/Tag";
import Score from "../components/Score";
import {useNavigate} from "react-router";

const MovieDetail = () => {
    const navigate = useNavigate();
    const onClickButtonReservation = () => console.log('reserve button');
    const onClickButtonBack = () => navigate("/movie");
    return (
        <div>
            <Navigation />
            <div className="movie-detail-container">
                <div className="movie-detail-header">
                    <div className="movie-detail-header-title">영화</div>
                </div>
                <div className="movie-detail-content">
                    <div className="movie-detail-content-box">
                        <div className="movie-detail-content-box-top">
                            <div className="movie-detail-content-box-image"></div>
                            <div className="movie-detail-content-box-content">
                                <div className="movie-detail-content-box-content-title">First Movie</div>
                                <div className="movie-detail-content-box-content-box">
                                    <div className="movie-detail-content-box-content-box-common">전체이용가</div>
                                    <div className="movie-detail-content-box-content-box-common">존 스미스</div>
                                    <div className="movie-detail-content-box-content-box-common">120분</div>
                                    <div className="movie-detail-content-box-content-box-score">
                                        <Score value={4.5} />
                                    </div>
                                    <div className="movie-detail-content-box-content-box-tag">
                                        <Tag title="Family" />
                                        <Tag title="Fun" />
                                        <Tag title="Comedy" />
                                    </div>
                                    <div className="movie-detail-content-box-content-box-reservation">
                                        <Button title="예매하기"
                                                width={220}
                                                onClick={onClickButtonReservation} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="movie-detail-content-box-middle">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor volutpat urna, ut convallis nisi dictum eget. Cras sodales, tellus ut scelerisque volutpat, est urna maximus magna, eget suscipit dolor eros a lorem. Aliquam justo risus, porttitor vitae mi eget, feugiat luctus mi. Quisque suscipit neque ac sagittis posuere. Sed justo nisl, mattis vitae arcu a, laoreet malesuada massa. Donec congue, purus sed rhoncus maximus, lorem nibh pellentesque enim, non ullamcorper urna massa quis enim.
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