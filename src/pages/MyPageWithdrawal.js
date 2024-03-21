import Button from "../components/Button";
import Radio from "../components/Radio";
import {useState} from "react";
import {IoCheckmarkCircleOutline} from "react-icons/io5";
import {useNavigate} from "react-router";
import apiMember from "../api/apiMember";
import {Utils} from "../utils/Utils";

const MyPageWithdrawal = (props) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let navigate = useNavigate();
    const [radioValue, setRadioValue] = useState();
    const [textareaValue, setTextareaValue] = useState();
    const [isCompleted, setIsCompleted] = useState(false);
    const onClickRadio = value => setRadioValue(value);
    const onChangeTextarea = e => setTextareaValue(e.target.value);
    const onClickButton = value => {
        if (value === 'btnWithdrawal') deleteMember();
        if (value === 'back') navigate('/');
    }
    const deleteMember = () => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
        };
        apiMember.deleteMember(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`회원탈퇴 실패:\n${data.msg}`);
                localStorage.clear();
                setIsCompleted(true);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    return (
        <div className="mypage-withdrawal-container">
            <div className="mypage-withdrawal-title font-HakDotR">{props.title}</div>
            <div className="mypage-withdrawal-detail">
                {isCompleted ?
                    <div className="mypage-withdrawal-complete-box">
                        <div className="mypage-withdrawal-complete-box-center">
                            <div className="mypage-withdrawal-complete-box-center-top">
                                <div className="mypage-withdrawal-complete-box-center-top-icon"><IoCheckmarkCircleOutline /></div>
                                <div className="mypage-withdrawal-complete-box-center-top-text font-HakDotR">탈퇴를 완료하였습니다.</div>
                            </div>
                            <Button title="돌아가기"
                                    outline
                                    width={270}
                                    value={'back'}
                                    onClick={onClickButton} />
                        </div>
                    </div>
                    :
                    <div className="mypage-withdrawal-detail-box">
                        <div className="mypage-withdrawal-detail-box-row-radio">
                            <div className="mypage-withdrawal-detail-box-col-reason-text font-HakDotR">탈퇴사유</div>
                            <div className="mypage-withdrawal-detail-box-col-reason-radio">
                                <div className="mypage-withdrawal-detail-box-col-reason-radio-top">
                                    <div className="mypage-withdrawal-detail-box-col-reason-radio-box font-HakDotR">
                                        <Radio title={'장기 미사용'} value={'long_term'} onClick={onClickRadio} />
                                        <Radio title={'적은 혜택'} value={'little_benefit'} onClick={onClickRadio} />
                                        <Radio title={'다른 플랫폼 이용'} value={'other_platform'} onClick={onClickRadio} />
                                        <Radio title={'기타'} value={'etc'} onClick={onClickRadio} />
                                    </div>
                                    <textarea className="font-HakDotR"
                                              type="text"
                                              onChange={onChangeTextarea}
                                              placeholder={'그 외 아쉬운 점이나 개선할 점을 50자 이내로 적어주세요.'}/>
                                </div>
                                <div className="mypage-withdrawal-detail-box-col-reason-radio-middle">
                                    <div className="mypage-withdrawal-detail-box-col-question font-HakDotR">이대로 진행하시겠습니까?</div>
                                    <div className="mypage-withdrawal-detail-box-col-note font-HakDotR">한번 탈퇴를 진행하면 다시 복구할 수 없습니다.</div>
                                </div>
                                <div className="mypage-withdrawal-detail-box-col-reason-radio-bottom">
                                    <Button title={'탈퇴하기'} value={'btnWithdrawal'} onClick={onClickButton} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MyPageWithdrawal;