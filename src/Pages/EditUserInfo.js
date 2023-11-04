import Header from '../Components/Header';
import '../styles/editUserInfo.css';
import avatar from '../images/avatar.png';

const EditUserInfo = () => {
  return (
    <div>
      <Header />
      
      <div className='wrap'>
        
        <section className='editUserInfo_area'>
          <div className='title'>회원정보수정</div>
          <form className="editUserInfo-form" enctype="multipart/form-data" method="POST">
            <div className="profile">
              <label for="profile_img" hidden>프로필 이미지</label><br/>
              <img src={avatar} alt='' /><br/>
              <input type="file"  name="profile_img" id="profile_img" accept="image/*" />
            </div>
              <div className="editUserInfo_input">
                <div className="form-control" id="user_id" >boogi@boogimon.com</div>
              </div>
              <div className="editUserInfo_input">
                <input type="text" className="form-control" name="nickname" id="nickname" placeholder="닉네임" required />
                <button type="button" id="random">랜덤 버튼</button>
                <button type="button" id="change_nickname">닉네임 변경</button>
              </div>
              <div className="editUserInfo_input">
                <input type="password" className="form-control" name="passwd" id="passwd" placeholder="비밀번호 변경" required />
              </div>
              <div className="editUserInfo_input">
                <input type="password" className="form-control" name="passwdConfirm" id="passwdConfirm" placeholder="비밀번호 변경 확인" required />
                <button type="submit" id="change_pw">
                  <p>비밀번호 변경</p>
                </button>
              </div>
              <div id="msg"></div>
            <div className="btn-container">
              <button type="submit" id="deleteUser" className="btn btn-skew">
                <p>회원 탈퇴</p>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditUserInfo;