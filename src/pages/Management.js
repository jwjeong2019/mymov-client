import '../css/Management.css';
import {useNavigate, useParams} from "react-router";
import {useMemo, useState} from "react";
import Navigation from "../components/Navigation";
import ManagementMovieList from "./ManagementMovieList";
import ManagementMovieRegister from "./ManagementMovieRegister";
import ManagementMovieDetail from "./ManagementMovieDetail";

const Management = () => {
    let params = useParams();
    let navigate = useNavigate();
    const stepMenuList = [
        {
            id: 'service',
            category: '서비스',
            list: [
                { id: 'movieManagement', text: '영화 관리', path: 'movie/list' },
                { id: 'cinemaManagement', text: '영화관 관리', path: 'cinema/list' },
                { id: 'theaterManagement', text: '상영관 관리', path: 'theater/list' },
                { id: 'seatManagement', text: '좌석 관리', path: 'seat/list' },
                { id: 'timetableManagement', text: '상영표 관리', path: 'timetable/list' },
            ]
        },
    ];
    const [subComponent, setSubComponent] = useState();
    const onClickStep = subCategory => navigate(`/admin/management/${subCategory.path}`);
    const moveStep = () => {
        const { step, mode } = params;
        if (step === 'movie' && mode === 'list') setSubComponent(<ManagementMovieList title={'영화 관리'} />);
        if (step === 'movie' && mode === 'register') setSubComponent(<ManagementMovieRegister title={'영화 관리'} />);
        if (step === 'movie' && mode === 'detail') setSubComponent(<ManagementMovieDetail title={'영화 관리'} />);
    };
    useMemo(moveStep, [params]);
    return (
        <div>
            <Navigation />
            <div className="management-container">
                <div className="management-header">
                    <div className="management-header-title">관리하기</div>
                </div>
                <div className="management-content">
                    <div className="management-content-box">
                        <div className="management-content-box-menu-list">
                            {stepMenuList.length > 0 && stepMenuList.map(category => {
                                return (
                                    <div key={`key-step-menu-box-${category.id}`} className="management-content-box-menu-list-box">
                                        <div key={`key-step-menu-category-${category.id}`} className="management-content-box-menu-list-box-category">
                                            {category.category}
                                        </div>
                                        {category.list.length > 0 && category.list.map(subCategory => {
                                            return (
                                                <div key={`key-step-menu-list-${subCategory.id}`}
                                                     className="management-content-box-menu-list-box-subcategory"
                                                     onClick={() => onClickStep(subCategory)}>
                                                    {subCategory.text}
                                                </div>
                                            )
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="management-content-box-menu-detail">
                            {subComponent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Management;