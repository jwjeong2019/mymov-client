import '../css/Radio.css';

const Radio = (props) => {
    const onClick = e => props.onClick(e.target.value);
    return (
        <div className="radio-container">
            <input type="radio" name="radio" value={props.value} onClick={onClick} />{props.title}
        </div>
    )
}

export default Radio;