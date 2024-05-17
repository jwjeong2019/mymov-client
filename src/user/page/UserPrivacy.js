import {Button, Col, Container, Form, Image, InputGroup, Row, Stack} from "react-bootstrap";
import {IoImageOutline} from "react-icons/io5";

const UserPrivacy = () => {
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Stack gap={3}>
                        <Image className={'w-100'} src={'https://cdn.pixabay.com/photo/2016/12/29/04/57/airport-1937761_1280.jpg'} />
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor={'file'}>
                                    <Stack direction={'horizontal'} gap={2}>
                                        <IoImageOutline className={'h4 m-0'} />
                                        <div className={'m-0'}>이미지 찾기</div>
                                    </Stack>
                                </Form.Label>
                                <Form.Control id={'file'} type={'file'} accept={'image/*'} hidden />
                            </Form.Group>
                        </Form>
                    </Stack>
                </Col>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>아이디</Form.Label>
                            <InputGroup>
                                <Form.Control />
                                <Button variant={'dark'}>중복확인</Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className={'mt-3'}>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group className={'mt-3'}>
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group className={'mt-3'}>
                            <Form.Label>이름</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group className={'mt-3'}>
                            <Form.Label>연락처</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group className={'mt-3'}>
                            <Form.Label>이메일</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group className={'mt-3'}>
                            <Form.Label>주소</Form.Label>
                            <InputGroup>
                                <Form.Control />
                                <Button variant={'dark'}>검색</Button>
                            </InputGroup>
                            <Form.Control className={'mt-2'} />
                        </Form.Group>
                    </Form>
                    <Stack className={'mt-5'}>
                        <Button variant={'dark'}>변경하기</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default UserPrivacy;