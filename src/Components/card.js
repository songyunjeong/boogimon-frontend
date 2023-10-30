import React, { useState } from 'react';
import '../styles/popup_card.css';
import boogicard_img from '../images/bogimon_card_b.png';

function MyComponent() {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const openCard = () => {
    setIsCardOpen(true);
  };

  const closeCard = () => {
    setIsCardOpen(false);
  };

  return (
    <div>
      <button id="boogicard" onClick={openCard}>
        부기카드 열기
      </button>
      {isCardOpen && (
        <div className="background card-popup">
          <div className="window">
            <button id="cardclose" onClick={closeCard}>
              X
            </button>
            <div className="popup">
              <p className="card_name">광안리</p>
              <p className="random_img">랜덤이미지</p>
              <p className="card_content">카드내용? 축하드립니다~</p>
              <img id="boogicard_img" src={boogicard_img} alt="부기카드" />
              <button type="button" id="downloadImage" className="downloadbtn"></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
