import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Footer from "./components/Footer";

import './v3/Common.css';
import MainA from "./v3/admin/MainA";
import CodeManagement from "./v3/admin/CodeManagement";
import MovieManagement from "./v3/admin/MovieManagement";

function App() {
  return (
      <div className={'gowun-dodum-regular'}>
          <BrowserRouter>
              <Routes>
                  <Route path={'/v3/admin'} element={<MainA />} />
                  <Route path={'/v3/admin/management/code'} element={<CodeManagement />} />
                  <Route path={'/v3/admin/management/movie'} element={<MovieManagement />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
