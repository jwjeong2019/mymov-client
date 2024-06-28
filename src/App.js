import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import AdminMain from "./admin/page/AdminMain";
import AdminManagementGenre from "./admin/page/AdminManagementGenre";
import AdminManagementMovie from "./admin/page/AdminManagementMovie";
import AdminManagementMovieRegister from "./admin/page/AdminManagementMovieRegister";
import AdminManagementMovieDetail from "./admin/page/AdminManagementMovieDetail";
import AdminManagementCinema from "./admin/page/AdminManagementCinema";
import AdminManagementTheater from "./admin/page/AdminManagementTheater";
import AdminManagementSeat from "./admin/page/AdminManagementSeat";
import AdminManagementTimetable from "./admin/page/AdminManagementTimetable";
import UserMain from "./user/page/UserMain";
import UserHome from "./user/page/UserHome";
import UserMovies from "./user/page/UserMovies";
import UserTimetable from "./user/page/UserTimetable";
import UserMoviesDetail from "./user/page/UserMoviesDetail";
import UserReservation from "./user/page/UserReservation";
import UserMyPage from "./user/page/UserMyPage";
import UserPrivacy from "./user/page/UserPrivacy";
import UserTickets from "./user/page/UserTickets";
import UserWithdrawal from "./user/page/UserWithdrawal";
import AdminLogin from "./admin/page/AdminLogin";
import UserJoin from "./user/page/UserJoin";
import UserLogin from "./user/page/UserLogin";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Navigate replace to={'/home'} />} />
                  <Route path={'/'}>
                      <Route element={<UserMain />}>
                          <Route path={'home'} element={<UserHome />} />
                          <Route path={'movies'} element={<UserMovies />} />
                          <Route path={'join'} element={<UserJoin />} />
                          <Route path={'login'} element={<UserLogin />} />
                          <Route path={'movies/:id'} element={<UserMoviesDetail />} />
                          <Route path={'timetable'} element={<UserTimetable />} />
                          <Route path={'reservation'} element={<UserReservation />} />
                          <Route path={'/mypage'} element={<UserMyPage />}>
                              <Route path={'privacy'} element={<UserPrivacy />} />
                              <Route path={'tickets'} element={<UserTickets />} />
                              <Route path={'withdrawal'} element={<UserWithdrawal />} />
                          </Route>
                      </Route>
                  </Route>

                  <Route path={'/admin'} element={<Navigate replace to={'/admin/login'} />} />
                  <Route path={'/admin'}>
                      <Route path={'login'} element={<AdminLogin />} />
                      <Route element={<AdminMain />}>
                          <Route path={'management/genre'} element={<AdminManagementGenre />} />
                          <Route path={'management/movie'} element={<AdminManagementMovie />} />
                          <Route path={'management/movie/register'} element={<AdminManagementMovieRegister />} />
                          <Route path={'management/movie/:id'} element={<AdminManagementMovieDetail />} />
                          <Route path={'management/cinema'} element={<AdminManagementCinema />} />
                          <Route path={'management/theater'} element={<AdminManagementTheater />} />
                          <Route path={'management/seat'} element={<AdminManagementSeat />} />
                          <Route path={'management/timetable'} element={<AdminManagementTimetable />} />
                      </Route>
                  </Route>
              </Routes>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;
