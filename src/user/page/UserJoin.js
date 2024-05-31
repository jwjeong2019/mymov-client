import {Button, Card, Col, Container, Form, InputGroup, Modal, Row, Stack} from "react-bootstrap";
import {useState} from "react";
import apiMember from "../../api/apiMember";
import DaumPostcodeEmbed from "react-daum-postcode";
import {Utils} from "../../utils/Utils";
import {useNavigate} from "react-router";

const UserJoin = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [isShow, setIsShow] = useState(false);
    const handleChangeInputsId = e => setInputs(prevState => ({ ...prevState, id: e.target.value }));
    const handleChangeInputsPassword = e => setInputs(prevState => ({ ...prevState, password: e.target.value }));
    const handleChangeInputsName = e => setInputs(prevState => ({ ...prevState, name: e.target.value }));
    const handleChangeInputsPhone = e => setInputs(prevState => ({ ...prevState, phone: e.target.value }));
    const handleChangeInputsEmail = e => setInputs(prevState => ({ ...prevState, email: e.target.value }));
    const handleChangeInputsAddress = e => setInputs(prevState => ({ ...prevState, address: e.target.value }));
    const handleChangeInputsAddressDetail = e => setInputs(prevState => ({ ...prevState, addressDetail: e.target.value }));
    const handleClickDuplicatedId = () => getMemberId();
    const handleClickSearchAddress = () => setIsShow(true);
    const handleCompletePost = data => {
        setInputs(prevState => ({ ...prevState, address: data.address }));
        setIsShow(false);
    };
    const handleCloseModal = () => setIsShow(false);
    const handleClickCreateAccount = () => createMember();
    const getMemberId = () => {
        const _params = {
            memberId: inputs.id,
        };
        apiMember.getMemberId(_params)
            .then(response => {
                const { data } = response;
                if (data.isExist) return alert('사용 불가능한 아이디 입니다.');
                if (data.isExist === null) return alert('사용 불가능한 아이디 입니다.');
                return alert('사용 가능한 아이디 입니다.');
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const createMember = () => {
        const _params = {
            id: inputs.id,
            password: inputs.password,
            name: inputs.name,
            email: inputs.email,
            phone: inputs.phone,
            address: inputs.address,
            addressDetail: inputs.addressDetail,
        };
        apiMember.createMember(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`회원가입 실패:\n${data.msg}`);
                if (Utils.isContainedWordFrom('already', data.msg)) return alert(`회원가입 실패:\n${data.msg}`);
                alert('성공적으로 회원가입을 완료하였습니다!');
                navigate('/login');
            })
            .catch(err => alert(`ERROR: ${err.message}`));
    };
    return (
        <>
            <Container>
                <Row className={'mt-5'}>
                    <Col className={'d-flex justify-content-center'}>
                        <Card className={'w-50'}>
                            <Card.Body>
                                <Card.Title className={'d-flex justify-content-center'}>
                                    <div className={'h1 font-HakDotR'}>Join</div>
                                </Card.Title>
                                <Card.Text className={'mt-5'}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>ID</Form.Label>
                                            <InputGroup>
                                                <Form.Control placeholder={'Enter your ID'} onChange={handleChangeInputsId} />
                                                <Button variant={'outline-dark'} value={inputs.id ?? ''} onClick={handleClickDuplicatedId}>중복확인</Button>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className={'mt-3'}>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type={'password'} placeholder={'Enter your Password'} value={inputs.password ?? ''} onChange={handleChangeInputsPassword} />
                                        </Form.Group>
                                        <Form.Group className={'mt-3'}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control placeholder={'Enter your Name'} value={inputs.name ?? ''} onChange={handleChangeInputsName} />
                                        </Form.Group>
                                        <Form.Group className={'mt-3'}>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control placeholder={'Enter your Phone'} value={inputs.phone ?? ''} onChange={handleChangeInputsPhone} />
                                        </Form.Group>
                                        <Form.Group className={'mt-3'}>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control placeholder={'Enter your Email'} value={inputs.email ?? ''} onChange={handleChangeInputsEmail} />
                                        </Form.Group>
                                        <Form.Group className={'mt-3'}>
                                            <Form.Label>Address</Form.Label>
                                            <InputGroup>
                                                <Form.Control placeholder={'Enter your Address'} value={inputs.address ?? ''} onChange={handleChangeInputsAddress} />
                                                <Button variant={'outline-dark'} onClick={handleClickSearchAddress}>검색</Button>
                                            </InputGroup>
                                            <Form.Control className={'mt-2'} placeholder={'Enter detail of Address'} value={inputs.addressDetail ?? ''} onChange={handleChangeInputsAddressDetail} />
                                        </Form.Group>
                                    </Form>
                                    <Stack className={'mt-5'}>
                                        <Button variant={'dark'} onClick={handleClickCreateAccount}>Create account</Button>
                                    </Stack>
                                </Card.Text>
                            </Card.Body>
                        </Card>
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

export default UserJoin;