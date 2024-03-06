import '../css/Select.css';

const Select = ({ options, onChange }) => {
    const onChangeSelect = e => onChange(e.target.value);
    return (
        <select name="mySelect" id="mySelect" onChange={onChangeSelect}>
            {options.map(value => {
                return (
                    <option key={`option-region-${value.id}`}
                            value={value.id}>
                        {value.text}
                    </option>
                );
            })}
        </select>
    );
}

export default Select;