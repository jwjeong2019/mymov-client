import Button from "../components/Button";
import {useMemo, useState} from "react";
import apiMember from "../api/apiMember";
import {Utils} from "../utils/Utils";

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
    const onClickDuplicate = value => console.log(`click duplicate: ${value}`);
    const onClickCertificate = value => console.log(`click certificate: ${value}`);
    const onClickAddress = value => console.log(`click address: ${value}`);
    const onChangeId = e => setId(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);
    const onChangePasswordCheck = e => setPasswordCheck(e.target.value);
    const onChangeName = e => setName(e.target.value);
    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePhone = e => setPhone(e.target.value);
    const onChangeAddress = e => setAddress(e.target.value);
    const onChangeAddressDetail = e => setAddressDetail(e.target.value);
    const onClickModify = value => updateMember();
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

                const slicedObject = Utils.sliceLastElementFromDelimiter(data.result.address, ' ');
                setAddress(slicedObject.rest);
                setAddressDetail(slicedObject.last);
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    const updateMember = () => {
        if (password !== passwordCheck) return alert('비밀번호를 다시 확인해주세요.');
        const params = {
            grantType: auth.grantType,
            accessToken: auth.accessToken,
            memberId: id,
            memberPw: password,
            name,
            email,
            phone,
            address: `${address} ${addressDetail}`,
        };
        apiMember.updateMember(params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`개인정보 변경 실패:\n${data.msg}`);
                alert('개인정보를 정상적으로 변경하였습니다.');

            })
            .catch(err => alert(`ERROR: ${err.message}`));
    }
    useMemo(init, []);
    return (
        <div className="mypage-modify-container">
            <div className="mypage-modify-title">{props.title}</div>
            <div className="mypage-modify-detail">
                <div className="mypage-modify-detail-box">
                    <div className="mypage-modify-detail-box-row-button-with">
                        <div className="mypage-modify-detail-box-col-title">아이디</div>
                        <div className="mypage-modify-detail-box-col-input">
                            <input type="text" value={id} placeholder={'아이디를 입력하세요.'} onChange={onChangeId}/>
                            <Button title={'중복확인'} width={72} outline onClick={onClickDuplicate} />
                        </div>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-without">
                        <div className="mypage-modify-detail-box-col-title">비밀번호</div>
                        <input type="password" placeholder={'비밀번호를 입력하세요.'} onChange={onChangePassword}/>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-without">
                        <div className="mypage-modify-detail-box-col-title">비밀번호확인</div>
                        <input type="password" placeholder={'비밀번호를 입력하세요.'} onChange={onChangePasswordCheck}/>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-without">
                        <div className="mypage-modify-detail-box-col-title">이름</div>
                        <input type="text" value={name} placeholder={'이름을 입력하세요.'} onChange={onChangeName}/>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-with">
                        <div className="mypage-modify-detail-box-col-title">이메일</div>
                        <div className="mypage-modify-detail-box-col-input">
                            <input type="email" value={email} placeholder={'이메일을 입력하세요.'} onChange={onChangeEmail}/>
                            <Button title={'인증요청'} width={72} outline value={'email'} onClick={onClickCertificate} />
                        </div>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-with">
                        <div className="mypage-modify-detail-box-col-title">휴대폰번호</div>
                        <div className="mypage-modify-detail-box-col-input">
                            <input type="number" value={phone} placeholder={'휴대폰번호를 입력하세요.'} onChange={onChangePhone}/>
                            <Button title={'인증요청'} width={72} outline value={'phone'} onClick={onClickDuplicate} />
                        </div>
                    </div>
                    <div className="mypage-modify-detail-box-row-button-with">
                        <div className="mypage-modify-detail-box-col-title">주소</div>
                        <div className="mypage-modify-detail-box-col-input">
                            <input type="text" value={address} placeholder={'주소를 입력하세요.'} onChange={onChangeAddress}/>
                            <Button title={'조회'} width={72} outline onClick={onClickAddress} />
                        </div>
                    </div>
                    <div className="mypage-modify-detail-box-row-only-input">
                        <input type="text" value={addressDetail} placeholder={'주소를 입력하세요.'} onChange={onChangeAddressDetail}/>
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