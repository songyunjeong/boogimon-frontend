import React, { useState } from 'react';
import styled from 'styled-components';
import data from './data.json';

function StampDetail() {
  const [popupOn, setPopupOn] = useState(false);
  const onOpenPopup = () => {
    setPopupOn(!popupOn);
  };

  const Popup = () => {
    return (
      <Modal>
        <PopupBg>
          <CloseBox>
            <CloseBtn onClick={onOpenPopup}>닫기</CloseBtn>
          </CloseBox>
        </PopupBg>
        <PopupBox>
            <PlcaeImg>
                <img
                src={process.env.PUBLIC_URL + '/test.jpg'}
                width='600px'
                height='200px'
                />
            </PlcaeImg>
            <PlaceName> {data.name}</PlaceName>
            <Addr><Span>주소</Span> {data.addr}</Addr>
            <Box>
              <LeftBox>
                <Span>가는길</Span>
              </LeftBox>
              <RightBox>
                <Traffic>{data.traffic}</Traffic>
              </RightBox>
            </Box>
            <Tel>📞 {data.tel}</Tel>
            <Pay>💵 {data.money}</Pay>
            <Facility>💶 {data.facility}</Facility>
            <Open><Span>운영일</Span> {data.open}</Open>
            <Close><Span>휴무일</Span> {data.close}</Close>
            <PageUrl>🌐 {data.url}</PageUrl>
            <Box2>
                <LeftBox>
                  <Span>상세정보</Span>
                </LeftBox>
                <RightBox>
                  <Detail>{data.detail}</Detail>
                </RightBox>
            </Box2>
        </PopupBox>
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
    justify-content: center;
    padding-top: 19px;
    padding-left: 500px;
`;

const PopupBox = styled.div`
    position: absolute;
    background-color: white;
    width: 600px;
    height: 870px;
    font-size: 14px;
`;

const CloseBtn = styled.button`
    display: block;
    width: 100px;
    color: violet;
`;
const OpenBtn = styled(CloseBtn)`
    width: 200px;
`;

const PlcaeImg = styled.div`
    width: 600px;
    height: 200px;
    /* background-image: url("./test.jpg");
    background-size: cover;
    background-position: center; */
`;

const PlaceName = styled.div`
    width: 580px;
    height: 35px;
    font-size: 24px;
    padding: 10px;
`;

const Pay = styled.div`
    width: 600px;
    height: 40px;
`;

const Addr = styled(Pay)``;


const Box = styled.div`
  width:600px;
  height: 80px;
`;

const LeftBox = styled.div`
  float: left;
`;

const RightBox = styled.div`
  float: right;
`;

const Traffic = styled.div`
    width: 550px;
    height: 80px;
`;

const Tel = styled.div`
    width: 350px;
    height: 40px;
`;

const Open = styled.div`
    width: 600px;
    height: 40px;
`;

const Close = styled.div`
    width: 600px;
    height: 40px;
`;

const PageUrl = styled.div`
    width: 600px;
    height: 40px;
`;

const Box2 = styled.div`
  width: 600px;
  overflow-y: scroll;
  height: 255px;
`;

const Facility = styled.div`
    width: 600px;
    height: 40px;
`;

const Detail = styled.div`
  width: 520px;
`;

export default StampDetail;
