import '../css/Button.css';

const Button = (props) => {
    const className = props.outline ? "button-container-outline" : "button-container";
    const customStyle = {
        width: `${props.width}px`,
        height: `${props.height}px`
    }
    const onClick = e => props.onClick(props.value);
    return (
        <div className={className} onClick={onClick} style={customStyle}>
            {props.title}
        </div>
    )
}

export default Button;