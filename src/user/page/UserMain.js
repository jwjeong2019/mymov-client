import {Container, Image, Nav, Navbar, Offcanvas, Stack} from "react-bootstrap";
import {IoIosLogOut} from "react-icons/io";
import {
    IoCube,
    IoCubeOutline,
    IoLogInOutline,
    IoPeopleCircleOutline,
    IoShieldHalf,
    IoTicketOutline
} from "react-icons/io5";
import {Outlet} from 'react-router-dom';

const UserMain = () => {
    const storageItemAuth = JSON.parse(localStorage.getItem('auth'));
    const handleClickLogout = () => {
        localStorage.clear();
        window.location.reload();
    };
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
                        <Nav.Link href={'/home'}>Home</Nav.Link>
                        <Nav.Link href={'/movies'}>Movies</Nav.Link>
                        <Nav.Link href={'/timetable'}>Timetable</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Offcanvas className={'font-TAEBAEK fw-bold'} placement={'end'}>
                        {storageItemAuth ?
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
                            :
                            <Offcanvas.Header className={'bg-dark text-light justify-content-between'}>
                                <Offcanvas.Title>
                                    <Nav.Link href={'/login'}>
                                        <Stack direction={'horizontal'} gap={2}>
                                            <IoLogInOutline className={'h3 m-0'} />
                                            <div>로그인</div>
                                        </Stack>
                                    </Nav.Link>
                                </Offcanvas.Title>
                                <Offcanvas.Title>
                                    <Nav.Link href={'/join'}>
                                        <Stack direction={'horizontal'} gap={2}>
                                            <IoPeopleCircleOutline className={'h3 m-0'} />
                                            <div>회원가입</div>
                                        </Stack>
                                    </Nav.Link>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                        }
                        {storageItemAuth ?
                            <Offcanvas.Body>
                                <Nav>
                                    <Nav.Link onClick={handleClickLogout}>
                                        <Stack direction={'horizontal'} gap={2}>
                                            <IoIosLogOut className={'h4 m-0'} />
                                            <div>로그아웃</div>
                                        </Stack>
                                    </Nav.Link>
                                    <hr />
                                    <Nav.Link disabled>
                                        <Stack className={'h4 fw-bold'} direction={'horizontal'} gap={2}>
                                            <IoCube />
                                            <div>마이페이지</div>
                                        </Stack>
                                    </Nav.Link>
                                    <Nav.Link href={'/mypage/privacy'}>
                                        <Stack direction={'horizontal'} gap={2}>
                                            <IoShieldHalf className={'h4 m-0'} />
                                            <div>개인정보변경</div>
                                        </Stack>
                                    </Nav.Link>
                                    <Nav.Link href={'/mypage/tickets'}>
                                        <Stack direction={'horizontal'} gap={2}>
                                            <IoTicketOutline className={'h4 m-0'} />
                                            <div>예매조회</div>
                                        </Stack>
                                    </Nav.Link>
                                    <hr/>
                                    <Nav.Link disabled>
                                        <Stack className={'h4 fw-bold'} direction={'horizontal'} gap={2}>
                                            <IoCube />
                                            <div>기타</div>
                                        </Stack>
                                    </Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                            :
                            <Offcanvas.Body className={'align-content-center'}>
                                <Stack className={'align-items-center'}>
                                    <div className={'h1'}>
                                        로그인 후 <br/>
                                        서비스 이용이 <br/>
                                        가능합니다.
                                    </div>
                                </Stack>
                            </Offcanvas.Body>
                        }
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