import Navigation from "../components/Navigation";
import '../css/MyPage.css';
import {useMemo, useState} from "react";
import MyPageReservation from "./MyPageReservation";
import MyPageModify from "./MyPageModify";
import MyPageWithdrawal from "./MyPageWithdrawal";
import {useNavigate, useParams} from "react-router";

const MyPage = () => {
    let params = useParams();
    let navigate = useNavigate();
    const stepMenuList = [
        {
            id: 'security',
            category: '보안',
            list: [
                { id: 'modify', text: '개인정보 변경' },
            ]
        },
        {
            id: 'service',
            category: '서비스',
            list: [
                { id: 'reservation', text: '예매현황' },
                { id: 'inquiry', text: '문의현황' },
            ]
        },
        {
            id: 'etc',
            category: '기타',
            list: [
                { id: 'customer', text: '고객센터' },
                { id: 'withdrawal', text: '회원탈퇴' },
            ]
        },
    ];
    const [subComponent, setSubComponent] = useState();
    const onClickStep = subCategory => navigate(`/myPage/${subCategory.id}`);
    const moveStep = () => {
        console.log('call moveStep()')
        if (params.step === 'reservation') setSubComponent(<MyPageReservation title={'예매현황'}/>);
        if (params.step === 'modify') setSubComponent(<MyPageModify title={'개인정보 변경'}/>);
        if (params.step === 'withdrawal') setSubComponent(<MyPageWithdrawal title={'회원탈퇴'}/>);
    };
    useMemo(moveStep, [params]);
    return (
        <div>
            <Navigation />
            <div className="mypage-container">
                <div className="mypage-header">
                    <div className="mypage-header-title">마이페이지</div>
                </div>
                <div className="mypage-content">
                    <div className="mypage-content-box">
                        <div className="mypage-content-box-menu-list">
                            {stepMenuList.length > 0 && stepMenuList.map(category => {
                                return (
                                    <div key={`key-step-menu-box-${category.id}`} className="mypage-content-box-menu-list-box">
                                        <div key={`key-step-menu-category-${category.id}`} className="mypage-content-box-menu-list-box-category">
                                            {category.category}
                                        </div>
                                        {category.list.length > 0 && category.list.map(subCategory => {
                                            return (
                                                <div key={`key-step-menu-list-${subCategory.id}`}
                                                     className="mypage-content-box-menu-list-box-subcategory"
                                                     onClick={() => onClickStep(subCategory)}>
                                                    {subCategory.text}
                                                </div>
                                            )
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mypage-content-box-menu-detail">
                            {subComponent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;