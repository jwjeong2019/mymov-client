import '../css/CodeManagement.css'
import * as V3 from "../component/V3";

const CodeManagement = () => {
    const regionDataLabels = [
        { title: '코드', placeholder: '코드 입력(ex. A0001)' },
        { title: '지역명', placeholder: '지역명 입력(ex. 서울)' },
    ];
    const regionList = [
        { code: 'R0001', name: '서울' },
        { code: 'R0002', name: '대전' },
        { code: 'R0003', name: '대구' },
        { code: 'R0004', name: '부산' },
    ];
    const genreDataLabels = [
        { title: '코드', placeholder: '코드 입력(ex. A0001)' },
        { title: '장르명', placeholder: '장르명 입력(ex. 액션)' },
    ];
    const genreList = [
        { code: 'G0001', name: '코미디' },
        { code: 'G0002', name: '액션' },
        { code: 'G0003', name: 'SF' },
        { code: 'G0004', name: '공포' },
    ];

    return (
        <V3.Container>
            <V3.SideBar />
            <V3.Main>
                <V3.Navigation />
                <V3.Body>
                    <V3.Title title={'코드 관리'} />
                    <V3.Card>
                        <V3.Card.List>
                            <V3.Card.Item>
                                <V3.Card.Title title={'지역'} />
                                <V3.Card.Body>
                                    <V3.CMCardBody.Form dataLabels={regionDataLabels} />
                                    <V3.CMCardBody.List list={regionList} />
                                </V3.Card.Body>
                            </V3.Card.Item>
                            <V3.Card.Item>
                                <V3.Card.Title title={'장르'} />
                                <V3.Card.Body>
                                    <V3.CMCardBody.Form dataLabels={genreDataLabels} />
                                    <V3.CMCardBody.List list={genreList} />
                                </V3.Card.Body>
                            </V3.Card.Item>
                        </V3.Card.List>
                    </V3.Card>
                </V3.Body>
            </V3.Main>
        </V3.Container>
    );
}

export default CodeManagement;