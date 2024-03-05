import '../css/Attachment.css';
import {IoAttachOutline} from "react-icons/io5";
import {useState} from "react";

const Attachment = () => {
    const [fileName, setFileName] = useState('첨부파일');
    const onChange = e => setFileName(e.target.value);
    return (
        <div className="attachment-container">
            <div className="attachment-icon"><IoAttachOutline /></div>
            <label htmlFor="file">{fileName}</label>
            <input type="file" id="file" onChange={onChange} />
        </div>
    )
}

export default Attachment;