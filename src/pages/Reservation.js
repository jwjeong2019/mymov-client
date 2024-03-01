import Navigation from "../components/Navigation";
import '../css/Reservation.css';
import Button from "../components/Button";
import {useNavigate, useParams} from "react-router";
import DropDown from "../components/DropDown";
import {useState} from "react";
import {IoCheckmarkCircleOutline} from "react-icons/io5";

const Reservation = () => {
    let params = useParams();
    let navigate = useNavigate();
    const seatMenu = [
        { id: 'a0', text: 'A0' },
        { id: 'a1', text: 'A1' },
        { id: 'a2', text: 'A2' },
    ];
    const cinemaMenu = [
        { id: 0, text: 'MOV홍대점' },
        { id: 1, text: 'MOV강남점' },
        { id: 2, text: 'MOV영등포점' },
    ];
    const theaterMenu = [
        { id: 10, text: '1 상영관' },
        { id: 11, text: '2 상영관' },
        { id: 12, text: '3 상영관' },
    ];
    const timeMenu = [
        { id: 100, text: '13:00:00' },
        { id: 101, text: '14:00:00' },
        { id: 102, text: '15:00:00' },
    ];
    const [isCompleted, setIsCompleted] = useState(true);
    const onClickDropDownSeat = (id) => console.log(id);
    const onClickDropDownCinema = (id) => console.log(id);
    const onClickDropDownTheater = (id) => console.log(id);
    const onClickDropDownTime = (id) => console.log(id);
    const onClickBack = () => navigate('/movie');

    return (
        <div>
            <Navigation />
            <div className="reservation-container">
                <div className="reservation-header">
                    <div className="reservation-header-title">예매</div>
                </div>
                <div className="reservation-content">
                    {isCompleted ?
                        <div className="reservation-complete-box">
                            <div className="reservation-complete-box-center">
                                <div className="reservation-complete-box-center-top">
                                    <div className="reservation-complete-box-center-top-icon"><IoCheckmarkCircleOutline /></div>
                                    <div className="reservation-complete-box-center-top-text">예매를 완료하였습니다.</div>
                                </div>
                                <Button title="돌아가기" outline onClick={onClickBack} />
                            </div>
                        </div>
                        :
                        <div className="reservation-box">
                            <div className="reservation-box-top">
                                <div className="reservation-box-row">제목: First Movie</div>
                                <div className="reservation-box-row">연령: 전체이용가</div>
                                <div className="reservation-box-row">감독: 존 스미스</div>
                                <div className="reservation-box-row">시간: 120분</div>
                                <div className="reservation-box-row-dropdown">
                                    <div className="reservation-box-column-text">좌석:</div>
                                    <DropDown width={185}
                                              menu={seatMenu}
                                              onClickMenu={onClickDropDownSeat} />
                                </div>
                                {params?.mode === 'step1' ?
                                    <div className="reservation-box-row-dropdown">
                                        <div className="reservation-box-column-text">영화관:</div>
                                        <DropDown width={185}
                                                  menu={cinemaMenu}
                                                  onClickMenu={onClickDropDownCinema} />
                                    </div>
                                    :
                                    <div className="reservation-box-row">영화관: MOV홍대점</div>
                                }
                                {params?.mode === 'step1' ?
                                    <div className="reservation-box-row-dropdown">
                                        <div className="reservation-box-column-text">상영관:</div>
                                        <DropDown width={185}
                                                  menu={theaterMenu}
                                                  onClickMenu={onClickDropDownTheater} />
                                    </div>
                                    :
                                    <div className="reservation-box-row">상영관: 2 상영관</div>
                                }
                                {params?.mode === 'step1' ?
                                    <div className="reservation-box-row-dropdown">
                                        <div className="reservation-box-column-text">시작시간:</div>
                                        <DropDown width={185}
                                                  menu={timeMenu}
                                                  onClickMenu={onClickDropDownTime} />
                                    </div>
                                    :
                                    <div className="reservation-box-row">시작시간: 14:00:00</div>
                                }
                            </div>
                            <div className="reservation-box-bottom">
                                <div className="reservation-box-row-account">
                                    <div className="reservation-box-column-text">총 결제금액</div>
                                    <div className="reservation-box-column-account">14,000원</div>
                                </div>
                                <Button title="결제하기" />
                                <Button title="취소" outline />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Reservation;