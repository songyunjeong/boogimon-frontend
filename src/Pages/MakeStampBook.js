import Button from '../Components/Button';
import Header from '../Components/Header';
import React, { useState, useRef } from 'react';
import Map from '../Components/Map';
import styled from 'styled-components';
import '../globalStyle';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import boogi from '../boogi';
import { useNavigate } from 'react-router-dom';

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
  top: calc(50% - 700px / 2);
  left: calc(50% - 600px / 2);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

  /* 임시 지정 */
  width: 600px;
  height: 700px;

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

const SearchBar = styled.input`
  width: 400px;
  height: 40px;
  position: absolute;
  top: 20px;
  left: 30px;
  border-radius: 8px;
  border: 1px solid var(--gray2);
  padding: 20px;
  box-sizing: border-box;
`;

const Zip = styled.div`
  width: 350px;
  height: 350px;
  position: absolute;
  top: 80px;
  left: 30px;
`;

const Container = styled.div`
  width: 540px;
  height: 545px;
  overflow: auto; /* 좌우 스크롤을 제거합니다. */
  border: 1px solid var(--gray2);
  display: flex;
  flex-direction: column; /* 아이템들을 수직으로 배치합니다. */
  border-radius: 10px;
  box-sizing: border-box;
`;

const Content = styled.div`
  border-radius: 8px;
  padding: 0 10px;
`;

const Item = styled.div`
  position: relative;
  height: 120px;
  border: 1px solid var(--gray1);
  border-radius: 8px;
  box-sizing: border-box;
  margin: 10px 0; /* 각 아이템의 상단 및 하단 마진 설정 */
`;

const ItemDetail = styled.div`
  width: 300px;
  height: 80px;
  padding: 10px; /* 각 아이템의 패딩 설정 */
  /* border: 1px solid #ddd;  각 아이템 테두리 설정 */
  margin: 5px 0; /* 각 아이템의 상단 및 하단 마진 설정 */
  text-align: left;
`;

const ThumnailBOX = styled.div`
  width: 150px;
  height: 100px;
  position: absolute;
  top: 8px;
  right: 10px;
  /* background-image: url('https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_thumbL'); */
  background-size: cover; /* 이미지를 가능한 최대 크기로 채우기 */
  background-position: center; /* 이미지를 중앙에 위치시키기 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  border-radius: 8px;
`;

const SearchStampName = styled.p`
  width: 150px;
  font-size: var(--small);
  text-align: center;
  white-space: nowrap; /* 넘치는 텍스트를 한 줄에 표시 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 ...으로 표시 */
  margin-bottom: 5px;
`;

