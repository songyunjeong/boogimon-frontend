import '../styles/my.css';
import Card from '../styles/popup_card.css';


import profile from '../images/머리만(색깔).png';
import boogicard from '../images/bogimon_card_b.png'
import React, { useState } from 'react';

function MyComponent() {
  const [isModalOpen, setIsCardModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  function openCardModal() {
    setIsCardModalOpen(true);
  }

  function closeCardModal() {
    setIsCardModalOpen(false);
  }

  function openMapModal() {
    setIsMapModalOpen(true);
  }

  function closeMapModal() {
    setIsMapModalOpen(false);
  }

  return (
    <div>
      <div id="my">
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
      </div>
      <button type="button" onClick={openCardModal}>부기카드 열기</button>
      <button id="showmap" onClick={openMapModal}>지도열기</button>
    
      {isModalOpen && (
        <div className="background card-popup">
          <div className="window">
            <button id="cardclose" onClick={closeCardModal}>X</button>
            <div className="popup">
              <p className="card_name">광안리</p>
              <p className="random_img">랜덤이미지</p>
              <p className="card_content">카드내용? 축하드립니다~</p>
              <img id="boogicard_img" src={boogicard} alt="부기카드" />
              <button type="button" id="downloadImage" className="downloadbtn"></button>
            </div>
          </div>
        </div>
      )}
      {isMapModalOpen && (
        <div className="background map-popup">
          <div className="window2">
            <div className="popup2">
            <div className="background map-popup">
    <div className="window2">
        <div className="popup2">
             
                     <input type="text" id="searchBar" placeholder="주소 검색" />
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
            <button id="mapclose" onClick={closeMapModal}>X</button>
            <button type="submit" className="submit">등록</button>
        </div>
        
        <div>
        <div></div>
        </div>
    </div>
    </div> 
              {/* 지도 관련 내용을 이곳에 추가하세요 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
