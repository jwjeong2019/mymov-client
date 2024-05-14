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

const AdminManagementTheater = () => {
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
                                        <Dropdown.Item>영화관순</Dropdown.Item>
                                    </DropdownButton>
                                </Stack>
                                <Stack className={'mt-3'}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>번호</th>
                                                <th>영화관</th>
                                                <th>지역</th>
                                                <th>삭제</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>1상영관</td>
                                                <td>MOV강남점</td>
                                                <td>서울</td>
                                                <td><Button variant={'danger'}>삭제</Button></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>1상영관</td>
                                                <td>MOV강남점</td>
                                                <td>서울</td>
                                                <td><Button variant={'danger'}>삭제</Button></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>1상영관</td>
                                                <td>MOV강남점</td>
                                                <td>서울</td>
                                                <td><Button variant={'danger'}>삭제</Button></td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={5}>
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
                    <Modal.Title>상영관 등록하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>영화관</Form.Label>
                            <Form.Select>
                                <option value={0}>전체</option>
                                <option value={1}>MOV강남점</option>
                                <option value={2}>MOV홍대점</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>번호</Form.Label>
                            <Form.Control />
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

export default AdminManagementTheater;