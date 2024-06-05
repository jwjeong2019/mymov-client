import {FormCheck} from "react-bootstrap";

const CustomRadio = ({ data, selectedValue }) => {
    return (
        <>
            {data.map((radio, radioIdx) => {
                let className;
                if (selectedValue == radio.value) className = 'bg-dark border-dark';
                return (
                    <FormCheck
                        key={`form-check-radio-${radioIdx}`}
                        children={
                            <FormCheck>
                                <FormCheck.Input
                                    className={className}
                                    type={'radio'}
                                    name={'radio'}
                                    value={radio.value}
                                />
                                <FormCheck.Label title>{radio.label}</FormCheck.Label>
                            </FormCheck>
                        }
                    />
                );
            })}
        </>
    );
};

export default CustomRadio;