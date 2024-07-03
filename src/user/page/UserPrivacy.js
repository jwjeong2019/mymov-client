import {Button, Col, Container, Form, Image, InputGroup, Modal, Row, Stack} from "react-bootstrap";
import {IoImageOutline} from "react-icons/io5";
import {useMemo, useState} from "react";
import apiMember from "../../api/apiMember";
import DaumPostcodeEmbed from "react-daum-postcode";
import {Utils} from "../../utils/Utils";
import {StorageUtils} from "../../utils/StorageUtil";
import apiToken from "../../api/apiToken";

const UserPrivacy = () => {
    const [inputs, setInputs] = useState({});
    const [isShow, setIsShow] = useState(false);
    const handleChangeInputsFile = e => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setInputs(prevState => ({ ...prevState, file, imageUrl: reader.result }));
        };
    };
    const handleChangeInputsMemberId = e => setInputs(prevState => ({ ...prevState, memberId: e.target.value }));
    const handleChangeInputsMemberPw = e => setInputs(prevState => ({ ...prevState, memberPw: e.target.value }));
    const handleChangeInputsMemberPwCheck = e => setInputs(prevState => ({ ...prevState, memberPwCheck: e.target.value }));
    const handleChangeInputsName = e => setInputs(prevState => ({ ...prevState, name: e.target.value }));
    const handleChangeInputsPhone = e => setInputs(prevState => ({ ...prevState, phone: e.target.value }));
    const handleChangeInputsEmail = e => setInputs(prevState => ({ ...prevState, email: e.target.value }));
    const handleChangeInputsAddress = e => setInputs(prevState => ({ ...prevState, memberId: e.target.value }));
    const handleChangeInputsAddressDetail = e => setInputs(prevState => ({ ...prevState, addressDetail: e.target.value }));
    const handleClickConfirmIdDuplication = () => getMemberId();
    const handleClickSearchAddress = () => setIsShow(true);
    const handleCompletePost = data => {
        setInputs(prevState => ({ ...prevState, address: data.address }));
        setIsShow(false);
    };
    const handleCloseModal = () => setIsShow(false);
    const handleClickModify = () => updateMember();
    const getMember = () => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            id: StorageUtils.getId(),
        };
        apiMember.getDetail(_params)
            .then(response => {
                const { data } = response;
                const _member = {
                    id: data.result.id,
                    memberId: data.result.memberId,
                    name: data.result.name,
                    email: data.result.email,
                    phone: data.result.phone,
                    address: data.result.address,
                    addressDetail: data.result.addressDetail,
                    imageUrl: data.result.attachment?.path
                };
                setInputs(_member);
            })
            .catch(err => {
                const { message, response } = err;
                if (!response) return alert(message);
                if (response.data.message === 'Expired JWT Token') {
                    apiToken.refresh(StorageUtils.getAuth().refreshToken)
                        .then(response => {
                            const { accessToken } = response.data;
                            const auth = JSON.stringify({ ...StorageUtils.getAuth(), accessToken });
                            localStorage.setItem('auth', auth);
                            getMember();
                        })
                        .catch(err => {
                            if (!err.response) return alert(err.message);
                            if (err.response.data.message === 'Expired JWT Token') {
                                alert('만료된 토큰입니다. 로그인을 다시 시도해주세요.');
                                window.location.href = '/login';
                            }
                        });
                    return;
                }
                alert(`err: ${response.data.message}`);
            });
    };
    const getMemberId = () => {
        const _params = {
            memberId: inputs.memberId,
        };
        apiMember.getMemberId(_params)
            .then(response => {
                const { data } = response;
                if (data.isExist) return alert('사용 불가능한 아이디 입니다.');
                if (data.isExist === null) return alert('사용 불가능한 아이디 입니다.');
                alert('사용 가능한 아이디 입니다.');
            })
            .catch(err => {
                const { message, response } = err;
                if (!response) return alert(message);
                if (response.data.message === 'Expired JWT Token') {
                    apiToken.refresh(StorageUtils.getAuth().refreshToken)
                        .then(response => {
                            const { accessToken } = response.data;
                            const auth = JSON.stringify({ ...StorageUtils.getAuth(), accessToken });
                            localStorage.setItem('auth', auth);
                            getMemberId();
                        })
                        .catch(err => {
                            if (!err.response) return alert(err.message);
                            if (err.response.data.message === 'Expired JWT Token') {
                                alert('만료된 토큰입니다. 로그인을 다시 시도해주세요.');
                                window.location.href = '/login';
                            }
                        });
                    return;
                }
                alert(`err: ${response.data.message}`);
            });
    };
    const updateMember = () => {
        const data = JSON.stringify({
            memberId: inputs.memberId,
            memberPw: inputs.memberPw,
            name: inputs.name,
            email: inputs.email,
            phone: inputs.phone,
            address: inputs.address,
            addressDetail: inputs.addressDetail,
        });
        const formData = new FormData();
        formData.append('data', data);
        formData.append('file', inputs.file);
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            formData
        };
        apiMember.updateMember(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`개인정보 변경 실패:\n${data.msg}`);
                alert('개인정보를 정상적으로 변경하였습니다.');
                localStorage.setItem('name', _params.name);
                window.location.reload();
            })
            .catch(err => {
                const { message, response } = err;
                if (!response) return alert(message);
                if (response.data.message === 'Expired JWT Token') {
                    apiToken.refresh(StorageUtils.getAuth().refreshToken)
                        .then(response => {
                            const { accessToken } = response.data;
                            const auth = JSON.stringify({ ...StorageUtils.getAuth(), accessToken });
                            localStorage.setItem('auth', auth);
                            updateMember();
                        })
                        .catch(err => {
                            if (!err.response) return alert(err.message);
                            if (err.response.data.message === 'Expired JWT Token') {
                                alert('만료된 토큰입니다. 로그인을 다시 시도해주세요.');
                                window.location.href = '/login';
                            }
                        });
                    return;
                }
                alert(`err: ${response.data.message}`);
            });
    };
    const init = () => {
        getMember();
    };
    useMemo(init, []);
    return (
        <>
            <Container>
                <Row>
                    <Col md={4}>
                        <Stack gap={3}>
                            <Image className={'w-100 bg-secondary-subtle'} height={200} src={inputs.imageUrl} />
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor={'file'}>
                                        <Stack direction={'horizontal'} gap={2}>
                                            <IoImageOutline className={'h4 m-0'} />
                                            <div className={'m-0'}>이미지 찾기</div>
                                        </Stack>
                                    </Form.Label>
                                    <Form.Control id={'file'} type={'file'} accept={'image/*'} hidden onChange={handleChangeInputsFile} />
                                </Form.Group>
                            </Form>
                        </Stack>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>아이디</Form.Label>
                                <InputGroup>
                                    <Form.Control value={inputs.memberId ?? ''} onChange={handleChangeInputsMemberId} />
                                    <Button variant={'dark'} onClick={handleClickConfirmIdDuplication}>중복확인</Button>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className={'mt-3'}>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type={'password'} onChange={handleChangeInputsMemberPw} />
                            </Form.Group>
                            <Form.Group className={'mt-3'}>
                                <Form.Label>비밀번호 확인</Form.Label>
                                <Form.Control type={'password'} onChange={handleChangeInputsMemberPwCheck} />
                            </Form.Group>
                            <Form.Group className={'mt-3'}>
                                <Form.Label>이름</Form.Label>
                                <Form.Control value={inputs.name ?? ''} onChange={handleChangeInputsName} />
                            </Form.Group>
                            <Form.Group className={'mt-3'}>
                                <Form.Label>연락처</Form.Label>
                                <Form.Control value={inputs.phone ?? ''} onChange={handleChangeInputsPhone} />
                            </Form.Group>
                            <Form.Group className={'mt-3'}>
                                <Form.Label>이메일</Form.Label>
                                <Form.Control value={inputs.email ?? ''} onChange={handleChangeInputsEmail} />
                            </Form.Group>
                            <Form.Group className={'mt-3'}>
                                <Form.Label>주소</Form.Label>
                                <InputGroup>
                                    <Form.Control value={inputs.address ?? ''} onChange={handleChangeInputsAddress} />
                                    <Button variant={'dark'} onClick={handleClickSearchAddress}>검색</Button>
                                </InputGroup>
                                <Form.Control className={'mt-2'} value={inputs.addressDetail ?? ''} onChange={handleChangeInputsAddressDetail} />
                            </Form.Group>
                        </Form>
                        <Stack className={'mt-5'}>
                            <Button variant={'dark'} onClick={handleClickModify}>변경하기</Button>
                        </Stack>
                    </Col>
                </Row>
            </Container>
            <Modal show={isShow} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>우편번호 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DaumPostcodeEmbed onComplete={handleCompletePost} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserPrivacy;