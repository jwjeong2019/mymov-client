import '../css/FindIdPwd.css';
import Button from "../components/Button";
import {useMemo, useState} from "react";
import Radio from "../components/Radio";
import {useNavigate} from "react-router";
const FindIdPwd = () => {
    const tabInlineStyle = {
        backgroundColor: '#CDD8FF'
    };
    const navigate = useNavigate();
    const [tab, setTab] = useState('findId');
    const [radioList, setRadioList] = useState([]);
    const [checkedRadio, setCheckedRadio] = useState('phone');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isStartStep, setIsStartStep] = useState(true);
    const [isChangingPwd, setIsChangingPwd] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const onClickTab = menu => {
        clearInput();
        setTab(menu);
        setCheckedRadio('phone');
        setIsStartStep(true);
    }
    const onClickRadio = value => {
        setPhone('');
        setEmail('');
        setCheckedRadio(value);
    }
    const onChangeId = e => setUserId(e.target.value);
    const onChangeName = e => setUserName(e.target.value);
    const onChangePhone = e => setPhone(e.target.value);
    const onChangeEmail = e => setEmail(e.target.value);
    const onChangeCode = e => setCode(e.target.value);
    const onClickCertification = value => {
        if (value === 'phone') console.log('certificate by phone');
        if (value === 'email') console.log('certificate by email');
    };
    const onClickConfirm = () => {
        console.log({userId, userName, email, phone, code});
        setIsStartStep(prevState => !prevState);
    }
    const onClickBack = () => navigate(-1);
    const onClickButtonFindPwd = () => {
        clearInput();
        setTab('findPwd');
        setCheckedRadio('phone');
        setIsStartStep(true);
    };
    const onClickButtonLogin = () => navigate('/signIn');
    const onClickButtonChangePwd = () => setIsChangingPwd(false);
    const onChangePassword = e => setPassword(e.target.value);
    const onChangePasswordCheck = e => setPasswordCheck(e.target.value);
    const clearInput = () => {
        setUserId('');
        setUserName('');
        setPhone('');
        setEmail('');
        setCode('');
        setPassword('');
        setPasswordCheck('');
    }
    const init = () => {
        setRadioList([
            { keyName: 'phone', value: 'phone', title: '휴대폰인증', onClick: onClickRadio},
            { keyName: 'email', value: 'email', title: '이메일인증', onClick: onClickRadio},
        ]);
    }
    useMemo(init, []);
    return (
        <div className="findidpwd-container">
            <div className="findidpwd-tab">
                <div className="findidpwd-tab-menus">
                    <div className="findidpwd-tab-menus-menu font-TAEBAEK"
                         style={tab === 'findId' ? tabInlineStyle : null}
                         onClick={() => onClickTab('findId')}>아이디 찾기</div>
                    <div className="findidpwd-tab-menus-menu font-TAEBAEK"
                         style={tab === 'findPwd' ? tabInlineStyle : null}
                         onClick={() => onClickTab('findPwd')}>비밀번호 찾기</div>
                </div>
                <div className="findidpwd-tab-contents">
                    {isStartStep ?
                        <div className="findidpwd-tab-contents-box">
                            {tab === 'findPwd' &&
                            <div className="findidpwd-tab-contents-box-row">
                                <div className="findidpwd-tab-contents-box-row-title font-TAEBAEK">아이디:</div>
                                <div className="findidpwd-tab-contents-box-row-input">
                                    <input type="text" placeholder={'아이디를 입력하세요.'} value={userId} onChange={onChangeId}/>
                                </div>
                            </div>
                            }
                            <div className="findidpwd-tab-contents-box-row">
                                <div className="findidpwd-tab-contents-box-row-title font-TAEBAEK">이름:</div>
                                <div className="findidpwd-tab-contents-box-row-input">
                                    <input type="text" placeholder={'이름을 입력하세요.'} value={userName} onChange={onChangeName}/>
                                </div>
                            </div>
                            {checkedRadio === 'phone' ?
                                <div className="findidpwd-tab-contents-box-row-certification">
                                    <div className="findidpwd-tab-contents-box-row-title font-TAEBAEK">휴대폰번호:</div>
                                    <div className="findidpwd-tab-contents-box-row-input">
                                        <input type="number" placeholder={'휴대폰번호를 입력하세요.'} value={phone} onChange={onChangePhone}/>
                                        <Button title={'인증요청'} value={'phone'} onClick={onClickCertification} />
                                    </div>
                                </div>
                                :
                                <div className="findidpwd-tab-contents-box-row-certification">
                                    <div className="findidpwd-tab-contents-box-row-title font-TAEBAEK">이메일:</div>
                                    <div className="findidpwd-tab-contents-box-row-input">
                                        <input type="email" placeholder={'이메일을 입력하세요.'} value={email} onChange={onChangeEmail}/>
                                        <Button title={'인증요청'} value={'email'} onClick={onClickCertification} />
                                    </div>
                                </div>
                            }
                            <div className="findidpwd-tab-contents-box-row-radio">
                                {radioList.length > 0 && radioList.map(radio => {
                                    return (
                                        <Radio key={`radio-${radio.keyName}`} title={radio.title}
                                               checked={checkedRadio === radio.value}
                                               value={radio.value}
                                               onClick={radio.onClick} />
                                    )
                                })}
                            </div>
                            <div className="findidpwd-tab-contents-box-row">
                                <div className="findidpwd-tab-contents-box-row-title font-TAEBAEK">인증번호:</div>
                                <div className="findidpwd-tab-contents-box-row-input">
                                    <input type="number" placeholder={'인증번호를 입력하세요.'} value={code} onChange={onChangeCode}/>
                                </div>
                            </div>
                            <div className="findidpwd-tab-contents-box-row-button">
                                <Button title={'확인'} width={200} onClick={onClickConfirm} />
                                <Button title={'뒤로가기'} outline width={200} onClick={onClickBack} />
                            </div>
                        </div>
                        :
                        <div className="findidpwd-tab-contents-result-box">
                            {tab === 'findId' ?
                                <div className="findidpwd-tab-contents-result-box-row-top">
                                    <div className="findidpwd-tab-contents-result-box-row-title font-TAEBAEK">회원님의 아이디를 찾았습니다.</div>
                                    <div className="findidpwd-tab-contents-result-box-row-id font-HakDotR">abcd@efghijk.com</div>
                                </div>
                                :
                                <div className="findidpwd-tab-contents-result-box-row-top">
                                    {isChangingPwd ?
                                        <>
                                            <div className="findidpwd-tab-contents-result-box-row-newpwd font-TAEBAEK">
                                                <div className="findidpwd-tab-contents-result-box-row-newpwd-col-title">새 비밀번호:</div>
                                                <div className="findidpwd-tab-contents-result-box-row-newpwd-col-input">
                                                    <input type="password" value={password} onChange={onChangePassword}/>
                                                </div>
                                            </div>
                                            <div className="findidpwd-tab-contents-result-box-row-newpwd font-TAEBAEK">
                                                <div className="findidpwd-tab-contents-result-box-row-newpwd-col-title">새 비밀번호 확인:</div>
                                                <div className="findidpwd-tab-contents-result-box-row-newpwd-col-input">
                                                    <input type="password" value={passwordCheck} onChange={onChangePasswordCheck}/>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <div className="findidpwd-tab-contents-result-box-row-newpwd-complete font-TAEBAEK">비밀번호를 변경하였습니다.</div>
                                    }
                                </div>
                            }
                            {tab === 'findId' ?
                                <div className="findidpwd-tab-contents-result-box-row-bottom">
                                    <Button title={'비밀번호찾기'} outline width={200} onClick={onClickButtonFindPwd} />
                                    <Button title={'로그인'} outline width={200} onClick={onClickButtonLogin} />
                                </div>
                                :
                                <div className="findidpwd-tab-contents-result-box-row-bottom-center">
                                    {isChangingPwd ?
                                        <Button title={'비밀번호변경'} outline width={200} onClick={onClickButtonChangePwd} />
                                        :
                                        <Button title={'로그인'} outline width={200} onClick={onClickButtonLogin} />
                                    }
                                </div>
                            }
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
export default FindIdPwd;