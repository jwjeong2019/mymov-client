import '../css/DropDown.css';
import {useState} from "react";
import {IoCaretDownOutline} from "react-icons/io5";

const DropDown = ({ width, height, onClickMenu, menu }) => {
    const customStyle = {
        width: `${width}px`,
        height: `${height}px`,
    }
    const [isOpen, setIsOpen] = useState(false);
    const onClickStyle2 = () => setIsOpen(!isOpen);
    const onClick = (id) => onClickMenu(id);
    return (
        <div className="dropdown-container" style={customStyle}>
            <div className="dropdown-button" onClick={onClickStyle2}>
                <div className="dropdown-button-text">전체</div>
                <div className="dropdown-button-icon"><IoCaretDownOutline /></div>
            </div>
            {isOpen &&
            <div className="dropdown-open" style={customStyle}>
                {menu.length > 0 && menu.map(value => {
                    return (
                        <div key={`dropdown-menu-${value.id}`}
                             className="dropdown-open-menu"
                             onClick={() => onClick(value.id)}>
                            {value.text}
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )
}

export default DropDown;