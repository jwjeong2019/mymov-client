import '../css/LabelInput.css'

const LabelInput = ({ label, placeholder }) => {
    return (
        <div id={'label-input'}>
            <label>{label}</label>
            <input type="text" placeholder={placeholder}/>
        </div>
    );
}

export default LabelInput;