import Button from '../Components/Button';
import Header from '../Components/Header';
import Map from '../Components/Map';
import styled from 'styled-components';

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

const Stamp = styled.div`
  margin-right: 45px;
  margin-bottom: 30px;
`;

const StampImgBox = styled.div`
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

const StampBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  > button:first-child {
    margin-bottom: 5px;
  }
`;

const StampDetailTxt = styled.div`
  clear: both;
  > textarea {
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
  return (
    <div>
      <Header />

      <Wrap>
        <TitleBox>
          <StampBookTitle placeholder='타이틀을 작성하세요.' />

          <TitleButtonBox>
            <Button children={'등록'} marginright />
            <Button children={'취소'} />
          </TitleButtonBox>
        </TitleBox>

        <div>
          <StampBoard>
            <Stamp>
              <StampImgBox>
                <button>+</button>
              </StampImgBox>
              <StampBtnBox>
                <Button children={'장소등록'} />
                <Button children={'삭제'} />
              </StampBtnBox>
            </Stamp>
          </StampBoard>

          <div className='stamp_map'>
            <Map />
          </div>
        </div>

        <StampDetailTxt>
          <textarea placeholder='상세설명을 작성하세요.' />
        </StampDetailTxt>
      </Wrap>
    </div>
  );
};

export default MakeStampBook;
