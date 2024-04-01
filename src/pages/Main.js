import '../css/Main.css';
import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";
import {useMemo, useState} from "react";

const Main = () => {
    const [isOpen, setIsOpen] = useState();
    const toggleIsOpen = () => setIsOpen(!isOpen);
    return (
        <div className="main-container">
            <Navigation toggleIsOpen={toggleIsOpen} />
            <SideBar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        </div>
    )
}

export default Main;