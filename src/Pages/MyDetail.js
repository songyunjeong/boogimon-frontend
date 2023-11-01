import React, { useState } from 'react';
import styled from 'styled-components';
import '../styles/popup_card.css';
import '../styles/my.css';
import boogicard from '../images/bogimon_card_b.png';
import profile from '../images/머리만(색깔).png';
import Header from '../Components/Header';
import like from '../images/like.png';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

const Modal = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
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
  &:hover{
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
      &:hover{
        cursor: pointer;
        background-color: var(--yellow);
        border: 2px solid var(--light-blue);
  }
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
& > button{
  display: inline-block;
border: 2px solid var(--gray2);
border-radius: 4px;
background-color: #ffffff;
padding: 8px 25px;
box-sizing: border-box;
}
& > button:hover{
  cursor: pointer;
background-color: var(--yellow);
border: 2px solid var(--light-blue);
}
`;
  
  
  const My  = () => {
    const [openCard, closeCard] = useState(false);

  const onOpenCard = () => {
    closeCard(!openCard);
  };
  const Popup = () => {
    const saveAsImage = () => {
      const cardElement = document.querySelector('.popup');
      html2canvas(cardElement).then((canvas) => {
        // 사용자로부터 파일 이름을 입력받기 위한 프롬프트 다이얼로그
        const filename = window.prompt('Enter a filename', 'custom_image_name.png');
    
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
  
        <PopupBg/>
                <div className="popup">
                <CloseBtn onClick={onOpenCard}> x</CloseBtn>
                        <p className="card_name">광안리</p>
                        <p className="random_img">랜덤이미지</p>
                        <p className="card_content">카드내용? 축하드립니다~</p>
                     <img id="boogicard_img" src={boogicard} alt="부기카드"/>
                    <button type="button" id="downloadImage" className="downloadbtn" onClick={saveAsImage}></button>
                </div>
      </Modal>
    );
  };


  const View = () => {
    return (
      <Mypage>
      <div className="PROFILE_IMG">
        <img id="profile" src={profile} alt="프로필사진" />
      </div>
      <div className="MYPROFILE">
        <p className="NICKNAME">부기몬하이</p>
        <button type="button" className="btn"></button>
      </div>
      <div className="MYDETAIL">
        <p className="RANK">🏅1 th</p>
        <p className="LEVEL">LV.25</p>
        <progress id="progress" value="70" min="0" max="100"></progress>
        <p className="STAMP">📍777</p>
        <p className="USER_LIKE">❤️777</p>
        <p className="EXP">EXP.7777</p>
      </div>
    </Mypage>
    );
  };

    return(
      <div>

        <Header/>
      <div className='wrap'>
        <View/>
        <select className='sort'>
          <option>인기순</option>
          <option>최신순</option>
          <option>가나다순</option>
        </select>

        <section className='stamp_book'>
          <div>
            <div className='stamp_book_img'></div>
            <div className='stamp_book_txt'>
              <div className='stamp_book_title'>
                <Link to='/stampDetail'>스탬프북1</Link>
              </div>
              <div className='stamp_book_like'>
                <div className='like_btn'>
                  <img src={like} alt='좋아요' />
                </div>
                <div>30</div>
              </div>
              {/* <div className='stamp_book_btn'> */}
              <CompleteBtn>
                  <OpenBtn onClick={onOpenCard}>인증서</OpenBtn>
                      {openCard ? <Popup /> : ''}
                    <button className='delete_btn'>삭제</button>
                </CompleteBtn>
            </div>
          </div>
          <div>
            <div className='stamp_book_img'></div>
            <div className='stamp_book_txt'>
              <div className='stamp_book_title'>스탬프북2</div>
              <div className='stamp_book_like'>
                <div className='like_btn'>
                  <img src={like} alt='좋아요' />
                </div>
                <div>22</div>
              </div>
              <div className='stamp_book_btn'>
                <button className='pick_btn'>담기</button>
                <button className='delete_btn'>삭제</button>
              </div>
            </div>
          </div>
          <div>
            <div className='stamp_book_img'></div>
            <div className='stamp_book_txt'>
              <div className='stamp_book_title'>스탬프북3</div>
              <div className='stamp_book_like'>
                <div className='like_btn'>
                  <img src={like} alt='좋아요' />
                </div>
                <div>20</div>
              </div>
              <div className='stamp_book_btn'>
                <button className='pick_btn'>담기</button>
                <button className='delete_btn'>삭제</button>
              </div>
            </div>
          </div>
          </section>
        </div>

      </div>
    );
  } ;




export default My;