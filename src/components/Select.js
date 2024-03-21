import '../css/Select.css';

const Select = ({ options, onChange, advanced }) => {
    const onChangeSelect = e => {
        let { value } = e.target;
        if (advanced && value !== 'no-value') value = JSON.parse(e.target.value);
        onChange(value);
    }
    return (
        <select className="font-HakDotR" name="mySelect" id="mySelect" onChange={onChangeSelect}>
            <option value={'no-value'}>선택</option>
            {advanced ?
                options.map(value => {
                    return (
                        <option key={`option-region-${value.id}`}
                                value={JSON.stringify(value)}>
                            {value.text}
                        </option>
                    );
                })
                :
                options.map(value => {
                    return (
                        <option key={`option-region-${value.id}`}
                                value={value.value}>
                            {value.text}
                        </option>
                    );
                })
            }
        </select>
    );
}

export default Select;