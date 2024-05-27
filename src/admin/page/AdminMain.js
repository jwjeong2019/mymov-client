import {Button, Card, Col, Container, Nav, Navbar, Offcanvas, Row} from "react-bootstrap";
import {Outlet} from 'react-router-dom';
import {useLocation, useNavigate} from "react-router";
import {useMemo, useState} from "react";

const AdminMain = () => {
    const storageItemName = localStorage.getItem('name');
    const navigate = useNavigate();
    const location = useLocation();
    const [sideMenuItems, setSideMenuItems] = useState([]);
    const [menuTitle, setMenuTitle] = useState('');
    const handleClickLogout = () => {
        localStorage.clear();
        navigate('/admin/login');
    };
    const makeSideMenuItems = () => {
        const baseURL = '/admin/management';
        setSideMenuItems([
            { path: `${baseURL}/genre`, name: '장르 관리하기' },
            { path: `${baseURL}/movie`, name: '영화 관리하기' },
            { path: `${baseURL}/cinema`, name: '영화관 관리하기' },
            { path: `${baseURL}/theater`, name: '상영관 관리하기' },
            { path: `${baseURL}/seat`, name: '좌석 관리하기' },
        ]);
    };
    const makeMenuTitle = () => {
        const type = location.pathname.split('/').pop();
        let titleName = '';
        switch (type) {
            case 'genre': titleName = '장르 관리'; break;
            case 'movie': titleName = '영화 관리'; break;
            case 'cinema': titleName = '영화관 관리'; break;
            case 'theater': titleName = '상영관 관리'; break;
            case 'seat': titleName = '좌석 관리'; break;
        }
        setMenuTitle(titleName);
    };
    const init = () => {
        makeSideMenuItems();
        makeMenuTitle();
    };
    useMemo(init, []);
    return (
        <>
            <Navbar bg={'dark'} variant={'dark'} sticky={'top'}>
                <Container>
                    <Navbar.Brand>Simple Movie</Navbar.Brand>
                    <Navbar.Collapse className={'justify-content-end'}>
                        <Navbar.Text>{storageItemName}님 반갑습니다.</Navbar.Text>
                        <Nav className={'text-light'}>
                            <Nav.Link onClick={handleClickLogout}>로그아웃</Nav.Link>
                        </Nav>
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
                                    {sideMenuItems.map((item, itemIdx) => {
                                        return <Nav.Link key={`side-menu-${itemIdx}`}
                                                         className={'text-decoration-none text-light'}
                                                         href={item.path}>{item.name}</Nav.Link>;
                                    })}
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Container>
                                    <div style={{ fontSize: 50 }}>{menuTitle}</div>
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