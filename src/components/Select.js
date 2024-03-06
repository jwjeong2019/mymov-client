import '../css/Select.css';

const Select = ({ options, onChange }) => {
    const onChangeSelect = e => onChange(e.target.value);
    return (
        <select name="mySelect" id="mySelect" onChange={onChangeSelect}>
            <option value={'no-value'}>선택</option>
            {options.map(value => {
                return (
                    <option key={`option-region-${value.id}`}
                            value={value.value}>
                        {value.text}
                    </option>
                );
            })}
        </select>
    );
}

export default Select;