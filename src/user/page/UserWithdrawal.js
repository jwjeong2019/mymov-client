import {Button, Col, Container, Form, Row} from "react-bootstrap";

const UserWithdrawal = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className={'h4'}>1. 탈퇴 유형을 선택해주세요.</div>
                </Col>
            </Row>
            <Row className={'mt-3'}>
                <Col>
                    <Form className={'h5 d-flex flex-column gap-2'}>
                        <Form.Check type={'radio'} name={'radio'} label={'고객 응대 미흡'} defaultChecked />
                        <Form.Check type={'radio'} name={'radio'} label={'다른 플랫폼 이용'} />
                        <Form.Check type={'radio'} name={'radio'} label={'기타'} />
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
                        <Form.Control as={'textarea'} rows={5} />
                    </Form>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col>
                    <Button variant={'danger'}>탈퇴하기</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UserWithdrawal;