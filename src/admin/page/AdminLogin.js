import {Button, Card, Col, Container, Form, Row, Stack} from "react-bootstrap";
import {useState} from "react";
import apiAdmin from "../../api/apiAdmin";
import {Utils} from "../../utils/Utils";
import {useNavigate} from "react-router";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const handleChangeInputsId = e => setInputs(prevState => ({ ...prevState, id: e.target.value }));
    const handleChangeInputsPassword = e => setInputs(prevState => ({ ...prevState, password: e.target.value }));
    const handleClickTryIt = () => createToken();
    const createToken = () => {
        const _params = {
            adminId: inputs.id,
            adminPw: inputs.password,
        };
        apiAdmin.createToken(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert('아이디 또는 비밀번호가 올바르지 않습니다.');
                localStorage.setItem('auth', JSON.stringify(data.token));
                localStorage.setItem('name', data.detail.name);
                localStorage.setItem('role', `ADMIN_${data.detail.role}`);
                navigate('/admin/management/genre');
            })
            .catch(err => alert(`error: ${err.message}`));
    };
    return (
        <Container className={'font-TAEBAEK'}>
            <Row className={'mt-5'}>
                <Col md={7}>
                    <Card>
                        <Card.Img src={'https://cdn.pixabay.com/photo/2018/05/09/17/38/gears-3385696_1280.jpg'} />
                    </Card>
                </Col>
                <Col className={'d-flex flex-column'} md={5}>
                    <Stack>
                        <div className={'font-HakMulB'} style={{ fontSize: 60 }}>LOGIN PAGE</div>
                        <div>Please put your ID and PASSWORD.</div>
                    </Stack>
                    <Stack className={'justify-content-end'}>
                        <Form>
                            <Form.Group>
                                <Form.Label>ID</Form.Label>
                                <Form.Control onChange={handleChangeInputsId} />
                            </Form.Group>
                            <Form.Group className={'mt-3'}>
                                <Form.Label>PASSWORD</Form.Label>
                                <Form.Control type={'password'} onChange={handleChangeInputsPassword} />
                            </Form.Group>
                        </Form>
                        <Button className={'mt-5'} variant={'dark'} onClick={handleClickTryIt}>
                            <div className={'h3 m-0 fw-bold'}>Try It</div>
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLogin;