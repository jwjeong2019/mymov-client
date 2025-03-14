import '../css/V3.css';
import {createContext, useContext} from "react";
import LabelInput from "./LabelInput";

export const Container = ({ children }) => {
    return (
        <div className='v3-container'>
            {children}
        </div>
    );
};

export const SideBar = ({ children }) => {
    return (
        <div className='v3-sidebar'>
            <div className='v3-sidebar-logo'>mymov</div>
            <div className='v3-sidebar-menu'>
                <div className='v3-sidebar-menu-link'>홈</div>
                <div className='v3-sidebar-menu-link'>코드 관리</div>
                <div className='v3-sidebar-menu-link'>영화 관리</div>
                <div className='v3-sidebar-menu-link'>영화관 관리</div>
                <div className='v3-sidebar-menu-link'>공지사항 관리</div>
            </div>
        </div>
    );
};

export const Main = ({ children }) => {
    return (
        <div className='v3-main'>
            {children}
        </div>
    );
};

export const Navigation = ({ children }) => {
    return (
        <div className='v3-navigation'>
            <div>
                <img className='v3-navigation-profile'
                     src={'https://img.allurekorea.com/allure/2018/05/style_5ae8b32811e64.jpg'}/>
            </div>
        </div>
    );
};

export const Body = ({ children }) => {
    return (
        <div className='v3-body'>
            {children}
        </div>
    );
};

export const Title = ({ children, title }) => {
    return (
        <div className='v3-title'>
            {title}
        </div>
    );
};

const CardContext = createContext(null);

export const Card = ({ children }) => {

    const providerValue = {
        onClick: () => console.log('Card click event')
    };

    return (
        <CardContext.Provider value={providerValue}>
            <div>
                {children}
            </div>
        </CardContext.Provider>
    );
};

const CardList = ({ children }) => {
    const { onClick } = useContext(CardContext);

    return (
        <div className='v3-card-list'>
            {children}
        </div>
    );
};

const CardItem = ({ children }) => {
    const { onClick } = useContext(CardContext);

    return (
        <div className='v3-card-item'>
            {children}
        </div>
    );
};

const CardTitle = ({ children, title }) => {
    const { onClick } = useContext(CardContext);

    return (
        <div className='v3-card-title'>
            {title}
        </div>
    );
};

const CardBody = ({ children }) => {
    const { onClick } = useContext(CardContext);

    return (
        <div className='v3-card-body'>
            {children}
        </div>
    );
};

Card.List = CardList;
Card.Item = CardItem;
Card.Title = CardTitle;
Card.Body = CardBody;

const CMCardBodyContext = createContext(null);

export const CMCardBody = ({ children }) => {
    const providerValue = {};

    return (
        <CMCardBodyContext.Provider value={providerValue}>
            {children}
        </CMCardBodyContext.Provider>
    );
};

const CMCardBodyForm = ({ children, dataLabels }) => {
    return (
        <div className='v3-cm-card-body-form'>
            {dataLabels.slice(0, 2).map(label => {
                return (
                    <LabelInput label={label.title} placeholder={label.placeholder} />
                );
            })}
            <div className='v3-cm-card-body-submit'>
                <button>
                    <span className={'gowun-dodum-regular'}>추가</span>
                </button>
            </div>
        </div>
    );
};

const CMCardBodyList = ({ children, list }) => {
    return (
        <div className='v3-cm-card-body-list'>
            {list.map(item => {
                return (
                    <div className='v3-cm-card-body-list-item'>
                        <div>{item.code}</div>
                        <div>{item.name}</div>
                        <button>
                            <span className={'gowun-dodum-regular'}>삭제</span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

CMCardBody.Form = CMCardBodyForm;
CMCardBody.List = CMCardBodyList;