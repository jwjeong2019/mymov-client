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
                {cards.length > 0 && cards.map((row, index) => {
                    return (
                        <div key={`card-list-row-${index}`} className="card-list-box-row">
                            {row.length > 0 && row.map((col, index1) => {
                                let ageStyle = {};
                                if (col.age === 12) {
                                    ageStyle.borderColor = 'blue';
                                    ageStyle.color = 'blue';
                                    ageStyle.fontSize = '15px';
                                }
                                if (col.age === 15) {
                                    ageStyle.borderColor = 'orange';
                                    ageStyle.color = 'orange';
                                    ageStyle.fontSize = '15px';
                                }
                                if (col.age >= 18) {
                                    ageStyle.borderColor = 'red';
                                    ageStyle.color = 'red';
                                    ageStyle.fontSize = '15px';
                                }
                                return (
                                    <div key={`card-list-col-${index1}`} className="card-list-box-column" onClick={() => onClick(col)}>
                                        <img src={col.imageUrl} alt="movie_poster"/>
                                        <div className="card-list-box-detail">
                                            <div className="card-list-box-detail-top">
                                                <div className="card-list-box-detail-age font-HakDotR"
                                                     style={ageStyle}>
                                                    {col.age}
                                                </div>
                                                <div className="card-list-box-detail-title font-HakDotR">{col.title}</div>
                                            </div>
                                            <div className="card-list-box-detail-bottom">
                                                <div className="font-HakDotR">{col.director}</div>
                                                <div className="font-HakDotR">{col.runningTime}</div>
                                                <div className="card-list-box-detail-type">
                                                    {col.genreList.length > 0 && col.genreList.map(value => {
                                                        return (
                                                            <div className="card-list-box-detail-text-type font-HakDotR">{value.name}</div>
                                                        );
                                                    })}
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