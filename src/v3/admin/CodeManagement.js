import '../css/CodeManagement.css'
import SideBar from "../component/SideBar";
import Navigation from "../component/Navigation";
import Header from "../component/Header";
import LabelInput from "../component/LabelInput";

const CodeManagement = () => {
    return (
        <div id={'code-management-container'}>
            <SideBar />
            <div id={'code-management-section'}>
                <Navigation />
                <Header title={'코드 관리'} />
                <div id={'code-management-content'}>
                    <div id={'code-management-content-card'}>
                        <div id={'code-management-content-card-header'}>지역</div>
                        <div id={'code-management-content-card-body'}>
                            <div id={'code-management-content-card-body-form'}>
                                <LabelInput label={'코드'} placeholder={'코드 입력(ex. A0001)'} />
                                <LabelInput label={'지역명'} placeholder={'지역명 입력(ex. 서울)'} />
                                <div id={'code-management-content-card-body-form-submit'}>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>추가</span>
                                    </button>
                                </div>
                            </div>
                            <div id={'code-management-content-card-body-list'}>
                                <div id={'code-management-content-card-body-list-item'}>
                                    <div>A0001</div>
                                    <div>서울</div>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>삭제</span>
                                    </button>
                                </div>
                                <div id={'code-management-content-card-body-list-item'}>
                                    <div>A0001</div>
                                    <div>서울</div>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>삭제</span>
                                    </button>
                                </div>
                                <div id={'code-management-content-card-body-list-item'}>
                                    <div>A0001</div>
                                    <div>서울</div>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>삭제</span>
                                    </button>
                                </div>
                                <div id={'code-management-content-card-body-list-item'}>
                                    <div>A0001</div>
                                    <div>서울</div>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>삭제</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id={'code-management-content-card'}>
                        <div id={'code-management-content-card-header'}>장르</div>
                        <div id={'code-management-content-card-body'}>
                            <div id={'code-management-content-card-body-form'}>
                                <LabelInput label={'코드'} placeholder={'코드 입력(ex. G0001)'} />
                                <LabelInput label={'장르명'} placeholder={'장르명 입력(ex. 액션)'} />
                                <div id={'code-management-content-card-body-form-submit'}>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>추가</span>
                                    </button>
                                </div>
                            </div>
                            <div id={'code-management-content-card-body-list'}>
                                <div id={'code-management-content-card-body-list-item'}>
                                    <div>G0001</div>
                                    <div>액션</div>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>삭제</span>
                                    </button>
                                </div>
                                <div id={'code-management-content-card-body-list-item'}>
                                    <div>G0001</div>
                                    <div>액션</div>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>삭제</span>
                                    </button>
                                </div>
                                <div id={'code-management-content-card-body-list-item'}>
                                    <div>G0001</div>
                                    <div>액션</div>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>삭제</span>
                                    </button>
                                </div>
                                <div id={'code-management-content-card-body-list-item'}>
                                    <div>G0001</div>
                                    <div>액션</div>
                                    <button>
                                        <span className={'gowun-dodum-regular'}>삭제</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeManagement;