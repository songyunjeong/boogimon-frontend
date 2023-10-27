import React,{useState} from 'react';
import styled from 'styled-components';
import data from './data.json';

function StampDetail() {
    const [popupOn, setPopupOn] = useState(false);
    const onOpenPopup = () => {
        setPopupOn(!popupOn);
    }

    const DetailSee = () => {
        return(
            <Detail>{data.detail}</Detail>
        )
    }

    const [moreBtn, setMoreBtn] = useState("상세내용");
    const [isView, setIsView] = useState(false);
    
    const onClick = () => {
      if (moreBtn === "상세내용") {
        setMoreBtn("접기");
        setIsView(true);
      } else {
        setMoreBtn("상세내용");
        setIsView(false);
      }
    };
    

    const Popup = () => {
        return(
            <Modal>
                <PopupBg></PopupBg>
                <PopupBox>
                    <PopupBoxLeft>
                        <PlcaeImg><img src={process.env.PUBLIC_URL + '/test.jpg'} width = '350px' height='350px'/></PlcaeImg>
                        <PlaceName>{data.name}</PlaceName>
                        <Pay>💵 {data.money}</Pay>
                        <Addr>🎗️ {data.addr}</Addr>
                        <Tel>{data.tel}</Tel>
                    </PopupBoxLeft>
                    <PopupBoxRight>
                        <Box1>
                            <Open>{data.open}</Open>
                            <Close>{data.close}</Close>
                        </Box1>
                            <PageUrl>{data.url}</PageUrl>
                            <Traffic>{data.traffic}</Traffic>
                            <Facility>{data.facility}</Facility>
                            {isView ? <DetailSee/> : null}
                            <MoreBtn onClick={onClick}>{moreBtn}</MoreBtn>
                    </PopupBoxRight>
                    <CloseBtn onClick={onOpenPopup}>닫기</CloseBtn>
                </PopupBox>
            </Modal>
        )
    }


    return(
        <React.Fragment>
            <OpenBtn onClick={onOpenPopup}>팝업창 오픈</OpenBtn>
            {popupOn ? <Popup/> : ''}
        </React.Fragment>
    )
}

const Modal = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PopupBg = styled.div`
    width: 1200px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`

const PopupBox = styled.div`
    position: absolute;
    background-color: white;
    width: 900px;
    height: 550px;
    font-size: 14px;
`

const CloseBtn = styled.button`
    display: block;
    width: 100px;
    color: violet;
`
const OpenBtn = styled(CloseBtn)`
    width: 200px;
`


const PopupBoxLeft = styled.div`
    
    width: 350px;
    height: 550px;
    float: left;
`

const PopupBoxRight = styled.div`
    
    width: 550px;
    height: 550px;
    float: right;
`

const PlcaeImg = styled.div`
    width: 350px;
    height: 350px;
    /* background-image: url("./test.jpg");
    background-size: cover;
    background-position: center; */
`

const PlaceName = styled.div`
    width: 350px;
    height: 60px;
`

const Pay = styled.div`
    width: 350px;
    height: 50px;
`

const Addr = styled(Pay)`
`
const Tel = styled.div`
    width: 350px;
    height: 40.5px;
`

const Box1 = styled.div`
    width: 550px;
    height: 40px;
`

const Open = styled.div`
    float: left;
    width: 275px;
    height: 40.5px;
`

const Close = styled.div`
    float: right;
    width: 275px;
    height: 35.5px;
`

const PageUrl = styled.div`
    width: 550px;
    height: 35.5px;
`

const Traffic = styled.div`
    width: 550px;
    height: 80px;
`

const Facility = styled.div`
    width: 550px;
    height: 40px;
`

const Detail = styled.div`
    width: 550px;
    height: 310px;
`

const MoreBtn = styled.button`

`
export default StampDetail;