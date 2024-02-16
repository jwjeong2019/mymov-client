import {Link} from "react-router-dom";

const Main = () => {
    return (
        <div>
            <div>메인 화면</div>
            <ul>
                <li>
                    <Link to="/movie">영화</Link>
                </li>
                <li>
                    <Link to="/timetable">상영표</Link>
                </li>
            </ul>
        </div>
    )
}

export default Main;