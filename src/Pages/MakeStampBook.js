import Header from '../Components/Header';
import '../styles/stampDetail.css';
import Map from '../Components/Map';
import styled from 'styled-components';

const StampDetailTxt = styled.div`
  clear: both;
  padding: 20px 0;
`;

const MakeStampBook = () => {
  return (
    <div>
      <Header />

      <div className='wrap'>
        <div className='stamp_detail_title'>타이틀을 작성하세요</div>

        <div>
          <div className='stamp_box'>
            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_thumbL'
                  alt='스탬프 이미지1'
                />
              </div>
              <div className='stamp_txt'>흰여울문화마을</div>
            </div>
          </div>

          <div className='stamp_map'>
            <Map />
          </div>
        </div>

        <StampDetailTxt>상세설명 작성</StampDetailTxt>
      </div>
    </div>
  );
};

export default MakeStampBook;
