import { useRef, useState } from 'react';
import Button from '../Components/Button';
import Header from '../Components/Header';
import Map from '../Components/Map';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

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

const MakeStampBook = () => {
  const divRef = useRef();
  const [screenShot, setScreenShot] = useState(false);
  const [imgUpload, setImgUpload] = useState(null);

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

  const imgUploadHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImgUpload(reader.result);
        resolve();
      };
    });
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
        </TitleBox>

        <div>
          <StampBoard ref={divRef}>
            {!screenShot && (
              <NewStamp>
                <NewStampImgBox>
                  <button>+</button>
                </NewStampImgBox>
                <NewStampBtnBox>
                  <Button children={'장소등록'} />
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

        <p>스탬프북 이미지를 업로드 해주세요.</p>
        <p
          style={{
            marginBottom: '10px',
            color: 'var(--gray4)',
            fontSize: 'var(--small)',
          }}
        >
          ⬇︎ 아래에서 스탬프북 이미지를 다운로드 후 업로드 해주세요.
        </p>

        <Button
          children={'스탬프북 이미지 다운로드'}
          marginright='true'
          onClick={() => {
            setScreenShot(!screenShot);
            downloadHandler();
          }}
          style={{ display: 'block' }}
        />

        <input
          accept='image/*'
          multiple
          type='file'
          onChange={(e) => imgUploadHandler(e)}
          name='upload'
          style={{ display: 'block', margin: '30px 0 10px' }}
        />
        <img src={imgUpload} alt='' style={{ width: '300px' }} />
      </Wrap>
    </div>
  );
};

export default MakeStampBook;
