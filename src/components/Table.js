import '../css/Table.css';
import {useMemo, useState} from "react";
import Button from "./Button";
import {IoChevronBackOutline, IoChevronForward} from "react-icons/io5";

const Table = (props) => {
    const [headers, setHeaders] = useState();
    const [bodies, setBodies] = useState();
    const [pages, setPages] = useState([]);

    const onClick = id => props.onClick(id);
    const onClickPage = number => props.onClickPage(number);

    const makeHeaders = () => {
        let array = [];
        props?.headers?.length > 0 && props.headers.forEach((value, index) => {
            let object = {};
            object.key = `key-timetable-table-header-td${index + 1}`;
            object.className = `table-td-col${index + 1}`;
            object.title = value;
            array.push(object);
        });
        setHeaders(array);
    };
    const makeBodies = () => {
        let arrayRow = [];
        props?.bodies?.length > 0 && props.bodies.forEach((data, index) => {
            let arrayCol = [];
            let objectRow = {
                key: `timetable-table-body-tr${index + 1}`,
                id: data.id
            };

            const keyList = Object.keys(data);
            keyList.shift();
            keyList.length > 0 && keyList.forEach((key, index1) => {
                let objectCol = {};
                objectCol.key = `timetable-table-body-td${index1 + 1}`;
                objectCol.className = `table-td-body-col${index1 + 1}`;
                objectCol.content = data[key];
                arrayCol.push(objectCol);
            });
            let buttonObject = {
                key: `timetable-table-body-td${keyList.length + 1}`,
                className: `table-td-body-col${keyList.length + 1}`,
                content: <Button title="예매하기"
                                 outline
                                 onClick={() => onClick(objectRow.id)} />
            };
            arrayCol.push(buttonObject);

            objectRow.className = `table-tr-row${index + 1}`;
            objectRow.list = arrayCol;
            arrayRow.push(objectRow);
        });
        setBodies(arrayRow);
    };
    const makePages = () => {
        const offset = (props.page - 1) * props.size;
        const maxSize = props.total / (props.page * props.size) > 1 ? props.size : props.total % props.size;
        let array = [];
        for (let i = 0; i < maxSize; i++) {
            let object = {
                key: `table-page${i + 1}`,
                number: offset + (i + 1)
            };
            array.push(object);
        }
        setPages(array);
    };

    useMemo(makeHeaders, []);
    useMemo(makeBodies, []);
    useMemo(makePages, []);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr className="table-tr-row1">
                        {headers?.length > 0 && headers.map(value => {
                            return (
                                <th key={value.key} className={value.className}>
                                    {value.title}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                {bodies?.length > 0 && bodies.map(value => {
                    return (
                        <tr key={value.key} className={value.className}>
                            {value?.list?.length > 0 && value.list.map(value2 => {
                                return (
                                    <td key={value2.key} className={value2.className}>
                                        {value2.content}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="table-page-box">
                <div className="style4-1"><IoChevronBackOutline /></div>
                <div className="table-page-box-numbers">
                    {pages.length > 0 && pages.map(value => {
                        return (
                            <div key={value.key} onClick={() => onClickPage(value.number)}>{value.number}</div>
                        )
                    })}
                </div>
                <div className="style4-1"><IoChevronForward /></div>
            </div>
        </div>
    )
}

export default Table;