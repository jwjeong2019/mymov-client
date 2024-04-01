import '../css/Navigation.css';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {Utils} from "../utils/Utils";

const Navigation = (props) => {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    let navigate = useNavigate();
    const onClickButtonName = e => props.toggleIsOpen();
    const onClickLogo = e => navigate('/');

    return (
        <div className="nav-container">
            <div className="nav-box-big">
                <div className="nav-box-small-left">
                    <div className="nav-box-small-circle" onClick={onClickLogo}/>
                </div>
                <div className="nav-box-small-right">
                    <div className="nav-box-small-link font-HakMulB">
                        <Link to="/movie">영화</Link>
                    </div>
                    <div className="nav-box-small-link font-HakMulB">
                        <Link to="/timetable">상영표</Link>
                    </div>
                    {Utils.isContainedWordFrom('ADMIN', role) &&
                        <div className="nav-box-small-link font-HakMulB">
                            <Link to="/admin/management/movie/list">관리하기</Link>
                        </div>
                    }
                    {(role && name) ?
                        <div className="nav-box-small-link font-HakMulB">
                            <button className="font-HakMulB" onClick={onClickButtonName}>{name} 님</button>
                        </div>
                    :
                    <>
                        <div className="nav-box-small-link font-HakMulB">
                            <Link to="/signIn">로그인</Link>
                        </div>
                        <div className="nav-box-small-link font-HakMulB">
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