import {Button, Card, Col, Container, Nav, Navbar, Offcanvas, Row} from "react-bootstrap";
import {Outlet} from 'react-router-dom';

const AdminMain = () => {
    return (
        <>
            <Navbar bg={'dark'} variant={'dark'} sticky={'top'}>
                <Container>
                    <Navbar.Brand>Simple Movie</Navbar.Brand>
                    <Navbar.Collapse className={'justify-content-end'}>
                        <Nav className={'text-light'}>
                            <Nav.Link>로그인</Nav.Link>
                            <Nav.Link>로그아웃</Nav.Link>
                        </Nav>
                        <Navbar.Text>관리자님 반갑습니다.</Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Row className={'mt-4'}>
                    <Col sm={3}>
                        <Card bg={'dark'} text={'light'}>
                            <Card.Header>
                                <Card.Title>Side Menu</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Nav className={'flex-column'}>
                                    <Nav.Link className={'text-decoration-none text-light'}>장르 관리하기</Nav.Link>
                                    <Nav.Link className={'text-decoration-none text-light'}>영화 관리하기</Nav.Link>
                                    <Nav.Link className={'text-decoration-none text-light'}>영화관 관리하기</Nav.Link>
                                    <Nav.Link className={'text-decoration-none text-light'}>상영관 관리하기</Nav.Link>
                                    <Nav.Link className={'text-decoration-none text-light'}>좌석 관리하기</Nav.Link>
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Container>
                                    <div style={{ fontSize: 50 }}>장르 관리</div>
                                </Container>
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
        </>
    );
};

export default AdminMain;