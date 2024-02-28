import '../css/SearchBar.css';
import {IoSearchOutline} from "react-icons/io5";

const SearchBar = (props) => {
    const onChange = e => props.onChange(e.target.value);
    const onClick = () => props.onClick();
    return (
        <div className="searchbar-container">
            <div className="searchbar-box-input">
                <input type="text"
                       placeholder="Search..."
                       onChange={onChange} />
            </div>
            <div className="searchbar-box-button" onClick={onClick}>
                <IoSearchOutline />
            </div>
        </div>
    )
}

export default SearchBar;