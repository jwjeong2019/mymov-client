import {Card, Col, Container, Nav, Row, Stack} from "react-bootstrap";
import {IoEllipsisVerticalCircleOutline, IoShieldHalf, IoTicketOutline} from "react-icons/io5";
import {Outlet} from 'react-router-dom';

const UserMyPage = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className={'font-HakMulB'} style={{ fontSize: 60 }}>My Page</div>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col md={3}>
                    <Card className={'sticky-top'} style={{ top: '12%' }}>
                        <Card.Body>
                            <Card.Title>
                                <Stack direction={'horizontal'} gap={2}>
                                    <IoShieldHalf />
                                    <div>보안</div>
                                </Stack>
                            </Card.Title>
                            <Nav>
                                <Nav.Link className={'text-dark'}>개인정보변경</Nav.Link>
                            </Nav>
                            <hr/>
                            <Card.Title>
                                <Stack direction={'horizontal'} gap={2}>
                                    <IoTicketOutline />
                                    <div>서비스</div>
                                </Stack>
                            </Card.Title>
                            <Nav>
                                <Nav.Link className={'text-dark'}>예매현황</Nav.Link>
                            </Nav>
                            <hr/>
                            <Card.Title>
                                <Stack direction={'horizontal'} gap={2}>
                                    <IoEllipsisVerticalCircleOutline />
                                    <div>기타</div>
                                </Stack>
                            </Card.Title>
                            <Nav>
                                <Nav.Link className={'text-dark'}>탈퇴하기</Nav.Link>
                            </Nav>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <div className={'h2'}>개인정보변경</div>
                        </Col>
                    </Row>
                    <Row className={'mt-4'}>
                        <Col>
                            <Outlet />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default UserMyPage;