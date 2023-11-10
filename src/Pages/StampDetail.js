import CommentBox from '../Components/CommentBox';
import Header from '../Components/Header';
import like from '../images/like.png';
import avatar from '../images/avatar.png';
import Map from '../Components/Map';
import { useLocation } from 'react-router-dom';
import Button from '../Components/Button';
import styled from 'styled-components';
import Stamp from '../Components/Stamp';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import CreatorMsgBox from '../Components/CreatorMsgBox';
import boogi from '../boogi';

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

const StampDetail = () => {
  const divRef = useRef();
  const { state } = useLocation();
  const [data, setData] = useState();
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState();
  const [post, setPost] = useState(false);

  useEffect(() => {
    boogi
      .get(`/boogimon/stampbook/stampbook.jsp?stampbookId=${state.id}`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  useEffect(() => {
    boogi
      .get(
        `/boogimon/stampbook/comment.jsp?command=list&stampbookId=${state.id}`
      )
      .then((response) => {
        setCommentList(response.data);
        console.log('댓글 불러오기 완료!');
      });
  }, [post]);

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
            stampbookId: state.id,
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

  return (
    <div>
      <Header />

      <Wrap>
        <Title>{data?.stampbook.title}</Title>

        <div>
          <StampBoardBox ref={divRef}>
            {data?.stampbook.stampList.map((stamp, i) => {
              return (
                <Stamp
                  src={stamp.thumbnail}
                  alt={stamp.placeName + ' 이미지'}
                  title={stamp.placeName}
                  key={i}
                  placeid={stamp.placeId}
                />
              );
            })}
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
            />
            <Button children={'등록'} onClick={commentPost} />
          </InputBox>

          <CommentListBox>
            {commentList?.commentList.map((talk, i) => {
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
