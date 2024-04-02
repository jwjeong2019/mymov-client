import '../css/SelectScore.css';
import {useRef, useState} from "react";

const SelectScore = ({ onClick }) => {
    const hoverStyle = `background: #4F5EE4;
    color: white;
    border: 3px solid #4F5EE4;
    transition: 0.8s;`;
    const refs = useRef([]);
    const [score, setScore] = useState();
    const onMouseOver = e => {
        const _enableButton = () => e.target.style = hoverStyle;

        _enableButton();
    }
    const onMouseOut = e => {
        const _disableButtonExceptSelected = () => {
            if (e.target.value !== score) e.target.style = null;
        };

        _disableButtonExceptSelected();
    }
    const onClickScore = e => {
        const _changeScore = () => e.target.value === score ? undefined : e.target.value;
        const _getBackStyleExceptThisTarget = () => {
            const refCurrentsExceptMe = refs.current.filter(refCurrent => refCurrent !== e.target);
            refCurrentsExceptMe.forEach(refCurrent => {
                refCurrent.style = null;
            });
        };
        const _enableButton = () => e.target.style = hoverStyle;
        const _disableButton = () => e.target.style = null;

        const nextScore = _changeScore();
        _getBackStyleExceptThisTarget();
        if (nextScore) _enableButton();
        else _disableButton();
        setScore(nextScore);
    }
    const onClickRegister = e => onClick(score);
    return (
        <div className="select-score-container">
            <text className="font-HakDotR">나의 감상평</text>
            <div className="select-score-button-box-middle">
                <button className="font-HakDotR"
                        ref={el => refs.current[0] = el}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        value={1}
                        onClick={onClickScore}>1점
                </button>
                <button className="font-HakDotR"
                        ref={el => refs.current[1] = el}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        value={2}
                        onClick={onClickScore}>2점
                </button>
                <button className="font-HakDotR"
                        ref={el => refs.current[2] = el}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        value={3}
                        onClick={onClickScore}>3점
                </button>
                <button className="font-HakDotR"
                        ref={el => refs.current[3] = el}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        value={4}
                        onClick={onClickScore}>4점
                </button>
                <button className="font-HakDotR"
                        ref={el => refs.current[4] = el}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        value={5}
                        onClick={onClickScore}>5점
                </button>
            </div>
            <div className="select-score-button-box-end">
                <button className="font-HakDotR" onClick={onClickRegister}>등록</button>
            </div>
        </div>
    );
}
export default SelectScore;