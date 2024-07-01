import {Button, Card, Col, Container, Form, InputGroup, Nav, Row, Stack} from "react-bootstrap";
import {useState} from "react";
import apiMember from "../../api/apiMember";
import {Utils} from "../../utils/Utils";

const UserLogin = () => {
    const [inputs, setInputs] = useState({});
    const handleChangeInputsId = e => setInputs(prevState => ({ ...prevState, id: e.target.value }));
    const handleChangeInputsPassword = e => setInputs(prevState => ({ ...prevState, password: e.target.value }));
    const handleClickLogin = () => createToken();
    const createToken = () => {
        const _params = {
            memberId: inputs.id,
            memberPw: inputs.password
        };
        apiMember.createToken(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                localStorage.setItem('auth', JSON.stringify(data.token));
                localStorage.setItem('id', data.detail.id);
                localStorage.setItem('name', data.detail.name);
                localStorage.setItem('role', 'USER');
                window.location.href = '/home';
            })
            .catch(err => {
                const { message, response } = err;
                if (!response) return alert(message);
                alert(`err: ${response.data.message}`);
            });
    };
    return (
        <Container>
            <Row className={'mt-5'}>
                <Col className={'d-flex justify-content-center'}>
                    <Card className={'w-50'}>
                        <Card.Body>
                            <Card.Title className={'d-flex justify-content-center'}>
                                <div className={'h1 font-HakDotR'}>Login</div>
                            </Card.Title>
                            <Card.Text className={'mt-5'}>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control placeholder={'Enter your ID'} onChange={handleChangeInputsId} />
                                    </Form.Group>
                                    <Form.Group className={'mt-3'}>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type={'password'} placeholder={'Enter your Password'} onChange={handleChangeInputsPassword} />
                                    </Form.Group>
                                </Form>
                                <Stack className={'mt-5'} gap={2}>
                                    <Button variant={'dark'} onClick={handleClickLogin}>Log in</Button>
                                    <Stack className={'justify-content-center'} direction={'horizontal'} gap={2}>
                                        <div>Don't have an account?</div>
                                        <Nav.Link className={'fw-bold'} href={'/join'}>Join</Nav.Link>
                                    </Stack>
                                </Stack>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserLogin;