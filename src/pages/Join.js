import '../css/Join.css';
import {Link} from "react-router-dom";
import Main from "./Main";
import {useState} from "react";
import {IoCheckmarkCircleOutline} from "react-icons/io5";

const Join = () => {
    const depth4InputInlineStyle = {
        background: 'white'
    }
    const [isJoining, setIsJoining] = useState(true);
    const onClickSignUp = () => setIsJoining(false);

    return (
        <div className="join-container">
            {isJoining ?
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
                            <div className="join-box-depth-3-btn-signup" onClick={onClickSignUp}>SIGN UP</div>
                            <div className="join-box-depth-3-btn-home">
                                <Link to="/" element={<Main />}>HOME</Link>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="join-complete-box-form">
                    <div className="join-complete-box-depth-1">
                        <div className="join-complete-box-depth-2-top">
                            <div className="join-complete-box-depth-3-icon">
                                <IoCheckmarkCircleOutline />
                            </div>
                            <div className="join-complete-box-depth-3-home">회원가입을 완료하였습니다.</div>
                        </div>
                        <div className="join-complete-box-depth-2-bottom">
                            <Link to="/" element={<Main />}>홈으로</Link>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Join;