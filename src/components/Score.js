import {IoStar} from "react-icons/io5";
import '../css/Score.css';

const Score = (props) => {
    return (
        <div className="score-container">
            <div className="score-icon-star">
                <IoStar />
            </div>
            <div>{props.value} / 5</div>
        </div>
    )
}

export default Score;