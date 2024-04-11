import {useEffect, useRef} from "react";
import '../css/Modal.css';
import {IoCloseCircleOutline} from "react-icons/io5";

const Modal = ({ component, visible, onClose }) => {
    const ref = useRef();
    const onClickClose = () => onClose(false);
    useEffect(() => {
        let display = visible ? 'flex' : 'none';
        ref.current.style.setProperty('display', display);
    }, [visible]);
    return (
        <div ref={ref} className='modal-container'>
            <div className='modal-box'>
                <div className='modal-button-close' onClick={onClickClose}>
                    <IoCloseCircleOutline size={35} />
                </div>
                <div className='modal-content'>
                    {component}
                </div>
            </div>
        </div>
    );
};

export default Modal;