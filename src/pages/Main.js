import '../css/Main.css';
import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";
import {useMemo, useState} from "react";
import apiAdmin from "../api/apiAdmin";
import apiMember from "../api/apiMember";

const Main = () => {
    const TEXT_ALERT_FAIL_GET_MY_INFO = '내 정보를 불러올 수 없습니다.';
    const [data, setData] = useState();
    const [isOpen, setIsOpen] = useState();
    const toggleIsOpen = () => setIsOpen(!isOpen);

    const init = () => {
        const serializedAuth = localStorage.getItem('auth');
        const auth = JSON.parse(serializedAuth);
        const role = localStorage.getItem('role');

        if (auth && role === 'ADMIN') {
            setData({ userId: '관리자' });
            return apiAdmin.getMyInfo(auth)
                .then(response => {
                    const { data } = response;
                    if (isContainedWordFrom('fail', data.msg)) return alert(TEXT_ALERT_FAIL_GET_MY_INFO);
                    // setData(data.result);
                })
                .catch(err => alert(TEXT_ALERT_FAIL_GET_MY_INFO));
        }

        if (auth && role === 'USER') {
            setData({ userId: '사용자' });
            return apiMember.getMyInfo(auth)
                .then(response => {
                    const { data } = response;
                    if (isContainedWordFrom('fail', data.msg)) return alert(TEXT_ALERT_FAIL_GET_MY_INFO);
                    // setData(data.result);
                })
                .catch(err => alert(TEXT_ALERT_FAIL_GET_MY_INFO));
        }
    };
    const isContainedWordFrom = (word, data) => data.indexOf(word) > -1;

    useMemo(init, []);

    return (
        <div className="main-container">
            <Navigation data={data}
                        toggleIsOpen={toggleIsOpen} />
            <SideBar data={data}
                     isOpen={isOpen}
                     toggleIsOpen={toggleIsOpen} />
        </div>
    )
}

export default Main;