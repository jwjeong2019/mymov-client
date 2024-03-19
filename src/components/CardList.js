import {IoChevronBackOutline, IoChevronForward, IoStar} from "react-icons/io5";
import '../css/CardList.css';
import {useEffect, useMemo, useState} from "react";

const CardList = ({ list, onClickCard, onClickForward, onClickBack, isLast, isFirst }) => {
    const [cards, setCards] = useState([]);

    const onClickIconBack = () => onClickBack();
    const onClickIconForward = () => onClickForward();
    const onClick = (value) => onClickCard(value);

    const makeCards = () => {
        let arrRow = [];
        let arrCol = [];
        list.forEach((value, index) => {
            arrCol.push(value);
            if (index === list.length - 1) arrRow.push(arrCol);
            else if (arrCol.length % 3 === 0) {
                arrRow.push(arrCol);
                arrCol = [];
            }
        })
        setCards(arrRow);
    };

    useMemo(makeCards, [list]);

    return (
        <div className="card-list-container">
            <div className="card-list-button-arrow" onClick={onClickIconBack}>
                {!isFirst && <IoChevronBackOutline />}
            </div>
            <div className="card-list-box">
                {cards.length > 0 && cards.map((value, index) => {
                    return (
                        <div key={`card-list-row-${index}`} className="card-list-box-row">
                            {value.length > 0 && value.map((value1, index1) => {
                                let ageStyle = {};
                                if (value1.age === 12) {
                                    ageStyle.borderColor = 'blue';
                                    ageStyle.color = 'blue';
                                    ageStyle.fontSize = '15px';
                                }
                                if (value1.age === 15) {
                                    ageStyle.borderColor = 'orange';
                                    ageStyle.color = 'orange';
                                    ageStyle.fontSize = '15px';
                                }
                                if (value1.age >= 18) {
                                    ageStyle.borderColor = 'red';
                                    ageStyle.color = 'red';
                                    ageStyle.fontSize = '15px';
                                }
                                return (
                                    <div key={`card-list-col-${index1}`} className="card-list-box-column" onClick={() => onClick(value1)}>
                                        <img src={value1.imageUrl} alt="movie_poster"/>
                                        <div className="card-list-box-detail">
                                            <div className="card-list-box-detail-top">
                                                <div className="card-list-box-detail-age"
                                                     style={ageStyle}>
                                                    {value1.age}
                                                </div>
                                                <div className="card-list-box-detail-title">{value1.title}</div>
                                            </div>
                                            <div className="card-list-box-detail-bottom">
                                                <div className="card-list-box-detail-score">
                                                    <div className="card-list-box-detail-icon-star"><IoStar /></div>
                                                    <div className="card-list-box-detail-text-score">{value1.score} / 5</div>
                                                </div>
                                                <div className="card-list-box-detail-type">
                                                    <div className="card-list-box-detail-text-type">{value1.type}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="card-list-button-arrow" onClick={onClickIconForward}>
                {!isLast && <IoChevronForward />}
            </div>
        </div>
    )
}

export default CardList;