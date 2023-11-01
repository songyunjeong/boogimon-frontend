import Header from '../Components/Header';
import React, { useState } from 'react';
import '../styles/makeStampBook.css';
import '../styles/popup_address.css';
import '../styles/stampDetail.css';
import Map from '../Components/Map';
import styled from 'styled-components';

const MakeStampBook = () => {

  const [openMap, closeMap] = useState(false);

  const onOpenMap = () => {
    closeMap(!openMap);
  };
  const Popup = () => {
    return (
      <Modal>
  
        <PopupBg/>
        
                <div className="popup2">
                <CloseBtn onClick={closeMap}> x</CloseBtn>
                                 <input type="text" id="searchBar" placeholder="주소 검색"/>
                                 <button type="button" id="search">찾기</button>
                            <div className="zip">
                                <div className="container">
                                    <div className="content">
                                      
                                      <div className="item">
                                        <p>장소명</p>
                                        <p>주소</p>
                                        <div className="THUMBNAIL_BOX">
                                          
                                        </div>
                                      </div>
                                      <div className="item">
                                        <p>장소명</p>
                                        <p>주소</p>
                                        <div className="THUMBNAIL_BOX">
                                            
                                        </div>
                                      </div>
                                      <div className="item">
                                        <p>장소명</p>
                                        <p>주소</p>
                                        
                                      </div>
                                      <div className="item">
                                        <p>장소명</p>
                                        <p>주소</p>
                                        
                                    </div>
                                      <div className="item">아이템 5</div>
                                      <div className="item">아이템 6</div>
                                      <div className="item">아이템 7</div>
                                      <div className="item">아이템 8</div>
                                      <div className="item">아이템 9</div>
                                      <div className="item">아이템 10</div>
                                      
                                    </div>
                                  </div>
                            </div>
                        <button type="submit" className="submit">등록</button>
                    </div>    
      </Modal>
    );
  };


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
              <div className='stamp_txt' onClick={onOpenMap} >
              {openMap ? <Popup /> : ''}
                흰여울문화마을
                </div>
            </div>
          </div>

          <div className='stamp_map'>
            <Map />
          </div>
        </div>

        <div className='stamp_detail_txt'>상세설명 작성</div>
      </div>
    </div>
  );
};

const Modal = styled.div`
display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  z-index: 1000; /* 모달을 최상위로 올림 */
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
    &:hover{
        cursor: pointer;
        background-color: var(--yellow);
        border: 2px solid var(--light-blue);
    }
    z-index: 1001; /* X 버튼을 모달과 배경 위로 올림 */
`;

export default MakeStampBook;