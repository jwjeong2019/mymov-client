import '../css/Table.css';
import {useMemo, useState} from "react";
import {IoChevronBackOutline, IoChevronForward} from "react-icons/io5";

const Table = ({ onClickPage, headers, bodies, page, size, total, onClickRow }) => {
    const [headerList, setHeaderList] = useState();
    const [bodyList, setBodyList] = useState();
    const [pages, setPages] = useState([]);
    const onClickPageNumber = number => onClickPage(number);

    const makeHeaders = () => {
        let array = [];
        headers?.length > 0 && headers.forEach((value, index) => {
            let object = {};
            object.key = `key-timetable-table-header-td${index + 1}`;
            object.className = `table-td-col${index + 1}`;
            object.title = value;
            array.push(object);
        });
        setHeaderList(array);
    };
    const makeBodies = () => {
        let arrayRow = [];
        bodies?.length > 0 && bodies.forEach((data, index) => {
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

            objectRow.className = `table-tr-row${index + 1}`;
            objectRow.list = arrayCol;
            arrayRow.push(objectRow);
        });
        setBodyList(arrayRow);
    };
    const makePages = () => {
        const unitPerBlock = 10;
        let pageData = {
            offset: Math.floor(page / size) * size,
            totalThisBlock: total - total % (size * unitPerBlock),
            totalLastBlock: total % (size * unitPerBlock),
            pagesThisBlock: Math.round(total / size)
        }
        if (total < unitPerBlock) pageData.totalThisBlock = total;
        if (pageData.offset === 0) pageData.pagesThisBlock = Math.round(pageData.totalThisBlock / size);
        if (pageData.offset > 0) pageData.pagesThisBlock += 1;

        let array = [];
        for (let i = pageData.offset; i < pageData.pagesThisBlock; i++) {
            let object = {
                key: `table-page${i + 1}`,
                number: i + 1
            };
            array.push(object);
        }
        setPages(array);
    };

    useMemo(makeHeaders, [headers]);
    useMemo(makeBodies, [bodies]);
    useMemo(makePages, [total]);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr className="table-tr-row1">
                        {headerList?.length > 0 && headerList.map(value => {
                            return (
                                <th key={value.key} className={value.className}>
                                    {value.title}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                {bodyList?.length > 0 && bodyList.map(value => {
                    return (
                        <tr key={value.key} className={value.className} onClick={onClickRow ? () => onClickRow(value.id) : null}>
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
                            <div key={value.key} onClick={() => onClickPageNumber(value.number)}>{value.number}</div>
                        )
                    })}
                </div>
                <div className="style4-1"><IoChevronForward /></div>
            </div>
        </div>
    )
}

export default Table;