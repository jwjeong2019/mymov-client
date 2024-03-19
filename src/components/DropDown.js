import '../css/DropDown.css';
import {useMemo, useState} from "react";
import {IoCaretDownOutline} from "react-icons/io5";

const DropDown = ({ width, height, onClickMenu, menu, advanced }) => {
    const customStyle = {
        width: `${width}px`,
        height: `${height}px`,
    }
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('전체');
    const onClickStyle2 = () => setIsOpen(!isOpen);
    const onClick = (value) => {
        setType(value.text);
        onClickMenu(advanced ? value : value.id);
        setIsOpen(!isOpen);
    }
    const init = () => setType('전체');
    useMemo(init, [menu]);
    return (
        <div className="dropdown-container" style={customStyle}>
            <div className="dropdown-button" onClick={onClickStyle2}>
                <div className="dropdown-button-text">{type}</div>
                <div className="dropdown-button-icon"><IoCaretDownOutline /></div>
            </div>
            {isOpen &&
            <div className="dropdown-open" style={customStyle}>
                {menu.length > 0 && menu.map(value => {
                    return (
                        <div key={`dropdown-menu-${value.id}`}
                             className="dropdown-open-menu"
                             onClick={() => onClick(value)}>
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