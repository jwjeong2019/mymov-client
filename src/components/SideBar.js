import '../css/SideBar.css';
import {IoAccessibility, IoChevronForwardSharp, IoLogOutOutline, IoMailOutline, IoTicketOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const SideBar = (props) => {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    let containerInlineStyle = {
        display: props.isOpen ? 'block' : 'none'
    };
    let boxInlineStyle = {
        height: role === 'ADMIN' && '8%'
    };
    const navigate = useNavigate();
    const onClickButtonBack = () => props.toggleIsOpen();
    const onClickLogout = () => {
        localStorage.clear();
        props.toggleIsOpen();
        navigate('/');
    }

    return (
        <div className="sidebar-container" style={containerInlineStyle}>
            <div className="sidebar-box-depth-1" style={boxInlineStyle}>
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
                {role === 'USER' &&
                    <>
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
                                <IoAccessibility />
                            </div>
                            <div className="sidebar-box-depth-3-text font-TAEBAEK">
                                <Link to="/myPage/modify">개인정보변경</Link>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default SideBar;