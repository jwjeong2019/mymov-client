import '../css/SortButton.css';
import {IoSwapVertical} from "react-icons/io5";
import {useCallback, useEffect, useRef, useState} from "react";

const SortButton = ({ onClickMenu, list }) => {
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const onClickStyle2 = () => setIsOpen(!isOpen);
    const onClick = (id) => {
        onClickMenu(id);
        setIsOpen(!isOpen);
    }
    const eventMouseDown = useCallback(e => {
        if (!ref.current.contains(e.target)) setIsOpen(false);
    }, []);
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', eventMouseDown);
        } else {
            document.removeEventListener('mousedown', eventMouseDown);
        }
    }, [isOpen]);
    return (
        <div ref={ref} className="sort-btn-container">
            <div className="sort-btn-button-icon" onClick={onClickStyle2}><IoSwapVertical /></div>
            {isOpen &&
            <div className="sort-btn-dropdown">
                {list.map(value => {
                    return (
                        <div key={`sort-menu-${value.id}`}
                             className="sort-btn-dropdown-menu font-HakDotR"
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

export default SortButton;