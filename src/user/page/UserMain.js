import {Container, Image, Nav, Navbar, Offcanvas, Stack} from "react-bootstrap";
import {IoIosLogOut} from "react-icons/io";
import {IoShieldHalf, IoTicketOutline} from "react-icons/io5";
import {Outlet} from 'react-router-dom';

const UserMain = () => {
    return (
        <>
            <Navbar bg={'dark'} variant={'dark'} sticky={'top'} expand={false}>
                <Container>
                    <Navbar.Brand>
                        <Stack direction={'horizontal'} gap={3}>
                            <Image
                                className={'bg-light'}
                                src={'https://cdn.pixabay.com/photo/2013/07/13/12/18/camera-159582_1280.png'}
                                width={50}
                                height={50}
                                roundedCircle
                            />
                            <div className={'h4 font-HakDotR m-0'}>Simple Movie</div>
                        </Stack>
                    </Navbar.Brand>
                    <Nav className={'me-auto flex-row gap-3'}>
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>Movies</Nav.Link>
                        <Nav.Link>Timetable</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Offcanvas className={'font-TAEBAEK fw-bold'} placement={'end'}>
                        <Offcanvas.Header className={'bg-dark text-light'}>
                            <Offcanvas.Title>
                                <Stack direction={'horizontal'} gap={3}>
                                    <Image
                                        className={'bg-light'}
                                        src={'https://cdn.pixabay.com/photo/2023/01/25/22/46/grey-reef-shark-7744765_1280.jpg'}
                                        width={40}
                                        height={40}
                                        roundedCircle
                                    />
                                    <div>사용자님 반갑습니다.</div>
                                </Stack>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav>
                                <Nav.Link>
                                    <Stack direction={'horizontal'} gap={2}>
                                        <IoIosLogOut className={'h4 m-0'} />
                                        <div>로그아웃</div>
                                    </Stack>
                                </Nav.Link>
                                <hr />
                                <Nav.Link>
                                    <Stack direction={'horizontal'} gap={2}>
                                        <IoShieldHalf className={'h4 m-0'} />
                                        <div>개인정보변경</div>
                                    </Stack>
                                </Nav.Link>
                                <Nav.Link>
                                    <Stack direction={'horizontal'} gap={2}>
                                        <IoTicketOutline className={'h4 m-0'} />
                                        <div>예매조회</div>
                                    </Stack>
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <div className={'font-TAEBAEK'}>
                <Outlet />
            </div>
        </>
    );
};

export default UserMain;