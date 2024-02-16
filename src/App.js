import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join";
import MovieList from "./pages/MovieList";
import SignIn from "./pages/SignIn";
import TimetableList from "./pages/TimetableList";
import MyPage from "./pages/MyPage";
import Error from "./pages/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Main />, errorElement: <Error /> },
    { path: "/join", element: <Join />, errorElement: <Error /> },
    { path: "/signIn", element: <SignIn />, errorElement: <Error /> },
    { path: "/movie", element: <MovieList />, errorElement: <Error /> },
    { path: "/timetable", element: <TimetableList />, errorElement: <Error /> },
    { path: "/myPage", element: <MyPage />, errorElement: <Error /> },
  ]);

  return (
      <div>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </div>
  );
}

export default App;
