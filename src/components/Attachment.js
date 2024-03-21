import '../css/Attachment.css';
import {IoAttachOutline} from "react-icons/io5";
import {useState} from "react";

const Attachment = ({ upload }) => {
    const [fileName, setFileName] = useState('첨부파일');
    const onChange = e => {
        setFileName(e.target.value);
        upload(e.target.files[0]);
    }
    return (
        <div className="attachment-container">
            <div className="attachment-icon"><IoAttachOutline /></div>
            <label className="font-HakDotR" htmlFor="file">{fileName}</label>
            <input type="file" id="file" onChange={onChange} />
        </div>
    )
}

export default Attachment;