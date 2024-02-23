import '../css/SideBar.css';
import {IoAccessibility, IoChevronForwardSharp, IoLogOutOutline, IoMailOutline, IoTicketOutline} from "react-icons/io5";
import {Link} from "react-router-dom";

const SideBar = (props) => {
    let containerInlineStyle = {
        display: props.isOpen ? 'block' : 'none'
    }

    const onClickButtonBack = () => props.toggleIsOpen();
    const onClickLogout = () => {
        localStorage.removeItem('auth');
        window.location.reload();
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
                    <div className="sidebar-box-depth-3-text">환영합니다. {props.data?.userId}님</div>
                </div>
                <div className="sidebar-box-depth-2-line"/>
                <div className="sidebar-box-depth-2-bottom">
                    <div className="sidebar-box-depth-3-icon">
                        <IoLogOutOutline />
                    </div>
                    <div className="sidebar-box-depth-3-logout" onClick={onClickLogout}>로그아웃</div>
                </div>
                <div className="sidebar-box-depth-2-line"/>
                <div className="sidebar-box-depth-2-bottom">
                    <div className="sidebar-box-depth-3-icon">
                        <IoTicketOutline />
                    </div>
                    <div className="sidebar-box-depth-3-text">
                        <Link to="/myPage/ticket">예매현황</Link>
                    </div>
                </div>
                <div className="sidebar-box-depth-2-bottom">
                    <div className="sidebar-box-depth-3-icon">
                        <IoMailOutline />
                    </div>
                    <div className="sidebar-box-depth-3-text">
                        <Link to="/myPage/inquiry">문의현황</Link>
                    </div>
                </div>
                <div className="sidebar-box-depth-2-bottom">
                    <div className="sidebar-box-depth-3-icon">
                        <IoAccessibility />
                    </div>
                    <div className="sidebar-box-depth-3-text">
                        <Link to="/myPage/modifyInfo">개인정보변경</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;