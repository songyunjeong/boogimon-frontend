import Header from '../Components/Header';
import like from '../images/like.png';
import avatar from '../images/avatar.png';
import Map from '../Components/Map';
import { useLocation } from 'react-router-dom';
import Button from '../Components/Button';
import styled from 'styled-components';
import Stamp from '../Components/Stamp';
import TalkBox from '../Components/TalkBox';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import axios from 'axios';

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

const StampDetail = () => {
  const divRef = useRef();
  const { state } = useLocation();
  const [bookData, setBookData] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/boogimon/stampbook/stampbook.jsp?stampbookId=${state.id}`
      )
      .then((response) => {
        setBookData(response.data);
      });
  }, []);

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
            {bookData?.stampbook.stampList.map((stamp, i) => {
              return (
                <Stamp
                  imgsrc={stamp.thumbnail}
                  imgalt={stamp.placeName + ' 이미지'}
                  title={stamp.placeName}
                  key={i}
                  id={i + 1}
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
