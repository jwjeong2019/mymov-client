import '../css/DropDown.css';
import {useState} from "react";
import {IoCaretDownOutline} from "react-icons/io5";

const DropDown = (props) => {
    const customStyle = {
        width: `${props.width}px`,
        height: `${props.height}px`,
    }
    const [isOpen, setIsOpen] = useState(false);
    const onClickStyle2 = () => setIsOpen(!isOpen);
    const onClickMenu = (id) => props.onClickMenu(id);
    return (
        <div className="dropdown-container" style={customStyle}>
            <div className="dropdown-button" onClick={onClickStyle2}>
                <div className="dropdown-button-text">전체</div>
                <div className="dropdown-button-icon"><IoCaretDownOutline /></div>
            </div>
            {isOpen &&
            <div className="dropdown-open" style={customStyle}>
                {props.menu.length > 0 && props.menu.map(value => {
                    return (
                        <div key={`dropdown-menu-${value.id}`}
                             className="dropdown-open-menu"
                             onClick={() => onClickMenu(value.id)}>
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