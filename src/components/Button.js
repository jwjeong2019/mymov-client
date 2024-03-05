import '../css/Button.css';

const Button = ({ outline, width, height, value, title, onClick }) => {
    const className = outline ? "button-container-outline" : "button-container";
    const customStyle = {
        width: `${width}px`,
        height: `${height}px`
    }
    const onClickButton = e => onClick(value);
    return (
        <div className={className} onClick={onClickButton} style={customStyle}>
            {title}
        </div>
    )
}

export default Button;