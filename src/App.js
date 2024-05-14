import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
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

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Main/>} />
                  <Route path={'/admin'} element={<AdminMain />}>
                      <Route path={'management/genre'} element={<AdminManagementGenre />} />
                      <Route path={'management/movie'} element={<AdminManagementMovie />} />
                      <Route path={'management/movie/register'} element={<AdminManagementMovieRegister />} />
                      <Route path={'management/movie/:id'} element={<AdminManagementMovieDetail />} />
                      <Route path={'management/cinema'} element={<AdminManagementCinema />} />
                      <Route path={'management/theater'} element={<AdminManagementTheater />} />
                      <Route path={'management/seat'} element={<AdminManagementSeat />} />
                      <Route path={'management/timetable'} element={<AdminManagementTimetable />} />
                  </Route>
              </Routes>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;
