import '../css/SideBar.css'

const SideBar = () => {
    return (
        <div id={'sidebar'}>
            <div id={'sidebar-logo'}>We Cinema</div>
            <div id={'sidebar-menu'}>
                <div id={'sidebar-menu-link'}>홈</div>
                <div id={'sidebar-menu-link'}>코드 관리</div>
                <div id={'sidebar-menu-link'}>영화 관리</div>
                <div id={'sidebar-menu-link'}>영화관 관리</div>
                <div id={'sidebar-menu-link'}>공지사항 관리</div>
            </div>
        </div>
    );
}

export default SideBar;