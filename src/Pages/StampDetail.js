import Header from '../Components/Header';
import like from '../images/like.png';
import avatar from '../images/avatar.png';
import Map from '../Components/Map';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Components/Button';
import styled from 'styled-components';
import Stamp from '../Components/Stamp';
import TalkBox from '../Components/TalkBox';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import images from '../images/test.jpg';
import data from '../data.json';

const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
  > div > div {
    float: left;
  }
`;

const Title = styled.div`
  width: 100%;
  font-size: var(--big);
  font-weight: bold;
  margin: 50px 0 20px;
`;

const StampBoardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  background-color: var(--gray1);
  border-radius: 10px;
  padding: 50px 80px 20px;
  box-sizing: border-box;
  margin-right: 30px;
  > div:nth-child(3n) {
    margin-right: 0;
  }
`;

const MapBox = styled.div`
  width: 550px;
  border-radius: 12px;
  overflow: hidden;
`;

const ButtonBar = styled.div`
  clear: both;
  position: relative;
  padding: 20px 0;
  box-sizing: border-box;
`;

const StampBookLike = styled.div`
  display: flex;
  position: absolute;
  top: 25px;
  right: 600px;
  > div:first-child {
    margin-right: 10px;
  }
`;

const StampBookLikeBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  > input {
    width: 1195px;
    height: 50px;
    border: 2px solid var(--gray2);
    border-radius: 5px;
    text-align: start;
    padding: 0 20px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }
`;

const CommentBox = styled.div``;

const MoreBtn = styled.div`
  text-align: center;
`;

const CreateUserBox = styled.div`
  height: 320px;
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

const StampDetail = () => {
  const divRef = useRef();
  const { state } = useLocation();
  const [popupOn, setPopupOn] = useState(false);

  const downloadHandler = async (e) => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 1 });
      canvas.toBlob((blob) => {
        if (blob != null) {
          saveAs(blob, 'stampBook.png');
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  const onOpenPopup = () => {
    setPopupOn(!popupOn);
  };

  const Popup = () => {
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
              <Span>💵</Span> {data.money}
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

  const stampList = [
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_thumbL',
      title: '흰여울문화마을',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222171209005_thumbL',
      title: '깡깡이 예술마을',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222175627506_thumbL',
      title: '국립해양박물관',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222180829962_thumbL',
      title: '태종대',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222181829937_thumbL',
      title: '죽성성당',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222185645736_thumbL',
      title: '아홉산 숲',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222190823385_thumbL',
      title: '해동용궁사',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191224093809621_thumbL',
      title: '임랑해수욕장',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191224171115847_thumbL',
      title: '문화공감 수정, 초량1941',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20230525134753245_thumbL',
      title: '영도, 태종대, 자동차극장, 흰여울문화마을, 깡깡이예술마을',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191225145805369_thumbL',
      title: '구 백제병원',
    },
  ];

  const talkList = [
    {
      profileImg: avatar,
      id: '부기몬 마스터',
      txt: '스탬프북 완성했다',
      writeDate: '2023-10-26 16:57:50',
    },
    {
      profileImg: avatar,
      id: '부기부기',
      txt: '여행 좋아',
      writeDate: '2023-11-12 13:24:20',
    },
    {
      profileImg: avatar,
      id: '부기 좋아',
      txt: '놀러가야지',
      writeDate: '2023-08-29 10:20:34',
    },
  ];

  return (
    <div>
      <Header />

      <Wrap>
        <Title>{state.title}</Title>

        <div>
          <StampBoardBox ref={divRef}>
            {stampList.map((stamp, i) => {
              return (
                <Stamp
                  imgSrc={stamp.imgSrc}
                  imgAlt={stamp.title + ' 이미지'}
                  title={stamp.title}
                  key={i}
                  onClick={onOpenPopup}
                />
              );
            })}
            {popupOn && <Popup />}
          </StampBoardBox>

          <MapBox>
            <Map />
          </MapBox>
        </div>

        <ButtonBar>
          <Button children={'공유'} $marginright />
          <Button children={'담기'} $marginright />
          <Button
            children={'스탬프북 이미지 다운로드'}
            onClick={() => {
              downloadHandler();
            }}
          />
          <StampBookLike>
            <StampBookLikeBtn>
              <img src={like} alt='좋아요' />
            </StampBookLikeBtn>
            <div>{state.likeCount}</div>
          </StampBookLike>
        </ButtonBar>

        <section className='comment_area'>
          <Title>댓글</Title>

          <InputBox>
            <input type='text' placeholder='공백 불가, 최대 250자 작성 가능' />
            <Button children={'등록'} />
          </InputBox>

          <CommentBox>
            {talkList.map((talk, i) => {
              return (
                <TalkBox
                  profileImg={talk.profileImg}
                  id={talk.id}
                  txt={talk.txt}
                  writeDate={talk.writeDate}
                  key={i}
                />
              );
            })}
          </CommentBox>

          <MoreBtn>
            <Button
              children={'더보기'}
              style={{
                marginTop: '10px',
              }}
            />
          </MoreBtn>
        </section>

        <CreateUserBox>
          <Title>스탬프북 작성자</Title>

          <TalkBox
            profileImg={avatar}
            nickname={state.nickname}
            description={state.description}
            stampbookRegdate={state.stampbookRegdate}
            margin={'20px 0'}
          />
        </CreateUserBox>
      </Wrap>
    </div>
  );
};

export default StampDetail;
