import React, { useState } from 'react';
import styled from 'styled-components';
import data from './data.json';
import imges from './imges/test.jpg';
import GlobalStyle from './styles/globalStyle';
function StampDetail() {
  const [popupOn, setPopupOn] = useState(false);
  const onOpenPopup = () => {
    setPopupOn(!popupOn);
  };
  const Popup = () => {
    return (
      <Modal>
        <GlobalStyle/>
        <PopupBg/>
        <PopupWarp>
            <CloseBox>
                <CloseBtn onClick={onOpenPopup}>닫기</CloseBtn>
            </CloseBox>
            <PopupBox>
                <PlcaeImg>
                    <Img/>
                </PlcaeImg>
                <PlaceName> {data.name}</PlaceName>
                <Addr><Span>주소</Span> {data.addr}</Addr>
                <Box>
                <LeftBox>
                    <Span>교통</Span>
                </LeftBox>
                <RightBox>
                    <Traffic>{data.traffic}</Traffic>
                </RightBox>
                </Box>
                <Tel>📞 {data.tel}</Tel>
                <Pay>💵 {data.money}</Pay>
                <Facility><Span>시설</Span> {data.facility}</Facility>
                <Open><Span>운영</Span> {data.open}</Open>
                <Close><Span>휴무</Span> {data.close}</Close>
                <PageUrl>🌐 {data.url}</PageUrl>
                <Box2>
                    <LeftBox2>
                    <Span>개요</Span>
                    </LeftBox2>
                    <RightBox2>
                    <Detail>{data.detail}</Detail>
                    </RightBox2>
                </Box2>
            </PopupBox>
        </PopupWarp>
      </Modal>
    );
  };
  return (
    <React.Fragment>
      <OpenBtn onClick={onOpenPopup}>팝업창 오픈</OpenBtn>
      {popupOn ? <Popup /> : ''}
    </React.Fragment>
  );
}
const Span = styled.span`
  color:#808080a6;
`
const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PopupBg = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`;
const CloseBox = styled.div`
    display: flex;
    justify-content: end;
`;
const PopupWarp = styled.div`
    position: absolute;
    width: 600px;
    height: 910px;
`;
const PopupBox = styled.div`
    position: absolute;
    background-color: white;
    width: 600px;
    height: 870px;
    font-size: var(--small);
`;
const CloseBtn = styled.button`
    border: 2px solid var(--gray2);
    border-radius: 4px;
    background-color: #ffffff;
    padding: 8px 25px;
    box-sizing: border-box;
    &:hover{
        cursor: pointer;
        background-color: var(--yellow);
        border: 2px solid var(--light-blue);
    }
`;
const OpenBtn = styled(CloseBtn)`
`;
const PlcaeImg = styled.div`
    width: 600px;
    height: 200px;
`;
const Img = styled(PlcaeImg)`
    background-image: url(${imges});
    background-size: 100% 100%;
`
const PlaceName = styled.div`
    width: 580px;
    height: 35px;
    font-size: 24px;
    padding: 10px;
`;
const Pay = styled.div`
    width: 580px;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
`;
const Addr = styled(Pay)``;
const Box = styled(Pay)`
  height: 80px;
`;
const LeftBox = styled.div`
  float: left;
  width:30px;
`;
const RightBox = styled.div`
  float: right;
  width:548px;
`;
const Traffic = styled.div`
    width: 548px;
    height: 80px;
`;
const Tel = styled(Pay)`
`;
const Open = styled(Pay)`
`;
const Close = styled(Pay)`
`;
const PageUrl = styled(Pay)`
`;
const Box2 = styled.div`
  width: 590px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 255px;
  padding-left: 10px;
`;
const LeftBox2 = styled(LeftBox)`
  width: 30px;
`;
const RightBox2 = styled(RightBox)`
  width: 540px;
`;
const Facility = styled(Pay)`
`;
const Detail = styled.div`
  width: 540px;
  height: 255px;
`;
export default StampDetail;