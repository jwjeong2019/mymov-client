import '../css/Join.css';
import {Link} from "react-router-dom";
import Main from "./Main";
import {useState} from "react";
import {IoCheckmarkCircleOutline} from "react-icons/io5";
import apiMember from "../api/apiMember";
import {Utils} from "../utils/Utils";
import Modal from "../components/Modal";
import DaumPostcodeEmbed from "react-daum-postcode";

const Join = () => {
    const depth4InputInlineStyle = {
        background: 'white'
    }
    const [isJoining, setIsJoining] = useState(true);
    const [userId, setUserId] = useState();
    const [userPw, setUserPw] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [addressDetail, setAddressDetail] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const onClickSignUp = () => createMember();
    const onClickSearchAddress = () => setIsVisible(true);
    const onChangeUserId = e => setUserId(e.target.value);
    const onChangeUserPw = e => setUserPw(e.target.value);
    const onChangeName = e => setName(e.target.value);
    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePhone = e => setPhone(e.target.value);
    const onChangeAddressDetail = e => setAddressDetail(e.target.value);
    const onClickDuplicate = () => getMemberId();
    const onClickModalClose = value => setIsVisible(value);
    const handleComplete = data => {
        setAddress(data.address);
        setIsVisible(false);
    }
    const createMember = () => {
        const params = {
            id: userId,
            password: userPw,
            name,
            email,
            phone,
            address,
            addressDetail,
        };
        apiMember.createMember(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`회원가입 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`회원가입 실패:\n${data.msg}`);
                setIsJoining(false);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    const getMemberId = () => {
        const params = {
            memberId: userId,
        };
        const checkResult = Utils.checkParams(params);
        if (!checkResult.validated) return alert(checkResult.message);
        apiMember.getMemberId(params)
            .then(response => {
                const { data } = response;
                if (data.isExist) return alert('사용 불가능한 아이디 입니다.');
                if (data.isExist === null) return alert('사용 불가능한 아이디 입니다.');
                return alert('사용 가능한 아이디 입니다.');
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }

    return (
        <div className="join-container viewport-height-full">
            {isVisible && <Modal component={<DaumPostcodeEmbed onComplete={handleComplete} />}
                                 visible={isVisible}
                                 onClose={onClickModalClose} />}
            {isJoining ?
                <div className="join-box-form">
                    <div className="join-box-depth-1">
                        <div className="join-box-depth-2-top">
                            <div className="join-box-depth-3-complex">
                                <div className="join-box-depth-4-input">
                                    <input type="text" placeholder="아이디를 입력하세요." onChange={onChangeUserId}/>
                                </div>
                                <div className="join-box-depth-4-btn font-TAEBAEK" onClick={onClickDuplicate}>중복확인</div>
                            </div>
                            <div className="join-box-depth-3-simple">
                                <input type="password" placeholder="비밀번호를 입력하세요." onChange={onChangeUserPw}/>
                            </div>
                            <div className="join-box-depth-3-simple">
                                <input type="text" placeholder="이름을 입력하세요." onChange={onChangeName}/>
                            </div>
                            <div className="join-box-depth-3-simple">
                                <input type="text" placeholder="이메일을 입력하세요." onChange={onChangeEmail}/>
                            </div>
                            <div className="join-box-depth-3-simple">
                                <input type="text" placeholder="휴대폰번호를 입력하세요." onChange={onChangePhone}/>
                            </div>
                            <div className="join-box-depth-3-complex">
                                <div className="join-box-depth-4-input">
                                    <input type="text"
                                           placeholder="주소를 입력하세요."
                                           value={address}
                                           disabled
                                           style={depth4InputInlineStyle}/>
                                </div>
                                <div className="join-box-depth-4-btn font-TAEBAEK" onClick={onClickSearchAddress}>주소조회</div>
                            </div>
                            <div className="join-box-depth-3-simple">
                                <input type="text" placeholder="상세주소를 입력하세요." onChange={onChangeAddressDetail}/>
                            </div>
                        </div>
                        <div className="join-box-depth-2-bottom">
                            <div className="join-box-depth-3-btn-signup font-TAEBAEK" onClick={onClickSignUp}>SIGN UP</div>
                            <div className="join-box-depth-3-btn-home font-TAEBAEK">
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