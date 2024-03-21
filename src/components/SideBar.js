import '../css/SideBar.css';
import {IoAccessibility, IoChevronForwardSharp, IoLogOutOutline, IoMailOutline, IoTicketOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const SideBar = (props) => {
    let containerInlineStyle = {
        display: props.isOpen ? 'block' : 'none'
    }
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    const navigate = useNavigate();
    const onClickButtonBack = () => props.toggleIsOpen();
    const onClickLogout = () => {
        localStorage.clear();
        props.toggleIsOpen();
        navigate('/');
    }

    return (
        <div className="sidebar-container" style={containerInlineStyle}>
            <div className="sidebar-box-depth-1">
                <div className="sidebar-box-depth-2-top">
                    <div className="sidebar-box-depth-3-icon">
                        <button onClick={onClickButtonBack}>
                            <IoChevronForwardSharp />
                        </button>
                    </div>
                    <div className="sidebar-box-depth-3-text font-TAEBAEK">환영합니다. {name}님</div>
                </div>
                <div className="sidebar-box-depth-2-line"/>
                <div className="sidebar-box-depth-2-bottom">
                    <div className="sidebar-box-depth-3-icon">
                        <IoLogOutOutline />
                    </div>
                    <div className="sidebar-box-depth-3-logout font-TAEBAEK" onClick={onClickLogout}>로그아웃</div>
                </div>
                <div className="sidebar-box-depth-2-line"/>
                <div className="sidebar-box-depth-2-bottom">
                    <div className="sidebar-box-depth-3-icon">
                        <IoTicketOutline />
                    </div>
                    <div className="sidebar-box-depth-3-text font-TAEBAEK">
                        <Link to="/myPage/reservation">예매현황</Link>
                    </div>
                </div>
                <div className="sidebar-box-depth-2-bottom">
                    <div className="sidebar-box-depth-3-icon">
                        <IoMailOutline />
                    </div>
                    <div className="sidebar-box-depth-3-text font-TAEBAEK">
                        <Link to="/myPage/inquiry">문의현황</Link>
                    </div>
                </div>
                <div className="sidebar-box-depth-2-bottom">
                    <div className="sidebar-box-depth-3-icon">
                        <IoAccessibility />
                    </div>
                    <div className="sidebar-box-depth-3-text font-TAEBAEK">
                        <Link to="/myPage/modify">개인정보변경</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;