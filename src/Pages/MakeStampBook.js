import { useRef } from 'react';
import Button from '../Components/Button';
import Header from '../Components/Header';
import React, { useState } from 'react';
import Map from '../Components/Map';
import styled from 'styled-components';
import '../globalStyle';
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

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px 0 20px;
`;

const StampBookTitle = styled.input`
  width: 300px;
  height: 50px;
  border: 2px solid var(--gray2);
  border-radius: 5px;
  text-align: start;
  padding: 0 20px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const TitleButtonBox = styled.div`
  display: flex;
`;

const StampBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  background-color: var(--gray1);
  border-radius: 10px;
  padding: 50px 80px 40px;
  box-sizing: border-box;
  margin-right: 30px;
  > div:nth-child(3n) {
    margin-right: 0;
  }
`;

const NewStamp = styled.div`
  margin-right: 45px;
  margin-bottom: 30px;
`;

const NewStampImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray3);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
  overflow: hidden;
  > button {
    width: 150px;
    height: 150px;
    border: none;
    background-color: transparent;
    font-size: var(--big);
    color: white;
  }
  > button:hover {
    cursor: pointer;
  }
`;

const NewStampBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  > button:first-child {
    margin-bottom: 5px;
  }
`;

const MapBox = styled.div`
  width: 550px;
  border-radius: 12px;
  overflow: hidden;
`;

const StampDetailTxt = styled.textarea`
  clear: both;
  width: 1280px;
  height: 200px;
  border: 2px solid var(--gray2);
  border-radius: 5px;
  text-align: start;
  padding: 20px;
  box-sizing: border-box;
  margin: 30px 0;
  resize: none;
  &:focus {
    outline: none;
  }
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
  position: fixed; /* 화면 크기에 관계없이 위치 고정 */
  top: 50%; /* 화면 상단에서 50% 위치에 배치 */
  left: 50%; /* 화면 왼쪽에서 50% 위치에 배치 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 변환 */
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
  width: 40px;
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
  width: 490px;
  height: 80px;
  padding: 10px; /* 각 아이템의 패딩 설정 */
  /* border: 1px solid #ddd;  각 아이템 테두리 설정 */
  margin: 5px 0; /* 각 아이템의 상단 및 하단 마진 설정 */
  text-align: left;
  border-radius: 10px;
`;

const ItemDetail = styled.div`
  width: 300px;
  height: 80px;
  padding: 10px; /* 각 아이템의 패딩 설정 */
  /* border: 1px solid #ddd;  각 아이템 테두리 설정 */
  margin: 5px 0; /* 각 아이템의 상단 및 하단 마진 설정 */
  text-align: left;
  border-radius: 10px;
`;

const ThumnailBOX = styled.div`
  width: 150px;
  height: 100px;
  position: relative;
  top: -150%;
  left: 71.5%;
  /* background-image: url('https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_thumbL'); */
  background-size: cover; /* 이미지를 가능한 최대 크기로 채우기 */
  background-position: center; /* 이미지를 중앙에 위치시키기 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  border-radius: 10px;
`;

const MakeStampBook = () => {
  const [MapPlace, setMapPlace] = useState(false);

  const [apiData, setApiData] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    if (selectedItem === index) {
      // 이미 선택한 아이템을 클릭하면 체크를 해제
      setSelectedItem(null);
    } else {
      setSelectedItem(index);
    }
  };

  const clearSelectedItem = () => {
    setSelectedItem(null);
  };

  const onSearch = () => {
    // 검색 버튼 클릭 시 API 요청 보내기
    const searchInput = document.querySelector('#searchInput').value;
    axios
      .get(
        `http://localhost:8080/boogimon/place.jsp?command=list&keyword=` +
          searchInput
      )
      .then((response) => {
        const apiData = response.data; // API 응답에서 데이터를 가져옴
        setApiData(apiData);
      });
  };

  const onOpenMap = () => {
    axios
      .get('http://localhost:8080/boogimon/place.jsp?command=list&keyword')
      .then((response) => {
        const apiData = response.data; // API 응답에서 데이터를 가져옴

        setApiData(apiData);
        setMapPlace(!MapPlace);
      });
  };
  const Popup = () => {
    const closeModal = () => {
      clearSelectedItem();
      setMapPlace(false); // 팝업을 닫음
    };

    return (
      <Modal>
        <PopupBg />

        <MapPopup>
          <CloseBtn onClick={closeModal}>닫기</CloseBtn>
          <SearchBar
            type='text'
            placeholder='주소 검색'
            id='searchInput'
            //onInput={(e) => setSearchText(e.target.value)}
          />
          <Button
            style={{
              position: 'absolute',
              top: '5%',
              left: '80%',
              textAlign: 'center',
            }}
            onClick={onSearch}
          >
            찾기
          </Button>
          <Zip>
            {apiData.searchList && apiData.searchList.length > 0 ? (
              <Container>
                <Content>
                  {apiData.searchList.map((item, index) => (
                    <Item
                      key={index}
                      onClick={() => handleItemClick(index)}
                      style={{
                        border:
                          selectedItem === index
                            ? '2px solid var(--yellow)'
                            : 'none',
                      }}
                    >
                      <ItemDetail>
                        <p>장소: {item.name}</p>
                        <p>주소: {item.addr}</p>
                      </ItemDetail>
                      <ThumnailBOX
                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                      />
                    </Item>
                  ))}
                </Content>
              </Container>
            ) : (
              <p>데이터가 없습니다.</p>
            )}
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

  const divRef = useRef();
  const [screenShot, setScreenShot] = useState(false);

  const downloadHandler = async (e) => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 1 });
      canvas.toBlob((blob) => {
        if (blob != null && screenShot) {
          saveAs(blob, 'stampBook.png');
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  return (
    <div>
      <Header />

      <Wrap>
        <TitleBox>
          <StampBookTitle placeholder='타이틀을 작성해주세요.' />

          <TitleButtonBox>
            <Button children={'등록'} marginright='true' />
            <Button children={'취소'} />
          </TitleButtonBox>
          {MapPlace ? <Popup /> : ''}
        </TitleBox>

        <div>
          <StampBoard ref={divRef}>
            {!screenShot && (
              <NewStamp>
                <NewStampImgBox>
                  <button>+</button>
                </NewStampImgBox>
                <NewStampBtnBox>
                  <Button children={'장소등록'} onClick={onOpenMap} />
                  <Button children={'삭제'} />
                </NewStampBtnBox>
              </NewStamp>
            )}
          </StampBoard>

          <MapBox>
            <Map />
          </MapBox>
        </div>

        <StampDetailTxt placeholder='상세설명을 작성해주세요.' />

        <p>스탬프북 이미지</p>
        <p
          style={{
            marginBottom: '10px',
            color: 'var(--gray4)',
            fontSize: 'var(--small)',
          }}
        >
          ⬇︎ 아래에서 스탬프북 이미지를 다운로드 할 수 있습니다.
        </p>

        <Button
          children={'스탬프북 이미지 다운로드'}
          $marginright
          onClick={() => {
            setScreenShot(!screenShot);
            downloadHandler();
          }}
          style={{ display: 'block' }}
        />
      </Wrap>
    </div>
  );
};

export default MakeStampBook;
