import '../css/SortButton.css';
import {IoSwapVertical} from "react-icons/io5";
import {useState} from "react";

const SortButton = ({ onClickMenu, list }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickStyle2 = () => setIsOpen(!isOpen);
    const onClick = (id) => {
        onClickMenu(id);
        setIsOpen(!isOpen);
    }

    return (
        <div className="sort-btn-container">
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