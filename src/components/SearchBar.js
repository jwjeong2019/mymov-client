import '../css/SearchBar.css';
import {IoSearchOutline} from "react-icons/io5";

const SearchBar = ({ onChange, onClick }) => {
    const onChangeInput = e => onChange(e.target.value);
    const onClickButton = () => onClick();
    return (
        <div className="searchbar-container">
            <div className="searchbar-box-input">
                <input className="font-HakDotR"
                       type="text"
                       placeholder="Search..."
                       onChange={onChangeInput} />
            </div>
            <div className="searchbar-box-button" onClick={onClickButton}>
                <IoSearchOutline />
            </div>
        </div>
    )
}

export default SearchBar;