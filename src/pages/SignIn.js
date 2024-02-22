import '../css/SignIn.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const SignIn = () => {
    const navigate = useNavigate();
    const tempUser = { userId: 'testuser', userPwd: '1234', role: 'USER'};
    const tempAdmin = { userId: 'testadmin', userPwd: '12345', role: 'ADMIN_MASTER'};
    const [userId, setUserId] = useState();
    const [userPwd, setUserPwd] = useState();

    const onClickBtnSignIn = () => {
        if (tempUser.userId === userId && tempUser.userPwd === userPwd) {
            localStorage.setItem('user_id', userId);
            localStorage.setItem('user_pwd', userPwd);
            localStorage.setItem('role', tempUser.role);
            navigate('/');
        } else if (tempAdmin.userId === userId && tempAdmin.userPwd === userPwd) {
            localStorage.setItem('user_id', userId);
            localStorage.setItem('user_pwd', userPwd);
            localStorage.setItem('role', tempAdmin.role);
            navigate('/');
        } else {
            alert('아이디 또는 비밀번호 불일치');
        }
    }
    const onClickBtnHome = () => navigate('/');
    const onChangeInputId = e => setUserId(e.target.value);
    const onChangeInputPwd = e => setUserPwd(e.target.value);

    return (
        <div className="signin-container">
            <div className="box-form">
                <div className="box-depth-1">
                    <div className="box-depth-2-top">
                        <div className="box-depth-3-input">
                            <input type="text" placeholder="Email 또는 ID" onChange={onChangeInputId}/>
                        </div>
                        <div className="box-depth-3-input">
                            <input type="password" placeholder="Password" onChange={onChangeInputPwd}/>
                        </div>
                    </div>
                    <div className="box-depth-2-bottom">
                        <div className="box-depth-3-button">
                            <button id="btn-signin" onClick={onClickBtnSignIn}>SIGN IN</button>
                        </div>
                        <div className="box-depth-3-button">
                            <button id="btn-home" onClick={onClickBtnHome}>HOME</button>
                        </div>
                        <div className="box-depth-3-button">
                            <div className="box-depth-4">
                                <Link to="/findIdPassword">아이디/비밀번호 찾기</Link>
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