import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../globalStyle';
import boogicard from '../images/bogimon_card_b.png';
import Header from '../Components/Header';
import StampBook from '../Components/StampBook';
import Button from '../Components/Button';
import html2canvas from 'html2canvas';
import axios from 'axios';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;
const PopupBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const CloseBtn = styled.button`
  position: absolute;
  width: 40px;
  height: 20px;
  left: 90%;
  border: 2px solid var(--gray2);
  border-radius: 4px;
  background-color: #ffffff;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: var(--yellow);
    border: 2px solid var(--light-blue);
  }
`;
const OpenBtn = styled.button`
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

const BoogiCardContainer = styled.div`
  width: 290px;
  height: 400px;
  position: absolute;
  left: 15%;
  top: 5%;
  z-index: 2; /* 보다 낮은 z-index 값을 설정 */
  background-image: url(${boogicard});
  background-size: cover; /* 이미지를 컨테이너에 맞게 조절 */
  background-position: center; /* 이미지를 가운데 정렬 */
`;

const CardPopup = styled.div`
  position: fixed; /* 화면 크기에 관계없이 위치 고정 */
  top: 50%; /* 화면 상단에서 50% 위치에 배치 */
  left: 50%; /* 화면 왼쪽에서 50% 위치에 배치 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 변환 */
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

  /* 임시 지정 */
  width: 400px;
  height: 500px;

  /* 초기에 약간 아래에 배치 */
  transform: translate(-50%, -40%);

  white-space: normal;

  border-radius: 10px;
`;

const Download = styled.div`
  position: absolute;
  top: 85%;
  left: 40%;
  width: 80px;
  height: 30px;
`;

const DownloadBtn = styled.button`
  width: 100px;
  height: 40px;
  position: absolute;
  left: -15%;
  top: 55%;
  background-color: transparent;
  color: var(--black); /* 텍스트 색상 설정 */
  font-size: var(--small);
  text-decoration: none solid rgb(21, 23, 26);
  vertical-align: middle;
  padding: 10px 20px;
  cursor: pointer;
  outline: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); /* 그림자 효과 추가 */
  border: 3px solid transparent; /* 테두리 색상 초기화 */
  border-image: linear-gradient(45deg, #72bab3, #eccf63) 1; /* 그라데이션 테두리 추가 */
  border-image-slice: 1;
  transform: skew(-20deg);
  &::before {
    content: '다운로드';
    display: block;
    transform: skewX(20deg); /* 텍스트를 반대로 기울이지 않습니다 */
  }
`;

const CardName = styled.p`
  width: 130px;
  height: 25px;
  position: absolute;
  left: 10%;
  top: 2%;
  z-index: 2; /* 더 높은 z-index 값을 설정하여 앞으로 가져옵니다 */
`;

const RandomImg = styled.div`
  width: 240px;
  height: 150px;
  position: absolute;
  left: 10%;
  top: 9%;
  z-index: 3; /* 더 높은 z-index 값을 설정하여 앞으로 가져옵니다 */
`;

const CardContent = styled.p`
  width: 260px;
  height: 180px;

  position: absolute;
  left: 7%;
  top: 52%;
  z-index: 3; /* 더 높은 z-index 값을 설정하여 앞으로 가져옵니다 */
`;

const Mypage = styled.div`
  position: relative;
  height: 250px;
  width: 1280px;
  margin: auto;
  border-radius: 10px;
  border: 1px solid var(--gray2);
`;

const CompleteBtn = styled.div`
  text-align: center;
  & > button {
    display: inline-block;
    border: 2px solid var(--gray2);
    border-radius: 4px;
    background-color: #ffffff;
    padding: 8px 25px;
    box-sizing: border-box;
  }
  & > button:hover {
    cursor: pointer;
    background-color: var(--yellow);
    border: 2px solid var(--light-blue);
  }
`;

const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const Sort = styled.select`
  width: 100px;
  border: 1px solid var(--gray2);
  border-radius: 5px;
  padding: 5px 8px;
  box-sizing: border-box;
  margin-top: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const StampBookBox = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  > div {
    margin-right: 25px;
    margin-bottom: 30px;
  }
  > div:nth-child(3n) {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

const MyImg = styled.div`
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 25%;
  left: 80px;
  overflow: hidden;
  background-color: var(--gray2);
`;

const MyProfileImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`;

const MyproFile = styled.div`
  width: 240px;
  height: 200px;
  position: absolute;
  top: 10%; /* 원하는 위쪽 위치 (예: 100px) */
  left: 250px; /* 원하는 왼쪽 위치 (예: 200px) */
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const NickName = styled.p`
  position: absolute;
  font-size: var(--big);
  top: 20%;
`;

const MyProgress = styled.div`
  width: 670px;
  height: 200px;
  position: absolute;
  top: 10%; /* 원하는 위쪽 위치 (예: 100px) */
  left: 550px; /* 원하는 왼쪽 위치 (예: 200px) */
`;

const Rank = styled.p`
  position: absolute;
  font-size: var(--big);
  top: 40px;
  left: 5%;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const Level = styled.p`
  position: absolute;
  font-size: var(--big);
  top: 40px;
  left: 85%;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const Progress = styled.progress`
  position: absolute;
  top: 50%;
  left: 5%;
  width: 600px;
  appearance: none;
  &::-webkit-progress-bar {
    /* progressbar의 배경이 되는 요소 */
    background: #f0f0f0;
    border-radius: 10px;
    box-shadow: inset 3px 3px 10px #ccc;
  }
  &::-webkit-progress-value {
    /* 텍스트를 가운데 정렬 */
    border-radius: 10px;
    background: var(--magenta);
    background: -webkit-linear-gradient(
      to right,
      var(--light-blue),
      var(--magenta)
    );
    background: linear-gradient(to right, var(--light-blue), var(--magenta));
  }
`;

const StampComplete = styled.p`
  position: absolute;
  font-size: var(--regular);
  top: 70%;
  left: 5%;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const UserLike = styled.p`
  position: absolute;
  font-size: var(--regular);
  top: 80%;
  left: 5%;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const Exp = styled.p`
  position: absolute;
  font-size: var(--regular);
  top: 70%;
  left: 82%;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;
const SearchBar = styled.input`
  width: 400px;
  height: 40px;
  position: absolute;
  border-radius: 10px;
`;

const My = () => {
  const [openCard, closeCard] = useState(false);
  const [apiData, setApiData] = useState({ user: [] });

  const stampBookList = [
    {
      title: '스탬프북1',
      like: '30',
    },
    {
      title: '스탬프북2',
      like: '22',
    },
    {
      title: '스탬프북3',
      like: '20',
    },
    {
      title: '스탬프북4',
      like: '13',
    },
    {
      title: '스탬프북5',
      like: '5',
    },
  ];

  const onOpenCard = () => {
    closeCard(!openCard);
  };
  const Popup = () => {
    const saveAsImage = () => {
      const cardElement = document.querySelector('.CardPopup');
      html2canvas(cardElement).then((canvas) => {
        // 사용자로부터 파일 이름을 입력받기 위한 프롬프트 다이얼로그
        const filename = window.prompt(
          'Enter a filename',
          'custom_image_name.png'
        );

        // 사용자가 취소 버튼을 누르면 null이 반환되므로 확인
        if (filename !== null) {
          const link = document.createElement('a');
          link.download = filename; // 사용자가 입력한 파일 이름 설정
          link.href = canvas.toDataURL();
          link.click();
        }
      });
    };

    return (
      <Modal>
        <PopupBg />
        <CardPopup>
          <CloseBtn onClick={onOpenCard} data-html2canvas-ignore='true'>
            {' '}
            닫기
          </CloseBtn>
          <BoogiCardContainer className='CardPopup'>
            <CardName>광안리</CardName>
            <RandomImg>랜덤이미지</RandomImg>
            <CardContent>카드내용? 축하드립니다~</CardContent>
          </BoogiCardContainer>
          <Download>
            <DownloadBtn
              onClick={saveAsImage}
              data-html2canvas-ignore='true'
            ></DownloadBtn>
          </Download>
        </CardPopup>
      </Modal>
    );
  };

  const admin = () => {
    const userSearch = document.querySelector('#userSearch').value;
    axios
      .get('/boogimon/user/user.jsp?userId=' + userSearch)
      .then((response) => {
        const apiData = response.data; // API 응답에서 데이터를 가져옴

        setApiData(apiData);
      });
  };

  const View = () => {
    return (
      <Mypage>
        <SearchBar
          type='text'
          placeholder='아이디 검색'
          id='userSearch'
          //onInput={(e) => setSearchText(e.target.value)}
        />
        <Button
          style={{
            position: 'absolute',
            left: '32%',
            textAlign: 'center',
          }}
          onClick={admin}
        >
          아이디검색
        </Button>
        <MyImg>
          <MyProfileImg src={apiData.user.profileImg} alt='프로필이미지' />
        </MyImg>
        <MyproFile>
          <NickName>{apiData.user.nickname}</NickName>
          <Link to='/edituserinfo'>
            <Button
              style={{
                position: 'absolute',
                top: '70%',
                textAlign: 'center',
              }}
            >
              회원정보 수정
            </Button>
          </Link>
          <CompleteBtn>
            <OpenBtn onClick={onOpenCard}>부기몬 카드</OpenBtn>
            {openCard ? <Popup /> : ''}
          </CompleteBtn>
        </MyproFile>
        <MyProgress>
          <Rank>🏅1 th</Rank>
          <Level>
            LV.
            {apiData.user.exp < 100
              ? 1
              : Math.floor(apiData.user.exp / 100) + 1}
          </Level>
          <Progress value={apiData.user.exp % 100} min='0' max='100' />
          <StampComplete>모은 스탬프: 777</StampComplete>
          <UserLike>받은 좋아요수: 777</UserLike>
          <Exp>EXP.{apiData.user.exp % 100}/100</Exp>
        </MyProgress>
      </Mypage>
    );
  };

  return (
    <div>
      <Header />
      <View />
      <Wrap>
        <Sort>
          <option>인기순</option>
          <option>최신순</option>
          <option>가나다순</option>
        </Sort>

        <StampBookBox>
          {stampBookList.map((stampBook, i) => {
            return (
              <StampBook
                title={stampBook.title}
                like={stampBook.like}
                key={i}
              />
            );
          })}
        </StampBookBox>
      </Wrap>
    </div>
  );
};

export default My;
