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

const MakeStampBook = () => {
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
              <div className='stamp_txt'>흰여울문화마을</div>
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
