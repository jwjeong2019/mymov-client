import '../css/SortButton.css';
import {IoSwapVertical} from "react-icons/io5";
import {useState} from "react";

const SortButton = (props) => {
    const menuList = [
        {
            id: 'rank',
            text: '랭킹순'
        },
        {
            id: 'recent',
            text: '최신순'
        },
        {
            id: 'age',
            text: '연령순'
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const onClickStyle2 = () => setIsOpen(!isOpen);
    const onClickMenu = (id) => props.onClickMenu(id);

    return (
        <div className="sort-btn-container">
            <div className="sort-btn-button-icon" onClick={onClickStyle2}><IoSwapVertical /></div>
            {isOpen &&
            <div className="sort-btn-dropdown">
                {menuList.map(value => {
                    return (
                        <div key={`sort-menu-${value.id}`}
                             className="sort-btn-dropdown-menu"
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

export default SortButton;