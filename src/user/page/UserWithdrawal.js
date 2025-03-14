import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useMemo, useState} from "react";
import {Utils} from "../../utils/Utils";
import apiMember from "../../api/apiMember";
import {useNavigate} from "react-router";
import {StorageUtils} from "../../utils/StorageUtil";
import apiToken from "../../api/apiToken";

const UserWithdrawal = () => {
    const navigate = useNavigate();
    const [radios, setRadios] = useState([]);
    const [inputs, setInputs] = useState({});
    const handleChangeInputsReasonType = e => setInputs(prevState => ({ ...prevState, reasonType: e.target.defaultValue }));
    const handleChangeInputsReasonDetail = e => setInputs(prevState => ({ ...prevState, reasonDetail: e.target.value }));
    const handleClickWithdrawal = () => {
        const isOk = window.confirm('삭제하시겠습니까?');
        if (isOk) deleteMember();
    };
    const deleteMember = () => {
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            reasonType: inputs.reasonType,
            reasonDetail: inputs.reasonDetail ?? '-',
        };
        apiMember.deleteMember(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`회원탈퇴 실패:\n${data.msg}`);
                alert('회원탈퇴를 완료하였습니다. 이용해주셔서 감사합니다.');
                localStorage.clear();
                navigate('/home');
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
                            deleteMember();
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
    const makeRadios = () => {
        setRadios([
            { label: '고객 응대 미흡', value: '고객 응대 미흡' },
            { label: '다른 플랫폼 이용', value: '다른 플랫폼 이용' },
            { label: '기타', value: '기타' },
        ]);
    };
    const init = () => {
        makeRadios();
    };
    useMemo(init, []);
    return (
        <Container>
            <Row>
                <Col>
                    <div className={'h4'}>1. 탈퇴 유형을 선택해주세요.</div>
                </Col>
            </Row>
            <Row className={'mt-3'}>
                <Col>
                    <Form className={'h5 d-flex flex-column gap-2'} onChange={handleChangeInputsReasonType}>
                        {radios.map((radio, radioIdx) => {
                            return (
                                <Form.Check
                                    key={`form-check-radio-${radioIdx}`}
                                    type={'radio'}
                                    name={'radio'}
                                    label={radio.label}
                                    value={radio.value}
                                />
                            );
                        })}
                    </Form>
                </Col>
            </Row>
            <Row className={'mt-4'}>
                <Col>
                    <div className={'h4'}>2. 탈퇴 사유를 작성해주세요.</div>
                    <div className={'h5'}>(기타 유형인 경우에 해당)</div>
                </Col>
            </Row>
            <Row className={'mt-3'}>
                <Col>
                    <Form>
                        <Form.Control
                            as={'textarea'}
                            rows={5}
                            disabled={inputs.reasonType !== '기타'}
                            onChange={handleChangeInputsReasonDetail}
                        />
                    </Form>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col>
                    <Button variant={'danger'} onClick={handleClickWithdrawal}>탈퇴하기</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UserWithdrawal;