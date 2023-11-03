import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Components/Header';
import '../styles/stampDetail.css';
import like from '../images/like.png';
import avatar from '../images/avatar.png';
import Map from '../Components/Map';
import data from '../data.json';
import images from '../images/test.jpg';

const Stamp = styled.div`
  width: 150px;
  margin-right: 45px;
  margin-bottom: 30px;
  & > .stamp_img {
    background-color: var(--gray3);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
    overflow: hidden;
  }
  & > .stamp_imp > img {
    width: 200px;
  }
  & > .stamp_txt {
    text-align: center;
  }
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
  const [popupOn, setPopupOn] = useState(false);
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

  return (
    <div>
      <Header />

      <div className='wrap'>
        <div className='stamp_detail_title'>스탬프북1</div>

        <div>
          <div className='stamp_box'>
            {/* <div className='stamp'> */}
            <Stamp onClick={onOpenPopup}>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_thumbL'
                  alt='스탬프 이미지1'
                />
              </div>
              <div className='stamp_txt'>흰여울문화마을</div>
            </Stamp>
            {popupOn ? <Popup /> : ''}
            {/* </div> */}

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222171209005_thumbL'
                  alt='스탬프 이미지2'
                />
              </div>
              <div className='stamp_txt'>깡깡이 예술마을</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222175627506_thumbL'
                  alt='스탬프 이미지3'
                />
              </div>
              <div className='stamp_txt'>국립해양박물관</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222180829962_thumbL'
                  alt='스탬프 이미지4'
                />
              </div>
              <div className='stamp_txt'>태종대</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222181829937_thumbL'
                  alt='스탬프 이미지5'
                />
              </div>
              <div className='stamp_txt'>죽성성당</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222185645736_thumbL'
                  alt='스탬프 이미지6'
                />
              </div>
              <div className='stamp_txt'>아홉산 숲</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222190823385_thumbL'
                  alt='스탬프 이미지7'
                />
              </div>
              <div className='stamp_txt'>해동용궁사</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191224093809621_thumbL'
                  alt='스탬프 이미지8'
                />
              </div>
              <div className='stamp_txt'>임랑해수욕장</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191224171115847_thumbL'
                  alt='스탬프 이미지9'
                />
              </div>
              <div className='stamp_txt'>문화공감 수정, 초량1941</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20230525134753245_thumbL'
                  alt='스탬프 이미지10'
                />
              </div>
              <div className='stamp_txt'>
                영도, 태종대, 자동차극장, 흰여울문화마을, 깡깡이예술마을
              </div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191225145805369_thumbL'
                  alt='스탬프 이미지11'
                />
              </div>
              <div className='stamp_txt'>구 백제병원</div>
            </div>
          </div>

          <div className='stamp_map'>
            <Map />
          </div>
        </div>

        <div className='btn_bar'>
          <button>공유</button>
          <button>담기</button>
          <div className='stamp_book_like'>
            <div className='like_btn'>
              <img src={like} alt='좋아요' />
            </div>
            <div>13</div>
          </div>
        </div>

        <section className='comment_area'>
          <div className='title'>댓글</div>

          <div className='comment_input'>
            <input type='text' placeholder='공백 불가, 최대 250자 작성 가능' />
            <button>등록</button>
          </div>

          <div className='comment_list'>
            <div className='comment'>
              <div className='profile'>
                <img src={avatar} alt='' />
              </div>
              <div className='contents'>
                <div className='comment_id'>부기몬 마스터</div>
                <div className='comment_txt'>스탬프북 완성했다</div>
              </div>
              <div className='comment_write_date'>2023-10-26 16:57:50</div>
            </div>
            <div className='comment'>
              <div className='profile'>
                <img src={avatar} alt='' />
              </div>
              <div className='contents'>
                <div className='comment_id'>부기부기</div>
                <div className='comment_txt'>여행 좋아</div>
              </div>
              <div className='comment_write_date'>2023-11-12 13:24:20</div>
            </div>
            <div className='comment'>
              <div className='profile'>
                <img src={avatar} alt='' />
              </div>
              <div className='contents'>
                <div className='comment_id'>부기 좋아</div>
                <div className='comment_txt'>놀러가야지</div>
              </div>
              <div className='comment_write_date'>2023-08-29 10:20:34</div>
            </div>
          </div>

          <div className='more_comment'>
            <button>더보기</button>
          </div>
        </section>

        <div className='create_user_comment'>
          <div className='title'>스탬프북 작성자</div>

          <div className='comment'>
            <div className='profile'>
              <img src={avatar} alt='' />
            </div>
            <div className='contents'>
              <div className='comment_id'>부기몬 크리에이터</div>
              <div className='comment_txt'>
                이 스탬프북을 다 모으신다면 당신은 진정한 부기몬 마스터가
                된답니다
              </div>
            </div>
            <div className='comment_write_date'>2023-10-27 11:13:12</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampDetail;
