import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join";
import MovieList from "./pages/MovieList";
import SignIn from "./pages/SignIn";
import TimetableList from "./pages/TimetableList";
import MyPage from "./pages/MyPage";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Navigation />
              <Routes>
                  <Route exact path="/" element={<Main/>} />
                  <Route exact path="/join" element={<Join/>} />
                  <Route exact path="/signIn" element={<SignIn/>} />
                  <Route exact path="/movie" element={<MovieList/>} />
                  <Route exact path="/timetable" element={<TimetableList/>} />
                  <Route exact path="/myPage" element={<MyPage/>} />
              </Routes>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;
