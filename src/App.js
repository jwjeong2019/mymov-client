import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join";
import MovieList from "./pages/MovieList";
import SignIn from "./pages/SignIn";
import Timetable from "./pages/Timetable";
import MyPage from "./pages/MyPage";
import Footer from "./components/Footer";
import MovieDetail from "./pages/MovieDetail";
import Reservation from "./pages/Reservation";
import Management from "./pages/Management";
import FindIdPwd from "./pages/FindIdPwd";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Main/>} />
                  <Route exact path="/join" element={<Join/>} />
                  <Route exact path="/signIn" element={<SignIn/>} />
                  <Route exact path="/movie" element={<MovieList/>} />
                  <Route exact path="/timetable" element={<Timetable/>} />
                  <Route exact path="/myPage/:step" element={<MyPage/>} />
                  <Route exact path="/movie/detail/:id" element={<MovieDetail/>} />
                  <Route exact path="/reservation/:mode" element={<Reservation/>} />
                  <Route path="/admin/management/:step/:mode" element={<Management/>} />
                  <Route path="/findIdPwd" element={<FindIdPwd/>} />
              </Routes>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;
