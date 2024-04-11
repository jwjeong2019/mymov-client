import Button from "../components/Button";
import {useMemo, useState} from "react";
import apiMember from "../api/apiMember";
import {Utils} from "../utils/Utils";
import Modal from "../components/Modal";
import DaumPostcodeEmbed from "react-daum-postcode";

const MyPageModify = (props) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const storageId = JSON.parse(localStorage.getItem('id'));
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [addressDetail, setAddressDetail] = useState();
    const [isDuplicatedId, setIsDuplicatedId] = useState(true);
    const [isCertificatedEmail, setIsCertificatedEmail] = useState(false);
    const [isCertificatedPhone, setIsCertificatedPhone] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const onClickDuplicate = () => getMemberId();
    const onClickCertificate = value => console.log(`click certificate: ${value}`);
    const onClickAddress = () => setIsVisible(true);
    const onChangeId = e => setId(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);
    const onChangePasswordCheck = e => setPasswordCheck(e.target.value);
    const onChangeName = e => setName(e.target.value);
    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePhone = e => setPhone(e.target.value);
    const onChangeAddress = e => setAddress(e.target.value);
    const onChangeAddressDetail = e => setAddressDetail(e.target.value);
    const onClickModify = value => updateMember();
    const onClickModalClose = value => setIsVisible(value);
    const handleComplete = data => {
        setAddress(data.address);
        setIsVisible(false);
    }
    const init = () => getMemberDetail();
    const getMemberDetail = () => {
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            id: storageId,
        };
        apiMember.getDetail(params)
            .then(response => {
                const { data } = response;
                setId(data.result.memberId);
                setName(data.result.name);
                setEmail(data.result.email);
                setPhone(data.result.phone);
                setAddress(data.result.address);
                setAddressDetail(data.result.addressDetail)
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    const updateMember = () => {
        if (!password) return alert('비밀번호를 입력해주세요.');
        if (!passwordCheck) return alert('비밀번호 확인을 입력해주세요.');
        if (password !== passwordCheck) return alert('비밀번호를 다시 확인해주세요.');
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            memberId: id,
            memberPw: password,
            name,
            email,
            phone,
            address,
            addressDetail,
        };
        apiMember.updateMember(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`개인정보 변경 실패:\n${data.msg}`);
                alert('개인정보를 정상적으로 변경하였습니다.');

            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    const getMemberId = () => {
        const params = {
            memberId: id,
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
    useMemo(init, []);
    return (
        <div className="mypage-modify-container">
            {isVisible && <Modal component={<DaumPostcodeEmbed onComplete={handleComplete} />}
                                 visible={isVisible}
                                 onClose={onClickModalClose} />}
            <div className="mypage-modify-title font-HakDotR">{props.title}</div>
            <div className="mypage-modify-detail">
                <div className="mypage-modify-detail-box">
                    <div className="mypage-modify-detail-box-row-button-with">
                        <div className="mypage-modify-detail-box-col-title font-HakDotR">아이디</div>
                        <div className="mypage-modify-detail-box-col-input">
                            <input className="font-HakDotR" type="text" value={id} placeholder={'아이디를 입력하세요.'} onChange={onChangeId}/>
                            <Button title={'중복확인'} width={72} outline onClick={onClickDuplicate} />
                        </div>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-without">
                        <div className="mypage-modify-detail-box-col-title font-HakDotR">비밀번호</div>
                        <input className="font-HakDotR" type="password" placeholder={'비밀번호를 입력하세요.'} onChange={onChangePassword}/>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-without">
                        <div className="mypage-modify-detail-box-col-title font-HakDotR">비밀번호확인</div>
                        <input className="font-HakDotR" type="password" placeholder={'비밀번호를 입력하세요.'} onChange={onChangePasswordCheck}/>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-without">
                        <div className="mypage-modify-detail-box-col-title font-HakDotR">이름</div>
                        <input className="font-HakDotR" type="text" value={name} placeholder={'이름을 입력하세요.'} onChange={onChangeName}/>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-without">
                        <div className="mypage-modify-detail-box-col-title font-HakDotR">이메일</div>
                        <input className="font-HakDotR" type="email" value={email} placeholder={'이메일을 입력하세요.'} onChange={onChangeEmail}/>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-without">
                        <div className="mypage-modify-detail-box-col-title font-HakDotR">휴대폰번호</div>
                        <input className="font-HakDotR" type="number" value={phone} placeholder={'휴대폰번호를 입력하세요.'} onChange={onChangePhone}/>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-with">
                        <div className="mypage-modify-detail-box-col-title font-HakDotR">주소</div>
                        <div className="mypage-modify-detail-box-col-input">
                            <input className="font-HakDotR" type="text" value={address} placeholder={'주소를 입력하세요.'} onChange={onChangeAddress}/>
                            <Button title={'조회'} width={72} outline onClick={onClickAddress} />
                        </div>
                    </div>
                    <div className="mypage-modify-detail-box-row-only-input">
                        <input className="font-HakDotR" type="text" value={addressDetail} placeholder={'주소를 입력하세요.'} onChange={onChangeAddressDetail}/>
                    </div>
                    <div className="mypage-modify-detail-box-row-only-button">
                        <Button title={'변경'} width={72} onClick={onClickModify} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPageModify;