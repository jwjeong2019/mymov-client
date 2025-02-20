import '../css/MovieManagement.css'
import SideBar from "../component/SideBar";
import Navigation from "../component/Navigation";
import Header from "../component/Header";
import LabelInput from "../component/LabelInput";
import {IoAdd, IoClose, IoSearch} from "react-icons/io5";
import {useRef} from "react";

const MovieManagement = () => {
    const modalRef = useRef();
    const handleClickAdd = () => {
        modalRef.current.style.display = 'flex';
    }
    const handleClickClose = () => {
        modalRef.current.style.display = 'none';
    }
    return (
        <div id={'movie-management-container'}>
            <SideBar />
            <div id={'movie-management-section'}>
                <Navigation />
                <div id={'movie-management-section-article'}>
                    <Header title={'영화 관리'} />
                    <div id={'movie-management-search'}>
                        <div id={'movie-management-search-row-1'}>
                            <div id={'movie-management-search-row-1-bar'}>
                                <input type="text" placeholder={'영화를 입력하세요.'}/>
                                <button>
                                    <IoSearch />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id={'movie-management-conditions'}>
                        <div id={'movie-management-conditions-box'}>
                            <div>장르별</div>
                            <div>최신순</div>
                            <div>연령순</div>
                        </div>
                    </div>
                    <div id={'movie-management-content'}>
                        <div id={'movie-management-content-card'}>
                            <img src="https://img.hankyung.com/photo/202304/AKR20230428172700005_01_i_P4.jpg" alt=""/>
                            <div id={'movie-management-content-card-col'}>
                                <div>제목</div>
                                <div>범죄도시3</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>장르</div>
                                <div>액션</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>연령</div>
                                <div>15세</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>감독</div>
                                <div>마석동</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>개봉일</div>
                                <div>2023-11-02</div>
                            </div>
                            <div id={'movie-management-content-card-buttons'}>
                                <button>수정</button>
                                <button>삭제</button>
                            </div>
                        </div>
                        <div id={'movie-management-content-card'}>
                            <img src="https://img.hankyung.com/photo/202304/AKR20230428172700005_01_i_P4.jpg" alt=""/>
                            <div id={'movie-management-content-card-col'}>
                                <div>제목</div>
                                <div>범죄도시3</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>장르</div>
                                <div>액션</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>연령</div>
                                <div>15세</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>감독</div>
                                <div>마석동</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>개봉일</div>
                                <div>2023-11-02</div>
                            </div>
                            <div id={'movie-management-content-card-buttons'}>
                                <button>수정</button>
                                <button>삭제</button>
                            </div>
                        </div>
                        <div id={'movie-management-content-card'}>
                            <img src="https://img.hankyung.com/photo/202304/AKR20230428172700005_01_i_P4.jpg" alt=""/>
                            <div id={'movie-management-content-card-col'}>
                                <div>제목</div>
                                <div>범죄도시3</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>장르</div>
                                <div>액션</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>연령</div>
                                <div>15세</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>감독</div>
                                <div>마석동</div>
                            </div>
                            <div id={'movie-management-content-card-col'}>
                                <div>개봉일</div>
                                <div>2023-11-02</div>
                            </div>
                            <div id={'movie-management-content-card-buttons'}>
                                <button>수정</button>
                                <button>삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={'movie-management-section-button'}>
                    <div onClick={handleClickAdd}>
                        <IoAdd />
                    </div>
                </div>
            </div>
            <div id={'movie-management-modal'} ref={modalRef}>
                <div id={'movie-management-modal-window'}>
                    <div id={'movie-management-modal-window-header'}>
                        <div onClick={handleClickClose}><IoClose /></div>
                    </div>
                    <div id={'movie-management-modal-window-body'}></div>
                    <div id={'movie-management-modal-window-footer'}></div>
                </div>
            </div>
        </div>
    );
}

export default MovieManagement;