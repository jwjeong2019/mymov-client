import '../css/Join.css';
import {Link} from "react-router-dom";
import Main from "./Main";

const Join = () => {
    const depth4InputInlineStyle = {
        background: 'white'
    }
    return (
        <div className="join-container">
            <div className="join-box-form">
                <div className="join-box-depth-1">
                    <div className="join-box-depth-2-top">
                        <div className="join-box-depth-3-complex">
                            <div className="join-box-depth-4-input">
                                <input type="text" placeholder="아이디를 입력하세요."/>
                            </div>
                            <div className="join-box-depth-4-btn">중복확인</div>
                        </div>
                        <div className="join-box-depth-3-simple">
                            <input type="password" placeholder="비밀번호를 입력하세요."/>
                        </div>
                        <div className="join-box-depth-3-simple">
                            <input type="text" placeholder="이름을 입력하세요."/>
                        </div>
                        <div className="join-box-depth-3-complex">
                            <div className="join-box-depth-4-input">
                                <input type="text" placeholder="이메일을 입력하세요."/>
                            </div>
                            <div className="join-box-depth-4-btn">인증요청</div>
                        </div>
                        <div className="join-box-depth-3-complex">
                            <div className="join-box-depth-4-input">
                                <input type="text" placeholder="휴대폰번호를 입력하세요."/>
                            </div>
                            <div className="join-box-depth-4-btn">인증요청</div>
                        </div>
                        <div className="join-box-depth-3-complex">
                            <div className="join-box-depth-4-input">
                                <input type="text"
                                       placeholder="주소를 입력하세요."
                                       disabled
                                       style={depth4InputInlineStyle}/>
                            </div>
                            <div className="join-box-depth-4-btn">주소조회</div>
                        </div>
                        <div className="join-box-depth-3-simple">
                            <input type="text" placeholder="상세주소를 입력하세요."/>
                        </div>
                    </div>
                    <div className="join-box-depth-2-bottom">
                        <div className="join-box-depth-3-btn-signup">SIGN UP</div>
                        <div className="join-box-depth-3-btn-home">
                            <Link to="/" element={<Main />}>HOME</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Join;