import {Button, Card, Col, Container, Form, Image, Row, Stack} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {useMemo, useState} from "react";
import apiMovie from "../../api/apiMovie";
import {Utils} from "../../utils/Utils";
import CustomImageUpload from "../component/CustomImageUpload";
import apiAdmin from "../../api/apiAdmin";
import apiGenre from "../../api/apiGenre";

const AdminManagementMovieDetail = () => {
    const [storageItemAuth, setStorageItemAuth] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const [optionsGenre, setOptionsGenre] = useState([]);
    const [movie, setMovie] = useState({});
    const [inputs, setInputs] = useState({});
    const [isReading, setIsReading] = useState(true);
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
    };
    const handleChangeInputsFile = file => {
        setInputs(prevState => ({ ...prevState, fileData: file }));
    };
    const handleClickModify = () => {
        setIsReading(false);
    };
    const handleClickComplete = () => {
        updateMovie();
    };
    const handleClickCancel = () => {
        setInputs(movie);
        setIsReading(true);
    };
    const handleClickDelete = () => {
        const isOk = window.confirm('삭제하시겠습니까?');
        if (isOk) deleteMovie();
    };
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
                setOptionsGenre(_genres);
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const getMovie = () => {
        const _params = {
            ...params
        };
        apiMovie.getDetail(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert('영화 정보가 존재하지 않습니다.');
                const _movie = {
                    ...data.result,
                    releaseDate: data.result.releaseDate.split('T')[0],
                    screenDate: data.result.screenDate.split('T')[0],
                    genreIds: data.result.genres.map(genre => genre.id),
                    fileData: { url: data.result.attachment.path },
                };
                console.log(_movie);
                setMovie(_movie);
                setInputs(_movie);
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const updateMovie = () => {
        const data = JSON.stringify({
            title: inputs.title,
            detail: inputs.detail,
            releaseDate: `${inputs.releaseDate} 00:00:00`,
            screenDate: `${inputs.screenDate} 00:00:00`,
            age: inputs.age,
            genreIds: inputs.genreIds ?? makeGenreIds(),
            director: inputs.director,
            runningTime: inputs.runningTime
        });
        const formData = new FormData();
        formData.append('data', data);
        formData.append('file', inputs.fileData.file);
        const _params = {
            ...params,
            grantType: storageItemAuth.grantType,
            accessToken: storageItemAuth.accessToken,
            formData
        };
        apiAdmin.updateMovie(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화 수정 실패: ${data.msg}`);
                alert('영화를 정상적으로 수정하였습니다.');
                window.location.reload();
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const deleteMovie = () => {
        const _params = {
            ...params,
            grantType: storageItemAuth.grantType,
            accessToken: storageItemAuth.accessToken
        };
        apiAdmin.deleteMovie(_params)
            .then(response => {
                const { data } = response;
                if (Utils.isContainedWordFrom('fail', data.msg)) return alert(`영화 삭제 실패:\n${data.msg}`);
                alert('정상적으로 삭제하였습니다.');
                navigate('/admin/management/movie');
            })
            .catch(err => {
                const { status, data } = err.response;
                alert(`error: ${data.message} (${status})`);
            });
    };
    const makeGenreIds = () => {
        return inputs.genres.map(genre => genre.id);
    };
    const makeStorageItemAuth = () => {
        try {
            const _storageItemAuth = JSON.parse(localStorage.getItem('auth'));
            setStorageItemAuth(_storageItemAuth);
        } catch (e) {
            console.log(e);
        }
    };
    const init = () => {
        makeStorageItemAuth();
        getGenres();
        getMovie();
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
                                        <Image className={'w-100'} src={inputs.fileData?.url} />
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>제목</Form.Label>
                                                <Form.Control
                                                    readOnly={isReading}
                                                    plaintext={isReading}
                                                    value={inputs.title}
                                                    onChange={handleChangeInputsTitle}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>연령</Form.Label>
                                                <Form.Control
                                                    readOnly={isReading}
                                                    plaintext={isReading}
                                                    value={inputs.age}
                                                    onChange={handleChangeInputsAge}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>감독</Form.Label>
                                                <Form.Control
                                                    readOnly={isReading}
                                                    plaintext={isReading}
                                                    value={inputs.director}
                                                    onChange={handleChangeInputsDirector}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>설명</Form.Label>
                                                <Form.Control
                                                    as={'textarea'}
                                                    readOnly={isReading}
                                                    plaintext={isReading}
                                                    value={inputs.detail}
                                                    onChange={handleChangeInputsDetail}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>시간</Form.Label>
                                                <Form.Control
                                                    type={'number'}
                                                    readOnly={isReading}
                                                    plaintext={isReading}
                                                    value={inputs.runningTime}
                                                    onChange={handleChangeInputsRunningTime}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>개봉일</Form.Label>
                                                <Form.Control
                                                    type={'date'}
                                                    readOnly={isReading}
                                                    plaintext={isReading}
                                                    value={inputs.releaseDate}
                                                    onChange={handleChangeInputsReleaseDate}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>상영일</Form.Label>
                                                <Form.Control
                                                    type={'date'}
                                                    readOnly={isReading}
                                                    plaintext={isReading}
                                                    value={inputs.screenDate}
                                                    onChange={handleChangeInputsScreenDate}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col md={4}>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>장르</Form.Label>
                                                <Form.Select disabled={isReading} value={inputs.genreIds?.[0]} onChange={handleChangeInputsGenre}>
                                                    <option value={'ALL'}>전체</option>
                                                    {optionsGenre.map((genre, genreIdx) => {
                                                        return <option key={`option-genre-${genreIdx}`} value={genre.id}>{genre.title}</option>;
                                                    })}
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <CustomImageUpload hidden={isReading} onUpload={handleChangeInputsFile} />
                                    </Col>
                                </Row>
                                <Row className={'mt-3'}>
                                    <Col>
                                        <Stack className={'justify-content-end'} direction={'horizontal'} gap={2}>
                                            {isReading ?
                                                <Button variant={'dark'} onClick={handleClickModify}>수정</Button>
                                                :
                                                <>
                                                    <Button variant={'dark'} onClick={handleClickComplete}>완료</Button>
                                                    <Button variant={'outline-dark'} onClick={handleClickCancel}>취소</Button>
                                                </>
                                            }
                                            <Button variant={'danger'} onClick={handleClickDelete}>삭제</Button>
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

export default AdminManagementMovieDetail;