const MakeStampBook = () => {
  const [MapPlace, setMapPlace] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [placeName, setplaceName] = useState(null);
  const [stampList, setStampList] = useState([]); // 새로운 상태 추가

  const handleItemClick = (index) => {
    if (selectedItem === index) {
      // 이미 선택한 아이템을 클릭하면 체크를 해제
      setSelectedItem(null);
    } else {
      setSelectedItem(index);
    }
  };

  const onSearch = () => {
    // 검색 버튼 클릭 시 API 요청 보내기
    const searchInput = document.querySelector('#searchInput').value.trim();

    boogi
      .get(`/boogimon/place.jsp?command=list&keyword=` + searchInput)
      .then((response) => {
        const apiData = response.data; // API 응답에서 데이터를 가져옴
        setApiData(apiData);
      });
  };

  const onOpenMap = () => {
    boogi.get('/boogimon/place.jsp?command=list&keyword').then((response) => {
      const apiData = response.data; // API 응답에서 데이터를 가져옴

      setApiData(apiData);
      setMapPlace(!MapPlace);
    });
  };

  const Popup = () => {
    const closeModal = () => {
      setSelectedItem(null);
      setMapPlace(false); // 팝업을 닫음
    };

    const onRegister = () => {
      if (selectedItem !== null) {
        const selectedStamp = apiData.searchList[selectedItem];

        // 중복 체크
        if (stampList.some((stamp) => stamp.placeName === selectedStamp.name)) {
          alert('이미 선택한 장소입니다. 다른 장소를 선택해주세요.');
          return;
        }

        // 선택된 아이템에서 thumbnail 추출
        const thumbnailUrl = selectedStamp.thumbnail;

        // 추출한 thumbnail을 NewStampImgBox에 적용
        setThumbnail(thumbnailUrl);

        const placeName = selectedStamp.name;
        setplaceName(placeName);

        const placeId = selectedStamp.placeId;

        // 새로운 스탬프를 추가
        setStampList((prevStampList) => [
          ...prevStampList,
          {
            thumbnail: thumbnailUrl,
            placeName,
            placeId,
          },
        ]);
      }
      // 나머지 등록 버튼 클릭 시의 로직 추가
      setApiData([]);
      closeModal();
    };

    const onSearchKeyDown = (e) => {
      if (e.key === 'Enter') {
        onSearch();
      }
    };

    return (
      <Modal>
        <PopupBg />

        <MapPopup>
          <SearchBar
            type='text'
            placeholder='주소 검색'
            id='searchInput'
            onKeyDown={onSearchKeyDown} // Enter 키 이벤트 핸들링 추가
          />
          <Button
            style={{
              position: 'absolute',
              top: '23px',
              right: '30px',
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
                          selectedItem === index && '2px solid var(--yellow)',
                        cursor: 'pointer',
                      }}
                    >
                      <ItemDetail>
                        <p>{item.name}</p>
                        <p
                          style={{
                            color: 'var(--gray4)',
                            fontSize: 'var(--small)',
                            marginTop: '5px',
                          }}
                        >
                          {item.addr}
                        </p>
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
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: 'calc(50% - 158px / 2)',
            }}
          >
            <Button onClick={closeModal} $marginright>
              닫기
            </Button>
            <Button onClick={onRegister} type='submit'>
              등록
            </Button>
          </div>
        </MapPopup>
      </Modal>
    );
  };

  const divRef = useRef();
  const [screenShot, setScreenShot] = useState(false);
  const [stampBookTitle, setStampBookTitle] = useState(''); // 타이틀 상태와 업데이트 함수
  const [stampDetail, setStampDetail] = useState(''); // 상세설명 상태와 업데이트 함수
  const MAX_LENGTH_BEFORE_NEWLINE = 9;
  const navigate = useNavigate();

  const onTitleRegister = () => {
    if (stampList.length < 9) {
      // 9개 미만이면 알림 띄우고 종료
      alert('스탬프를 더 등록해주세요.(최소9개입니다.)');
      return;
    }

    // 9개 이상일 때는 정말 등록할 것인지 확인
    const confirmMessage = window.confirm('정말 등록하시겠습니까?');

    // 각 스탬프에 stampNo 부여
    const stampedStamps = stampList.map((stamp, index) => ({
      ...stamp,
      stampNo: index + 1,
    }));

    if (confirmMessage) {
      // 등록 로직 추가
      // 예를 들어, 서버에 스탬프북 정보를 전송하는 코드 등을 추가할 수 있습니다.
      const requestData = {
        params: {
          command: 'insert',
          userId: sessionStorage.getItem('userId'), // 사용자 아이디 값
          title: stampBookTitle, // 스탬프북 제목 값
          description: stampDetail, // 스탬프북 설명 값
          rStampList: JSON.stringify(stampedStamps), // 등록한 스탬프 목록을 JSON 문자열로 변환
          // rStampList: '[{"stampNo": 1,"placeId": 1 },{"stampNo": 2,"placeId":2},{"stampNo":3,"placeId": 3}]', // 등록한 스탬프 목록을 JSON 문자열로 변환
        },
      };

      // 서버로 POST 요청 보내기
      boogi
        .post('/boogimon/stampbook/stampbook.jsp', null, requestData)
        .then((response) => {
          // 성공적으로 등록되었을 때의 처리
          console.log('스탬프북이 성공적으로 등록되었습니다.', response);

          // 서버로부터 받은 스탬프 정보 업데이트
          const updatedStampList = response.data.stamps;

          // 서버에서 받은 스탬프 정보를 현재의 stampList에 업데이트
          setStampList(updatedStampList);

          // 나머지 초기화 로직 추가
          setStampBookTitle('');
          setStampDetail('');
          setThumbnail(null);
          setplaceName(null);

          // 등록하면 마이 페이지로 이동
          navigate('/my');
        })
        .catch((error) => {
          // 등록 실패 시의 처리
          console.error('스탬프북 등록에 실패했습니다.', error);
        });
    }
  };

  const onDelete = (index) => {
    // 클릭된 스탬프를 목록에서 제거
    setStampList((prevStampList) =>
      prevStampList.filter((_, stampIndex) => stampIndex !== index)
    );

    // 저장된 정보 초기화
    setThumbnail(null);
    setplaceName(null);
  };

  const onCancel = () => {
    // 취소 여부 확인
    const shouldCancel = window.confirm('취소하시겠습니까?');

    if (shouldCancel) {
      // 취소 버튼 클릭 시 스탬프 목록 초기화
      setStampList([]);

      // 타이틀과 상세설명 초기화
      setStampBookTitle('');
      setStampDetail('');

      // 나머지 초기화 로직 추가

      // 예를 들어, 저장된 정보 초기화
      setThumbnail(null);
      setplaceName(null);
    }
  };

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
          <StampBookTitle
            placeholder='타이틀을 작성해주세요.'
            value={stampBookTitle}
            onChange={(e) => setStampBookTitle(e.target.value)}
          />
          <TitleButtonBox>
            <Button children={'취소'} $marginright onClick={onCancel} />
            <Button children={'등록'} onClick={onTitleRegister} />
          </TitleButtonBox>
          {MapPlace ? <Popup /> : ''}
        </TitleBox>

        <div>
          <StampBoard ref={divRef}>
            {!screenShot &&
              stampList?.map((stamp, index) => (
                <NewStamp key={index}>
                  <NewStampImgBox>
                    {stamp.thumbnail ? (
                      <img
                        src={stamp.thumbnail}
                        alt='Thumbnail'
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <button>+</button>
                    )}
                  </NewStampImgBox>
                  <NewStampBtnBox>
                    <SearchStampName>
                      {stamp.placeName.length > MAX_LENGTH_BEFORE_NEWLINE
                        ? stamp.placeName
                            .split(',')
                            .map((part, index) => (
                              <React.Fragment key={index}>
                                {part}
                              </React.Fragment>
                            ))
                        : stamp.placeName}
                    </SearchStampName>
                    <Button children={'삭제'} onClick={() => onDelete(index)} />
                  </NewStampBtnBox>
                </NewStamp>
              ))}
            <NewStamp>
              <NewStampImgBox onClick={onOpenMap}>
                <button>+</button>
              </NewStampImgBox>
            </NewStamp>
          </StampBoard>

          <MapBox>
            <Map />
          </MapBox>
        </div>

        <StampDetailTxt
          placeholder='상세설명을 작성해주세요.'
          value={stampDetail}
          onChange={(e) => setStampDetail(e.target.value)}
        />

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
          onClick={() => {
            setScreenShot(!screenShot);
            downloadHandler();
          }}
          style={{ display: 'block', marginBottom: '50px' }}
        />
      </Wrap>
    </div>
  );
};

export default MakeStampBook;
