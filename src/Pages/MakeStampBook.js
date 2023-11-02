import Header from '../Components/Header';
import React, { useState } from 'react';
import Map from '../Components/Map';
import styled from 'styled-components';
import '../globalStyle';
import Button from '../Components/Button';

const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
  > div > div {
    float: left;
  }
`;

const StampBookTitle = styled.div`
  font-size: var(--big);
  font-weight: bold;
  margin: 50px 0 20px;
`;

const StampBoard = styled.div`
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

const StampDetailTxt = styled.div`
  clear: both;
  padding: 20px 0;
`;
const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달을 최상위로 올림 */
`;

const MapPopup = styled.div`
  position: absolute;
  top: 5%;
  left: 25%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

  /* 임시 지정 */
  width: 600px;
  height: 700px;

  /* 초기에 약간 아래에 배치 */
  transform: translate(-50%, -40%);

  white-space: normal;
  border-radius: 10px;
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
  top: 1%;
  left: 93%;
  display: inline-block;
  border: 2px solid var(--gray2);
  border-radius: 4px;
  background-color: #ffffff;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: var(--yellow);
    border: 2px solid var(--light-blue);
  }
  z-index: 1001; /* X 버튼을 모달과 배경 위로 올림 */
`;

const SearchBar = styled.input`
  width: 400px;
  height: 40px;
  position: absolute;
  top: 5%;
  left: 5%;
  border-radius: 10px;
`;

const Zip = styled.div`
  width: 350px;
  height: 350px;
  position: absolute;
  top: 15%;
  left: 5%;
`;
const Container = styled.div`
  width: 530px;
  height: 500px;
  overflow: auto; /* 좌우 스크롤을 제거합니다. */
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column; /* 아이템들을 수직으로 배치합니다. */
  border-radius: 10px;
`;

const Content = styled.div`
  height: 530px; /* .container와 같은 높이로 설정하여 수직 스크롤만 유지합니다. */
  width: 500px;
  /* 내용 및 스타일 설정 */
  border-radius: 10px;
`;

const Item = styled.div`
  width: 480px;
  height: 80px;
  padding: 10px; /* 각 아이템의 패딩 설정 */
  /* border: 1px solid #ddd;  각 아이템 테두리 설정 */
  margin: 5px 0; /* 각 아이템의 상단 및 하단 마진 설정 */
  text-align: left;
`;

const ThumnailBOX = styled.div`
  width: 150px;
  height: 100px;
  position: relative;
  top: -71%;
  left: 71%;
  background-image: url('https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_thumbL');
  background-size: cover; /* 이미지를 가능한 최대 크기로 채우기 */
  background-position: center; /* 이미지를 중앙에 위치시키기 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  border-radius: 10px;
`;

const MakeStampBook = () => {
  const [openMap, closeMap] = useState(false);

  const onOpenMap = () => {
    closeMap(!openMap);
  };
  const Popup = () => {
    return (
      <Modal>
        <PopupBg />

        <MapPopup>
          <CloseBtn onClick={closeMap}> x</CloseBtn>
          <SearchBar type='text' placeholder='주소 검색' />
          <Button
            style={{
              position: 'absolute',
              top: '5%',
              left: '80%',
              textAlign: 'center',
            }}
          >
            찾기
          </Button>
          <Zip>
            <Container>
              <Content>
                <Item>
                  <p>장소명</p>
                  <p>주소</p>
                  <ThumnailBOX />
                </Item>
                <Item>
                  <p>장소명</p>
                  <p>주소</p>
                  <ThumnailBOX />
                </Item>
                <Item>
                  <p>장소명</p>
                  <p>주소</p>
                </Item>
                <Item>
                  <p>장소명</p>
                  <p>주소</p>
                </Item>
                <Item>아이템 5</Item>
                <Item>아이템 6</Item>
                <Item>아이템 7</Item>
                <Item>아이템 8</Item>
                <Item>아이템 9</Item>
                <Item>아이템 10</Item>
              </Content>
            </Container>
          </Zip>
          <Button
            type='submit'
            style={{
              position: 'absolute',
              top: '90%',
              left: '45%',
              textAlign: 'center',
            }}
          >
            등록
          </Button>
        </MapPopup>
      </Modal>
    );
  };

  return (
    <div>
      <Header />

      <Wrap>
        <StampBookTitle>타이틀을 작성하세요</StampBookTitle>

        <div>
          <StampBoard>
            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_thumbL'
                  alt='스탬프 이미지1'
                />
              </div>
              <div className='stamp_txt' onClick={onOpenMap}>
                {openMap ? <Popup /> : ''}
                흰여울문화마을
              </div>
            </div>
          </StampBoard>

          <div className='stamp_map'>
            <Map />
          </div>
        </div>

        <StampDetailTxt>상세설명 작성</StampDetailTxt>
      </Wrap>
    </div>
  );
};

export default MakeStampBook;
