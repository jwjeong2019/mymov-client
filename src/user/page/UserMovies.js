import {Badge, Button, Card, Col, Container, Nav, Row, Stack} from "react-bootstrap";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useMemo, useState} from "react";
import apiMovie from "../../api/apiMovie";
import CustomCardTable from "../component/CustomCardTable";
import apiGenre from "../../api/apiGenre";
import {useNavigate} from "react-router";

const UserMovies = () => {
    const storageItemAuth = JSON.parse(localStorage.getItem('auth'));
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState();
    const [sortType, setSortType] = useState();
    const handleClickNavLinkGenre = e => {
        const genreId = e.target.dataset.rrUiEventKey;
        console.log(genreId);
    };
    const handleClickRecord = id => navigate(`/movies/${id}`);
    const handleClickPrev = () => {
        let _nextPage = page - 1;
        if (_nextPage > 0) getMovies(_nextPage);
    };
    const handleClickNext = () => {
        let _nextPage = page + 1;
        if (_nextPage <= totalPages) getMovies(_nextPage);
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
                setGenres(_genres);
            })
            .catch(err => {
                // const { status, data } = err.response;
                // alert(`error: ${data.message} (${status})`);
            });
    };
    const getMovies = (page) => {
        const _params = {
            page: page - 1,
            size: 10,
            keyword: search,
            keywordField: filterType,
            sortField: sortType,
            sortType: 'DESC'
        };
        apiMovie.getList(_params)
            .then(response => {
                const { data } = response;
                const _movies = data.result.content.map(movie => ({
                    id: movie.id,
                    image: {
                        url: movie.attachment
                    },
                    title: {
                        badge: {
                            bg: makeBadgeBg(movie.age),
                            value: movie.age,
                        },
                        title: movie.title,
                    },
                    contents: [
                        { title: 'Director', detail: movie.director },
                        { title: 'Released', detail: `${movie.releaseDate.split('T')[0]}` },
                        { title: 'Duration', detail: `${movie.runningTime}분` },
                        { title: 'Genre', detail: movie.genres.map(genre => genre.name).join(', ') },
                    ]
                }));
                setMovies(_movies);
                setTotalPages(data.result.totalPages + 1);
                setPage(page);
            })
            .catch(err => alert(`error: ${err.message}`));
    };
    const makeBadgeBg = age => {
        let bg = 'success';
        switch (age) {
            case 12: bg = 'primary'; break;
            case 15: bg = 'warning'; break;
            case 18: bg = 'danger'; break;
        }
        return bg;
    };
    const init = () => {
        getGenres();
        getMovies(1);
    };
    useMemo(init, []);
    return (
        <Container>
            <Row className={'mt-4'}>
                <Col>
                    <Stack>
                        <p className={'font-HakMulB'} style={{ fontSize: 60 }}>MOVIES</p>
                        <p style={{ fontSize: 40 }}>Welcome. You can check out a variety of movies here. Choose the movie you want and watch it!</p>
                    </Stack>
                </Col>
                <Col>
                    <Card>
                        <Card.Img src={'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg'} />
                    </Card>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <Col>
                    <Nav className={'h2'} variant={'underline'} defaultActiveKey={'ALL'} onClick={handleClickNavLinkGenre}>
                        <Nav.Item>
                            <Nav.Link className={'text-dark'} eventKey={'ALL'}>All</Nav.Link>
                        </Nav.Item>
                        {genres.map((genre, genreIdx) => {
                            return (
                                <Nav.Item key={`nav-item-genre-${genreIdx}`}>
                                    <Nav.Link className={'text-dark'}
                                              eventKey={genre.value}>{genre.title}
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>
                </Col>
            </Row>
            <Row className={'mt-5'}>
                <CustomCardTable data={movies}
                                 onClickRecord={handleClickRecord}
                                 onClickPrev={handleClickPrev}
                                 onClickNext={handleClickNext}
                />
            </Row>
        </Container>
    );
};

export default UserMovies;