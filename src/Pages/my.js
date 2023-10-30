
import '../styles/my.css';
import profile from '../images/머리만(색깔).png';
import React from 'react';

function MyComponent(){
    return(
        <div>
        <div id="my">
                    <div class="PROFILE_IMG">
                        <img id="profile" src={profile} alt="프로필사진" />
                    </div>
                    <div class="MYPROFILE">
                        <p class="NICKNAME">부기몬하이</p>
                    <button type="button" class="btn"></button>
                    </div>
                    <div class="MYDETAIL">
                        <p class="RANK">🏅1 th</p>
                        <p class="LEVEL">LV.25</p>
                        <progress id="progress" value="70" min="0" max="100"></progress>
                        <p class="STAMP">📍777</p>
                        <p class="USER_LIKE">❤️777</p>
                        <p class="EXP">EXP.7777</p>
                        
                    </div>
                </div>
                <button id="boogicard">부기카드 열기</button>
                <button id="showmap">지도열기</button>
                </div>
    );
}

export default MyComponent;