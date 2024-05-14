import {
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    InputGroup, Modal, Pagination,
    Row,
    Stack,
    Table
} from "react-bootstrap";
import {IoIosSearch} from "react-icons/io";

const AdminManagementTimetable = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Conditions</Card.Title>
                                <Stack direction={'horizontal'} gap={3}>
                                    <DropdownButton variant={'outline-dark'} title={'전체'}>
                                        <Dropdown.Item>전체</Dropdown.Item>
                                    </DropdownButton>
                                    <InputGroup>
                                        <Form.Control />
                                        <Button variant={'dark'}><IoIosSearch className={'h3 m-0'} /></Button>
                                    </InputGroup>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className={'mt-3'}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Result</Card.Title>
                                <Stack className={'justify-content-end'} direction={'horizontal'} gap={2}>
                                    <Button variant={'dark'}>등록</Button>
                                    <DropdownButton variant={'outline-dark'} title={'전체'}>
                                        <Dropdown.Item>시작시간순</Dropdown.Item>
                                        <Dropdown.Item>영화관순</Dropdown.Item>
                                        <Dropdown.Item>영화명순</Dropdown.Item>
                                    </DropdownButton>
                                </Stack>
                                <Stack className={'mt-3'}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>영화명</th>
                                                <th>연령</th>
                                                <th>상영관</th>
                                                <th>영화관</th>
                                                <th>지역</th>
                                                <th>시작시간</th>
                                                <th>종료시간</th>
                                                <th>삭제</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>해리포터와 마법사의 창</td>
                                                <td>12</td>
                                                <td>1상영관</td>
                                                <td>MOV강남점</td>
                                                <td>서울</td>
                                                <td>13:00</td>
                                                <td>15:10</td>
                                                <td><Button variant={'danger'}>삭제</Button></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>해리포터와 마법사의 창</td>
                                                <td>12</td>
                                                <td>1상영관</td>
                                                <td>MOV강남점</td>
                                                <td>서울</td>
                                                <td>13:00</td>
                                                <td>15:10</td>
                                                <td><Button variant={'danger'}>삭제</Button></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>해리포터와 마법사의 창</td>
                                                <td>12</td>
                                                <td>1상영관</td>
                                                <td>MOV강남점</td>
                                                <td>서울</td>
                                                <td>13:00</td>
                                                <td>15:10</td>
                                                <td><Button variant={'danger'}>삭제</Button></td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={9}>
                                                    <Pagination className={'justify-content-center'}>
                                                        <Pagination.Prev />
                                                        <Pagination.Item>1</Pagination.Item>
                                                        <Pagination.Item>2</Pagination.Item>
                                                        <Pagination.Next />
                                                    </Pagination>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal show={false}>
                <Modal.Header className={'bg-dark text-light'}>
                    <Modal.Title>상영표 등록하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>영화</Form.Label>
                            <Form.Select>
                                <option value={0}>전체</option>
                                <option value={1}>해리포터와 마법사의 창</option>
                                <option value={2}>찰리와 딸기 공장</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>영화관</Form.Label>
                            <Form.Select>
                                <option value={0}>전체</option>
                                <option value={1}>MOV강남점</option>
                                <option value={2}>MOV홍대점</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>상영관</Form.Label>
                            <Form.Select>
                                <option value={0}>전체</option>
                                <option value={1}>1상영관</option>
                                <option value={2}>2상영관</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>상영시작일</Form.Label>
                            <Form.Control type={'date'} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>상영종료일</Form.Label>
                            <Form.Control type={'date'} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>시작시간</Form.Label>
                            <Form.Control type={'time'} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>종료시간</Form.Label>
                            <Form.Control type={'time'} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'dark'}>완료</Button>
                    <Button variant={'outline-dark'}>닫기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminManagementTimetable;