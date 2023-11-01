import React, { useState } from 'react';
import styled from 'styled-components';
import '../styles/popup_card.css';
import '../globalStyle';
import boogicard from '../images/bogimon_card_b.png';
import profile from '../images/머리만(색깔).png';
import Header from '../Components/Header';
import StampBook from '../Components/StampBook';
import html2canvas from 'html2canvas';

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
  width: 20px;
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

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const BoogiCardImg = styled.img`
  width: 300px;
  height: 400px;
  position: absolute;
  left: 12%;
  top: 5%;
  z-index: 1; /* 보다 낮은 z-index 값을 설정 */
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
  left: 27%;
  top: 7%;
  z-index: 2; /* 더 높은 z-index 값을 설정하여 앞으로 가져옵니다 */
`;

const RandomImg = styled.p`
  width: 240px;
  height: 150px;
  position: absolute;
  left: 20%;
  top: 14%;
  z-index: 2; /* 더 높은 z-index 값을 설정하여 앞으로 가져옵니다 */
`;

const CardContent = styled.p`
  width: 240px;
  height: 180px;

  position: absolute;
  left: 20%;
  top: 47%;
  z-index: 2; /* 더 높은 z-index 값을 설정하여 앞으로 가져옵니다 */
`;

const Mypage = styled.div`
  position: relative;
  height: 250px;
  width: 1280px;
  margin: auto;
  background-color: pink;
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
    width: calc(100% / 3);
    padding-right: 25px;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
  > div:nth-child(3n) {
    padding-right: 0;
  }
`;

const ProfileImg = styled.div`
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 25%;
  left: 80px;
  overflow: hidden;
  border: 2px solid black;
  background-image: url(${profile});
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

const ColorBtn = styled.button`
  position: absolute;
  top: 60%;
  left: 20px;
  height: 50px;
  width: 200px;
  background-color: transparent;
  color: var(--black); /* 텍스트 색상 설정 */
  font-size: var(--regular);
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

  &:before {
    content: '회원정보 수정';
    display: block;
    transform: skewX(20deg); /* 텍스트를 반대로 기울이지 않습니다 */
  }
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
  top: 70%;
  left: 15%;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const Exp = styled.p`
  position: absolute;
  font-size: var(--regular);
  top: 70%;
  left: 85%;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const My = () => {
  const [openCard, closeCard] = useState(false);

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
      const cardElement = document.querySelector('.popup');
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
        <div className='popup'>
          <CloseBtn onClick={onOpenCard}> x</CloseBtn>
          <CardName>광안리</CardName>
          <RandomImg>랜덤이미지</RandomImg>
          <CardContent>카드내용? 축하드립니다~</CardContent>
          <BoogiCardImg src={boogicard} alt='부기카드' />
          <Download>
            <DownloadBtn onClick={saveAsImage}></DownloadBtn>
          </Download>
        </div>
      </Modal>
    );
  };

  const View = () => {
    return (
      <Mypage>
        <ProfileImg />
        <MyproFile>
          <NickName>부기몬하이</NickName>
          <ColorBtn />
          <CompleteBtn>
            <OpenBtn onClick={onOpenCard}>부기몬 카드</OpenBtn>
            {openCard ? <Popup /> : ''}
          </CompleteBtn>
        </MyproFile>
        <MyProgress>
          <Rank>🏅1 th</Rank>
          <Level>LV.25</Level>
          <Progress value='70' min='0' max='100' />
          <StampComplete>📍777</StampComplete>
          <UserLike>❤️777</UserLike>
          <Exp>EXP.7777</Exp>
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
