import {Col, Form, Row} from "react-bootstrap";
import {useState} from "react";

const CustomImageUpload = ({ onUpload }) => {
    const [fileName, setFileName] = useState('');
    const handleChangeFile = e => {
        const file = e.target.files[0];
        setFileName(file.name);
        makeFileToURLAndUpload(file);
    };
    const makeFileToURLAndUpload = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (onUpload) onUpload({ file, url: reader.result });
        };
    };
    return (
        <Form>
            <Form.Group as={Row}>
                <Form.Label>첨부파일</Form.Label>
                <Col>
                    <Form.Control disabled value={fileName} />
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label className={'btn btn-outline-dark'} htmlFor={'file'}>파일찾기</Form.Label>
                        <Form.Control type={'file'} id={'file'} accept={'image/*'} hidden onChange={handleChangeFile} />
                    </Form.Group>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default CustomImageUpload;