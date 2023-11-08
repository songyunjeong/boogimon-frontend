import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';

const StampBox = styled.div`
  width: ${(props) => (props.$small ? '110px' : '150px')};
  margin-right: ${(props) => (props.$small ? '15px' : '45px')};
  margin-bottom: ${(props) => (props.$small ? '15px' : '30px')};
`;

const StampImgBox = styled.div`
  background-color: var(--gray3);
  width: ${(props) => (props.$small ? '110px' : '150px')};
  height: ${(props) => (props.$small ? '110px' : '150px')};
  border-radius: 50%;
  margin-bottom: 10px;
  overflow: hidden;
  > img {
    width: ${(props) => (props.$small ? '150px' : '200px')};
  }
`;

const StampTitle = styled.div`
  text-align: center;
  ${(props) =>
    props.$small &&
    css`
      font-size: var(--small);
    `};
`;

const Span = styled.span`
  color: var(--gray3);
  padding-right: 5px;
  font-weight: bold;
  width: 40px;
  display: inline-block;
`;

const Modal = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
`;

const PopupBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

const CloseBox = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
`;

const PopupWarp = styled.div`
  position: fixed;
  width: 800px;
  height: 80vh;
  top: calc(50% - 92vh / 2);
  left: calc(50% - 800px / 2);
`;

const PopupBox = styled.div`
  position: absolute;
  background-color: white;
  width: 800px;
  font-size: var(--small);
  border-radius: 10px;
`;

const CloseBtn = styled.button`
  border: 2px solid var(--gray2);
  border-radius: 4px;
  background-color: #ffffff;
  padding: 8px 25px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: var(--yellow);
    border: 2px solid var(--light-blue);
  }
`;

const PlcaeImg = styled.div`
  width: 800px;
  height: 17vh;
  border-radius: 10px 10px 0 0;
`;

const Img = styled(PlcaeImg)`
  background-image: url(${(props) => props.background});
  background-size: 100% 100%;
`;

const PlaceName = styled.div`
  width: 760px;
  font-size: 24px;
  margin: 15px 20px 0px 20px;
  font-weight: bolder;
`;

const GrayBox = styled.div`
  width: 720px;
  margin: 10px 20px 0px 20px;
  padding: 20px;
  border-radius: 6px;
  background-color: rgb(250, 250, 250);
`;

const Addr = styled.div`
  width: 720px;
`;

const TrafficBox = styled(Addr)`
  padding-top: 10px;
`;

const LeftBox = styled.div`
  float: left;
  width: 40px;
`;

const RightBox = styled.div`
  float: right;
  width: 676px;
`;

const LeftBox2 = styled(LeftBox)`
  width: 45px;
`;

const RightBox2 = styled(RightBox)`
  width: 710px;
`;

const Facility = styled.div`
  width: 710px;
`;

const Traffic = styled.div`
  width: 676px;
`;

const Tel = styled(Addr)`
  clear: both;
  padding-top: 10px;
`;

const Pay = styled.div`
  width: 760px;
  margin: 13px 20px 0px 20px;
  border-bottom: 1px solid rgb(239, 239, 239);
  padding-bottom: 13px;
`;

const FacilityBox = styled(Pay)`
  height: 30px;
`;

const Open = styled(Pay)`
  color: rgb(54, 143, 255);
  font-weight: bold;
`;

const Close = styled(Pay)``;

const PageUrl = styled(Pay)``;

const DetailBox = styled.div`
  margin: 20px 20px 20px 20px;
  width: 760px;
`;

const Detail = styled.div`
  height: 255px;
  overflow-y: scroll;
  padding-top: 10px;
`;

const Url = styled.div`
  &:hover,
  &:focus {
    color: blue;
  }
`;

const Stamp = (props) => {
  const [popupOn, setPopupOn] = useState(false);
  const [data, setData] = useState();
  const [background, setBackground] = useState('');
  const [url, setUrl] = useState('');

  const onOpenPopup = () => {
    axios
      .get(`http://localhost:8080/boogimon/place.jsp?placeId=${props.placeId}`)
      .then((res) => {
        setData(res.data);
        setBackground(data.placeDetail.img);
        setUrl(data.placeDetail.homepage);
        setPopupOn(!popupOn);
      });
  };

  const onClosePopup = () => {
    setPopupOn(!popupOn);
  };

  const Popup = () => {
    return (
      <Modal>
        <PopupBg />
        <PopupWarp>
          <CloseBox>
            <CloseBtn onClick={onClosePopup}>닫기</CloseBtn>
          </CloseBox>
          <PopupBox>
            <PlcaeImg>
              <Img background={background} />
            </PlcaeImg>

            <PlaceName>{data.placeDetail.name}</PlaceName>

            <GrayBox>
              <Addr>
                <Span>주소</Span>
                {`${
                  data.placeDetail.addr === '' ? '-' : data.placeDetail.addr
                }`}
              </Addr>
              <TrafficBox>
                <LeftBox>
                  <Span>교통</Span>
                </LeftBox>
                <RightBox>
                  <Traffic>
                    {`${
                      data.placeDetail.traffic === ''
                        ? '-'
                        : data.placeDetail.traffic
                    }`}
                  </Traffic>
                </RightBox>
              </TrafficBox>
              <Tel>
                <Span>전화</Span>
                {`${data.placeDetail.tel === '' ? '-' : data.placeDetail.tel}`}
              </Tel>
            </GrayBox>

            <Pay>
              <Span>💵</Span>
              {`${data.placeDetail.pay === '' ? '-' : data.placeDetail.pay}`}
            </Pay>
            <FacilityBox>
              <LeftBox2>
                <Span>시설</Span>
              </LeftBox2>
              <RightBox2>
                <Facility>
                  {`${
                    data.placeDetail.facility === ''
                      ? '-'
                      : data.placeDetail.facility
                  }`}
                </Facility>
              </RightBox2>
            </FacilityBox>
            <Open>
              <Span>운영</Span>
              {`${data.placeDetail.open === '' ? '-' : data.placeDetail.open}`}
            </Open>
            <Close>
              <Span>휴무</Span>
              {`${
                data.placeDetail.close === '' ? '-' : data.placeDetail.close
              }`}
            </Close>
            <PageUrl>
              <Span>🌐</Span>
              <Url as='a' href={url} target='_blank'>
                {`${
                  data.placeDetail.homepage === ''
                    ? '-'
                    : data.placeDetail.homepage
                }`}
              </Url>
            </PageUrl>

            <DetailBox>
              <Span>개요</Span>
              <Detail>
                {`${
                  data.placeDetail.detail === '' ? '-' : data.placeDetail.detail
                }`}
              </Detail>
            </DetailBox>
          </PopupBox>
        </PopupWarp>
      </Modal>
    );
  };
  return (
    <StampBox {...props} onClick={onOpenPopup}>
      <StampImgBox {...props}>
        <img src={props.src} alt={props.alt} />
      </StampImgBox>
      <StampTitle {...props}>
        {props.$small && props.title.length > 8
          ? props.title.slice(0, 6) + '...'
          : props.title}
      </StampTitle>
      {popupOn && <Popup />}
    </StampBox>
  );
};

export default Stamp;
