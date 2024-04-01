import '../css/SignIn.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import apiAdmin from "../api/apiAdmin";
import apiMember from "../api/apiMember";

const SignIn = () => {
    const TEXT_ALERT_FAIL_LOGIN = '아이디 또는 비밀번호가 일치하지 않습니다.';
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');

    const onClickBtnSignIn = () => {
        let params = {};
        if (isContainedWordFrom('admin', userId)) {
            params.adminId = userId;
            params.adminPw = userPwd;
            apiAdmin.createToken(params)
                .then(response => {
                    const { data } = response;
                    if (isContainedWordFrom('fail', data.msg)) return alert(TEXT_ALERT_FAIL_LOGIN);
                    localStorage.setItem('auth', JSON.stringify(data.token));
                    localStorage.setItem('name', data.detail.name);
                    localStorage.setItem('role', `ADMIN_${data.detail.role}`);
                    return navigate('/');
                })
                .catch(err => alert(TEXT_ALERT_FAIL_LOGIN));
            return;
        }

        params.memberId = userId;
        params.memberPw = userPwd;
        apiMember.createToken(params)
            .then(response => {
                const { data } = response;
                if (isContainedWordFrom('fail', data.msg)) return alert(TEXT_ALERT_FAIL_LOGIN);
                localStorage.setItem('auth', JSON.stringify(data.token));
                localStorage.setItem('id', data.detail.id);
                localStorage.setItem('name', data.detail.name);
                localStorage.setItem('role', 'USER');
                return navigate('/');
            })
            .catch(err => alert(TEXT_ALERT_FAIL_LOGIN));
    }
    const onClickBtnHome = () => navigate('/');
    const onChangeInputId = e => setUserId(e.target.value);
    const onChangeInputPwd = e => setUserPwd(e.target.value);

    const isContainedWordFrom = (word, data) => data.indexOf(word) > -1;

    return (
        <div className="signin-container viewport-height-full">
            <div className="signin-box-form">
                <div className="signin-box-depth-1">
                    <div className="signin-box-depth-2-top">
                        <div className="signin-box-depth-3-input">
                            <input type="text" placeholder="Email 또는 ID" onChange={onChangeInputId}/>
                        </div>
                        <div className="signin-box-depth-3-input">
                            <input type="password" placeholder="Password" onChange={onChangeInputPwd}/>
                        </div>
                    </div>
                    <div className="signin-box-depth-2-bottom">
                        <div className="signin-box-depth-3-button">
                            <button className="font-TAEBAEK" id="btn-signin" onClick={onClickBtnSignIn}>SIGN IN</button>
                        </div>
                        <div className="signin-box-depth-3-button">
                            <button className="font-TAEBAEK" id="btn-home" onClick={onClickBtnHome}>HOME</button>
                        </div>
                        <div className="signin-box-depth-3-button">
                            <div className="signin-box-depth-4 font-TAEBAEK">
                                <Link to="/findIdPwd">아이디/비밀번호 찾기</Link>
                                <Link to="/join">회원가입</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;