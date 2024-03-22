import '../css/DropDown.css';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {IoCaretDownOutline} from "react-icons/io5";

const DropDown = ({ width, height, onClickMenu, menu, advanced }) => {
    const customStyle = {
        width: `${width}px`,
        height: `${height}px`,
    }
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('전체');
    const onClickStyle2 = () => setIsOpen(!isOpen);
    const onClick = (value) => {
        setType(value.text);
        onClickMenu(advanced ? value : value.id);
        setIsOpen(!isOpen);
    }
    const eventMouseDown = useCallback(e => {
        if (!ref.current.contains(e.target)) setIsOpen(false);
    }, []);
    const init = () => setType('전체');
    useMemo(init, [menu]);
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', eventMouseDown);
        } else {
            document.removeEventListener('mousedown', eventMouseDown);
        }
    }, [isOpen]);
    return (
        <div ref={ref} className="dropdown-container" style={customStyle}>
            <div className="dropdown-button" onClick={onClickStyle2}>
                <div className="dropdown-button-text font-HakDotR">{type}</div>
                <div className="dropdown-button-icon"><IoCaretDownOutline /></div>
            </div>
            {isOpen &&
            <div className="dropdown-open" style={customStyle}>
                {menu.length > 0 && menu.map(value => {
                    return (
                        <div key={`dropdown-menu-${value.id}`}
                             className="dropdown-open-menu font-HakDotR"
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