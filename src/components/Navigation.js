import '../css/Navigation.css';
import {Link} from "react-router-dom";

const Navigation = (props) => {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const onClickButtonName = e => props.toggleIsOpen();

    return (
        <div className="nav-container">
            <div className="nav-box-big">
                <div className="nav-box-small">
                    <div className="nav-box-small-circle"/>
                </div>
                <div className="nav-box-small">
                    <div className="nav-box-small-link">
                        <Link to="/movie">영화</Link>
                    </div>
                    <div className="nav-box-small-link">
                        <Link to="/timetable">상영표</Link>
                    </div>
                    {role === 'ADMIN' &&
                        <div className="nav-box-small-link">
                            <Link to="/admin/management/movie/list">관리하기</Link>
                        </div>
                    }
                    {(role && name) ?
                        <div className="nav-box-small-link">
                            <button onClick={onClickButtonName}>{name} 님</button>
                        </div>
                    :
                    <>
                        <div className="nav-box-small-link">
                            <Link to="/signIn">로그인</Link>
                        </div>
                        <div className="nav-box-small-link">
                            <Link to="/join">회원가입</Link>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navigation;