import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import images from '../images/test.jpg';
// import data from '../data.json';
import axios from 'axios';

const StampBox = styled.div`
  width: 150px;
  margin-right: 45px;
  margin-bottom: 30px;
`;

const StampImgBox = styled.div`
  background-color: var(--gray3);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
  overflow: hidden;
  > img {
    width: 200px;
  }
`;

const StampTitle = styled.div`
  text-align: center;
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
  background-image: url(${images});
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
  width: 673px;
`;

const Traffic = styled.div`
  width: 690px;
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

const Facility = styled(Pay)``;

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

const LinkUrl = styled(Link)`
  &:hover,
  &:focus {
    color: blue;
  }
`;

const Stamp = (props) => {
  const [popupOn, setPopupOn] = useState(false);
  const onOpenPopup = () => {
    setPopupOn(!popupOn);
  };

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/boogimon/place.jsp', )
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const Popup = () => {
    const [data, setData] = useState(false);

    axios
      .get('http://localhost:8080/boogimon/place.jsp', {
        params: {
          placeId: 2,
        },
      })
      .then((res) => {
        setData(res.data);

        console.log('ajax data', data);
      })
      .catch((err) => {
        console.log(err);
      });

    return (
      <Modal>
        <PopupBg />
        <PopupWarp>
          <CloseBox>
            <CloseBtn onClick={onOpenPopup}>닫기</CloseBtn>
          </CloseBox>
          <PopupBox>
            <PlcaeImg>
              <Img />
            </PlcaeImg>

            <PlaceName> {data.name}</PlaceName>

            <GrayBox>
              <Addr>
                <Span>주소</Span> {data.addr}
              </Addr>
              <TrafficBox>
                <LeftBox>
                  <Span>교통</Span>
                </LeftBox>
                <RightBox>
                  <Traffic>{data.traffic}</Traffic>
                </RightBox>
              </TrafficBox>
              <Tel>
                <Span>전화</Span> {data.tel}
              </Tel>
            </GrayBox>

            <Pay>
              <Span>💵</Span> {data.pay}
            </Pay>
            <Facility>
              <Span>시설</Span> {data.facility}
            </Facility>
            <Open>
              <Span>운영</Span> {data.open}
            </Open>
            <Close>
              <Span>휴무</Span> {data.close}
            </Close>
            <PageUrl>
              <Span>🌐</Span>
              {/* <LinkUrl to='/{data.url}'>{data.homepage}</LinkUrl> */}
              <LinkUrl to='/{data.url}'>{data.url}</LinkUrl>
              {/* <a href='{data.url}'>{data.url}</a> */}
            </PageUrl>

            <DetailBox>
              <Span>개요</Span>
              <Detail>{data.detail}</Detail>
            </DetailBox>
          </PopupBox>
        </PopupWarp>
      </Modal>
    );
  };
  return (
    <>
      <StampBox onClick={onOpenPopup}>
        <StampImgBox>
          <img src={props.imgSrc} alt={props.imgAlt} />
        </StampImgBox>
        <StampTitle>{props.title}</StampTitle>
      </StampBox>
      {popupOn ? <Popup /> : ''}
    </>
  );
};

export default Stamp;
