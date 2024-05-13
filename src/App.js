import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import AdminMain from "./admin/page/AdminMain";
import AdminManagementGenre from "./admin/page/AdminManagementGenre";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Main/>} />
                  <Route path={'/admin'} element={<AdminMain />}>
                      <Route path={'management/genre'} element={<AdminManagementGenre />} />
                  </Route>
              </Routes>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;
