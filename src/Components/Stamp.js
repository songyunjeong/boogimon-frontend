import styled, { css } from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import boogi from '../boogi';
import { useLocation } from 'react-router-dom';

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
  cursor: pointer;
  > img {
    width: ${(props) => (props.$small ? '150px' : '200px')};
    height: 100%;
  }
`;

const StampTitle = styled.div`
  text-align: center;
  cursor: default;
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
  top: calc(50% - (80vh + 46px) / 2);
  left: calc(50% - 800px / 2);
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PopupBox = styled.div`
  position: absolute;
  background-color: white;
  width: 800px;
  height: 80vh;
  font-size: var(--small);
  border-radius: 10px;
  overflow: auto;
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
  height: 300px;
  border-radius: 10px 10px 0 0;
`;

const Img = styled(PlcaeImg)`
  background-image: url(${(props) => props.$background});
  background-size: cover;
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
  width: 715px;
`;

const UrlRight = styled(RightBox)`
  width: 715px;
`;

const PayRight = styled(RightBox)`
  width: 715px;
`;

const Facility = styled.div`
  width: 715px;
`;

const Traffic = styled.div`
  width: 676px;
`;

const Tel = styled(Addr)`
  /* clear: both; */
  padding-top: 10px;
`;
const Close = styled.div`
  width: 760px;
  margin: 13px 20px 0px 20px;
  border-bottom: 1px solid rgb(239, 239, 239);
  padding-bottom: 13px;
`;

const Pay = styled(Close)`
  height: 30px;
`;

const FacilityBox = styled(Close)`
  height: 30px;
`;

const Open = styled(Close)`
  clear: both;
  font-weight: bold;
`;

const PageUrl = styled(Close)`
  height: 35px;
`;

const DetailBox = styled.div`
  margin: 20px 20px 20px 20px;
  width: 760px;
  clear: both;
`;

const Detail = styled.div`
  padding-top: 10px;
  text-align: justify;
`;

const Url = styled.div`
  &:hover,
  &:focus {
    color: blue;
  }
`;

const Stamp = (props) => {
  const { pathname } = useLocation();
  const fileInputRef = useRef(null);
  const [popupOn, setPopupOn] = useState(false);
  const [data, setData] = useState();
  const [background, setBackground] = useState('');
  const [url, setUrl] = useState('');
  const [isStamped, setIsStamped] = useState(props.isstamped);
  const [lastVisit, setLastVisit] = useState(props.lastvisitdate);
  const [isPick, setIsPick] = useState(props.ispick);
  const [stampImg, setStampImg] = useState(props.src);

  const onOpenPopup = async () => {
    if (window.location.pathname === '/stampDetail') {
      // console.log('pathname: ', window.location.pathname);
      const ajax_data = await boogi.get(
        `/boogimon/place.jsp?placeId=${props.placeid}`
      );

      setData(ajax_data.data);
      setBackground(ajax_data.data.placeDetail.img);
      setUrl(ajax_data.data.placeDetail.homepage);
      setPopupOn(!popupOn);
    }
  };

  const onClosePopup = () => {
    setPopupOn(!popupOn);
  };

  const Popup = () => {
    const apiText = data.placeDetail.detail;
    const text = apiText.replace(/(<([^>]+)>)/gi, '');

    return (
      <Modal>
        <PopupBg />
        <PopupWarp>
          <CloseBox>
            <CloseBtn onClick={onClosePopup}>닫기</CloseBtn>
          </CloseBox>
          <PopupBox>
            <PlcaeImg>
              <Img $background={background} />
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
              <LeftBox>
                <Span>💵</Span>
              </LeftBox>
              <PayRight>
                {`${data.placeDetail.pay === '' ? '-' : data.placeDetail.pay}`}
              </PayRight>
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
            <Open
              style={{
                color:
                  data.placeDetail.open === '' ? 'black' : 'rgb(54, 143, 255)',
              }}
            >
              <Span>운영</Span>
              {`${data.placeDetail.open === '' ? '-' : data.placeDetail.open}`}
            </Open>
            <Close>
              <Span>휴무</Span>
              {`${
                data.placeDetail.close === '' || 'null'
                  ? '-'
                  : data.placeDetail.close
              }`}
            </Close>
            <PageUrl>
              <LeftBox>
                <Span>🌐</Span>
              </LeftBox>
              <UrlRight>
                <Url as='a' href={url} target='_blank'>
                  {`${
                    data.placeDetail.homepage === ''
                      ? '-'
                      : data.placeDetail.homepage
                  }`}
                </Url>
              </UrlRight>
            </PageUrl>

            <DetailBox>
              <Span>개요</Span>

              <Detail>{`${text === '' ? '-' : text}`}</Detail>
            </DetailBox>
          </PopupBox>
        </PopupWarp>
      </Modal>
    );
  };

  const stampedImg = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const targetImg = e.target.files[0];

    if (targetImg) {
      const formData = new FormData();
      formData.append('userId', window.sessionStorage.getItem('userId'));
      formData.append('stampbookId', props.stampbookId);
      formData.append('stampNo', props.stampno);
      formData.append('stampImg', targetImg);
      formData.append('command', 'newStamp');

      boogi.post('/boogimon/stampbook/stampUpload.jsp', formData);
    }

    setStampImg(URL.createObjectURL(targetImg));
    setIsStamped(true);
  };

  return (
    <StampBox
      {...props}
      onClick={() => {
        isPick === true ? stampedImg() : onOpenPopup();
      }}
    >
      <form
        id='stamped-img'
        className='stamped-img'
        encType='multipart/form-data'
        method='POST'
      >
        <StampImgBox {...props}>
          {pathname === '/my' && !isStamped ? (
            <img
              src={stampImg}
              alt={props.alt}
              ref={fileInputRef}
              style={{ opacity: '0.3' }}
            />
          ) : pathname === '/stampDetail' && isPick && !isStamped ? (
            <img
              src={stampImg}
              alt={props.alt}
              ref={fileInputRef}
              style={{ opacity: '0.3' }}
            />
          ) : pathname === '/boogiBook' && lastVisit === null ? (
            <img
              src={stampImg}
              alt={props.alt}
              ref={fileInputRef}
              style={{ opacity: '0.3' }}
            />
          ) : (
            <img src={stampImg} alt={props.alt} />
          )}
          <input
            type='file'
            name='stampImg'
            id='stampImg'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </StampImgBox>
        <StampTitle {...props}>
          {props.$small && props.title.length > 8
            ? props.title.slice(0, 6) + '...'
            : props.title}
        </StampTitle>
      </form>
      {popupOn && <Popup />}
    </StampBox>
  );
};

export default Stamp;
