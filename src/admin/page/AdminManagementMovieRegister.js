import {Button, Card, Col, Container, Form, Image, Row, Stack} from "react-bootstrap";
import {useMemo, useState} from "react";
import apiGenre from "../../api/apiGenre";
import CustomImageUpload from "../component/CustomImageUpload";
import apiAdmin from "../../api/apiAdmin";
import {Utils} from "../../utils/Utils";
import {useNavigate} from "react-router";
import {StorageUtils} from "../../utils/StorageUtil";

const AdminManagementMovieRegister = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [optionsGenre, setOptionsGenre] = useState([]);
    const handleChangeInputsTitle = e => setInputs(prevState => ({ ...prevState, title: e.target.value }));
    const handleChangeInputsAge = e => setInputs(prevState => ({ ...prevState, age: e.target.value }));
    const handleChangeInputsDirector = e => setInputs(prevState => ({ ...prevState, director: e.target.value }));
    const handleChangeInputsDetail = e => setInputs(prevState => ({ ...prevState, detail: e.target.value }));
    const handleChangeInputsRunningTime = e => setInputs(prevState => ({ ...prevState, runningTime: e.target.value }));
    const handleChangeInputsReleaseDate = e => setInputs(prevState => ({ ...prevState, releaseDate: e.target.value }));
    const handleChangeInputsScreenDate = e => setInputs(prevState => ({ ...prevState, screenDate: e.target.value }));
    const handleChangeInputsGenre = e => {
        const _genreIds = [ e.target.value ];
        setInputs(prevState => ({ ...prevState, genreIds: _genreIds }));
    }
    const handleChangeInputsFile = file => {
        setInputs(prevState => ({ ...prevState, fileData: file }));
    };
    const handleClickComplete = () => createMovie();
    const handleClickCancel = () => navigate(-1);
    const getGenres = () => {
        const _params = {
            page: 0,
            size: 1000,
        };
        apiGenre.getList(_params)
            .then(response => {
                const { data } = response;
                const _genres = data.result.content.map(genre => ({
                    id: genre.id,
                    value: genre.id,
                    title: genre.name,
                }));
                setOptionsGenre([
                    { value: 'ALL', title: '전체' },
                    ..._genres
                ]);
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const createMovie = () => {
        const data = JSON.stringify({
            title: inputs.title,
            detail: inputs.detail,
            releaseDate: `${inputs.releaseDate} 00:00:00`,
            screenDate: `${inputs.screenDate} 00:00:00`,
            age: inputs.age,
            genreIds: inputs.genreIds,
            director: inputs.director,
            runningTime: inputs.runningTime
        });
        const formData = new FormData();
        formData.append('data', data);
        formData.append('file', inputs.fileData.file);
        const _params = {
            grantType: StorageUtils.getAuth().grantType,
            accessToken: StorageUtils.getAuth().accessToken,
            formData
        };
        apiAdmin.createMovie(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화 등록 실패: ${data.msg}`);
                alert('영화를 정상적으로 등록하였습니다.');
                navigate('/admin/management/movie');
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const init = () => {
        if (!StorageUtils.isAuthorized()) {
            alert('로그인 후 이용이 가능합니다.');
            window.location.href='/admin/login';
            return;
        }
        getGenres();
    };
    useMemo(init, []);
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Details</Card.Title>
                            <Container className={'mt-4'} fluid>
                                <Row>
                                    <Col md={3}>
                                        <Image className={'w-100 bg-secondary-subtle'} height={200} src={inputs.fileData?.url ?? ''} />
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>제목</Form.Label>
                                                <Form.Control onChange={handleChangeInputsTitle} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>연령</Form.Label>
                                                <Form.Control onChange={handleChangeInputsAge} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>감독</Form.Label>
                                                <Form.Control onChange={handleChangeInputsDirector} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>설명</Form.Label>
                                                <Form.Control as={'textarea'} onChange={handleChangeInputsDetail} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>시간</Form.Label>
                                                <Form.Control type={'number'} onChange={handleChangeInputsRunningTime} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>개봉일</Form.Label>
                                                <Form.Control type={'date'} onChange={handleChangeInputsReleaseDate} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>상영일</Form.Label>
                                                <Form.Control type={'date'} onChange={handleChangeInputsScreenDate} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col md={4}>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>장르</Form.Label>
                                                <Form.Select defaultValue={'ALL'} onChange={handleChangeInputsGenre}>
                                                    {optionsGenre.map((option, optionIdx) => {
                                                        return <option key={`option-genre-${optionIdx}`} value={option.value}>{option.title}</option>;
                                                    })}
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <CustomImageUpload onUpload={handleChangeInputsFile} />
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Stack className={'justify-content-end'} direction={'horizontal'} gap={2}>
                                            <Button variant={'dark'} onClick={handleClickComplete}>완료</Button>
                                            <Button variant={'outline-dark'} onClick={handleClickCancel}>취소</Button>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminManagementMovieRegister;