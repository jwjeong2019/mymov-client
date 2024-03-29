import '../css/Radio.css';

const Radio = ({ onClick, title, value, checked, keyName }) => {
    const onChangeRadio = e => onClick(e.target.value);
    return (
        <div className="radio-container font-TAEBAEK">
            <input type="radio"
                   name="radio"
                   checked={checked}
                   value={value}
                   onChange={onChangeRadio} />{title}
        </div>
    )
}

export default Radio;