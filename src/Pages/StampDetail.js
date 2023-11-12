import CommentBox from '../Components/CommentBox';
import Header from '../Components/Header';
import likeFullImg from '../images/like_full.png';
import likeImg from '../images/like.png';
import avatar from '../images/avatar.png';
import Map from '../Components/Map';
import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '../Components/Button';
import styled from 'styled-components';
import Stamp from '../Components/Stamp';
import { useContext, useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import CreatorMsgBox from '../Components/CreatorMsgBox';
import boogi from '../boogi';
import { AppContext } from '../App';

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

const CommentListBox = styled.div``;

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

const PlaceImg = styled.div`
  width: 800px;
  height: 300px;
  border-radius: 10px 10px 0 0;
`;

const Img = styled(PlaceImg)`
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
  const { id } = useParams();
  const { isLogin } = useContext(AppContext);
  const { pathname } = useLocation();
  const [popupOn, setPopupOn] = useState(false);
  const [data, setData] = useState();
  const [userPick, setUserPick] = useState();
  const [likeBtn, setLikeBtn] = useState();
  const [comment, setComment] = useState('');
  const [commentDataList, setCommentDataList] = useState();
  const [post, setPost] = useState(false);
  const [isValid, setIsValid] = useState(false);

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

  const commentPost = () => {
    if (window.sessionStorage.getItem('userId')) {
      setPost(false);

      boogi
        .post('/boogimon/stampbook/comment.jsp', null, {
          params: {
            stampbookId: id,
            userId: window.sessionStorage.getItem('userId'),
            comment: comment,
          },
        })
        .then(() => {
          console.log('댓글 작성 완료');
          setPost(true);
          setComment('');
        });
    } else {
      console.log('로그인 해주세요.');
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
            <PlaceImg>
              <Img />
            </PlaceImg>

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

  useEffect(() => {
    if (isLogin) {
      boogi
        .get(`/boogimon/stampbook/stampbook.jsp?stampbookId=${id}`)
        .then((response) => {
          setData(response.data);
          console.log(data?.stampbook.isLike);
        });
    } else {
      boogi
        .get(`/boogimon/stampbook/stampbook.jsp?stampbookId=${id}`)
        .then((response) => {
          setData(response.data);
        });
    }
  }, []);

  useEffect(() => {
    boogi
      .get(`/boogimon/stampbook/comment.jsp?command=list&stampbookId=${id}`)
      .then((response) => {
        setCommentDataList(response.data);
      });
  }, [post]);

  useEffect(() => {
    boogi
      .get(
        'http://localhost:8080/boogimon/stampbook/stamp.jsp?command=list&stampbookId=0&userId=boogi@boogimon.com'
      )
      .then((response) => {
        setUserPick(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      <Header />

      <Wrap>
        <Title>{data?.stampbook.title}</Title>

        <div>
          <StampBoardBox ref={divRef}>
            {pathname === '/my'
              ? data?.stampbook.stampList.map((stamp, i) => {
                  return (
                    <Stamp
                      src={stamp.thumbnail}
                      alt={stamp.placeName + ' 이미지'}
                      title={stamp.placeName}
                      placeid={stamp.placeId}
                      key={i}
                      onClick={onOpenPopup}
                    />
                  );
                })
              : data?.stampbook.stampList.map((stamp, i) => {
                  return (
                    <Stamp
                      src={stamp.thumbnail}
                      alt={stamp.placeName + ' 이미지'}
                      title={stamp.placeName}
                      placeid={stamp.placeId}
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
              <img src={likeBtn ? likeFullImg : likeImg} alt='좋아요' />
            </StampBookLikeBtn>
            <div>{data?.stampbook.likeCount}</div>
          </StampBookLike>
        </ButtonBar>

        <section className='comment_area'>
          <Title>댓글</Title>

          <InputBox>
            <input
              type='text'
              placeholder='공백 불가, 최대 250자 작성 가능'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              onKeyUp={(e) =>
                e.target.value.length > 0 ? setIsValid(true) : setIsValid(false)
              }
            />
            <Button
              children={'등록'}
              onClick={commentPost}
              disabled={isValid ? false : true}
            />
          </InputBox>

          <CommentListBox>
            {commentDataList?.commentList.map((talk, i) => {
              return (
                <CommentBox
                  profileImg={talk.profileImg}
                  nickname={talk.nickname}
                  comment={talk.comment}
                  writeDate={talk.writeDate}
                  key={i}
                />
              );
            })}
          </CommentListBox>

          {data?.stampbook.commentList.length > 5 && (
            <MoreBtn>
              <Button
                children={'더보기'}
                style={{
                  marginTop: '10px',
                }}
              />
            </MoreBtn>
          )}
        </section>

        <CreateUserBox>
          <Title>스탬프북 작성자</Title>

          <CreatorMsgBox
            profileImg={
              data?.stampbook.profileImg ? data?.stampbook.profileImg : avatar
            }
            nickname={data?.stampbook.nickname}
            description={data?.stampbook.description}
            stampbookRegdate={data?.stampbook.stampbookRegdate}
            margin={'20px 0'}
          />
        </CreateUserBox>
      </Wrap>
    </div>
  );
};

export default StampDetail;
