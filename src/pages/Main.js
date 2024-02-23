import '../css/Main.css';
import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";
import {useState} from "react";

const Main = () => {
    let rawData = localStorage.getItem('auth');
    let data = JSON.parse(rawData);
    const [isOpen, setIsOpen] = useState();
    const toggleIsOpen = () => setIsOpen(!isOpen);

    return (
        <div className="main-container">
            <Navigation data={data}
                        toggleIsOpen={toggleIsOpen} />
            <SideBar data={data}
                     isOpen={isOpen}
                     toggleIsOpen={toggleIsOpen} />
        </div>
    )
}

export default Main;