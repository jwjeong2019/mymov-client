import '../css/Button.css';
import {useMemo, useState} from "react";

const Button = ({ outline, width, height, value, title, onClick, type }) => {
    const [className, setClassName] = useState();
    const customStyle = {
        width: `${width}px`,
        height: `${height}px`
    }
    const onClickButton = e => onClick(value);
    const makeClassName = () => {
        let name = 'button-container';
        if (outline) name = 'button-container-outline';
        else if (type === 'caution') name = 'button-container-caution';
        setClassName(name);
    }
    useMemo(makeClassName, []);
    return (
        <div className={className} onClick={onClickButton} style={customStyle}>
            {title}
        </div>
    )
}

export default Button;