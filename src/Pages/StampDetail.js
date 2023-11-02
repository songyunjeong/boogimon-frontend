import Header from '../Components/Header';
import like from '../images/like.png';
import avatar from '../images/avatar.png';
import Map from '../Components/Map';
import { useLocation } from 'react-router-dom';
import Button from '../Components/Button';
import styled from 'styled-components';
import Stamp from '../Components/Stamp';
import TalkBox from '../Components/TalkBox';

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
  left: 200px;
  > div:first-child {
    margin-right: 10px;
  }
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
  const { state } = useLocation();

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
          <StampBoardBox>
            {stampList.map((stamp, i) => {
              return (
                <Stamp
                  imgSrc={stamp.imgSrc}
                  imgAlt={stamp.title + ' 이미지'}
                  title={stamp.title}
                  key={i}
                />
              );
            })}
          </StampBoardBox>

          <MapBox>
            <Map />
          </MapBox>
        </div>

        <ButtonBar>
          <Button children={'공유'} marginright='true' />
          <Button children={'담기'} />
          <StampBookLike>
            <StampBookLikeBtn>
              <img src={like} alt='좋아요' />
            </StampBookLikeBtn>
            <div>{state.like}</div>
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
            id={'부기몬 크리에이터'}
            txt={
              '이 스탬프북을 다 모으신다면 당신은 진정한 부기몬 마스터가 된답니다'
            }
            writeDate={'2023-10-27 11:13:12'}
            margin={'20px 0'}
          />
        </CreateUserBox>
      </Wrap>
    </div>
  );
};

export default StampDetail;
