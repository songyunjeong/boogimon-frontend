import React, { useState } from 'react';
import Header from '../Components/Header';
import Button from '../Components/Button';
import styled from 'styled-components';
import avatar from '../images/avatar.png';
import axios from 'axios';

const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: var(--big);
  font-weight: bold;
  margin: 50px 0 30px;
  text-align: center;
  color: var(--black);
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--gray1);
  margin: 20px 30px;
  overflow: hidden;
`

const SignupForm = styled.form`
  position: relative;
  width: 438px;
  margin: 0 auto;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const SignupBtn = styled.div`
  display: block;
  background-color: var(--black);
  border: 2px solid var(--black);
  border-radius: 4px;
  padding: 20px 100px;
  font-size: var(--regular);
  font-weight: 700;
  color: var(--gray1);
  transform: skew(-20deg);
  
  >p {
  position: relative;
  transform: skew(20deg);
  text-align: center;
  z-index: 2;
  }
  
  &:hover {
    cursor: pointer;
    background-color: var(--yellow);
    border: 2px solid var(--light-blue);
    color: var(--black);
  }
`;

const Input = styled.input`
  width: 438px;
  height: 50px;
  border: 2px solid var(--gray2);
  border-radius: 5px;
  text-align: start;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0 auto 30px;
  
  &:focus {
    outline: none;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;

  > img {
    justify-content: left;
  }

  > button {
    box-sizing: border-box;
    height: 50px;
  }  
`;

const Label = styled.div`
  color: var(--gray4);
  padding: 10px 0  0 35px;
`

const Join = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    passwd: '',
    passwdConfirm: '',
    nickname: '',
    ProfileImg: null,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profile_img: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        user_id: formData.user_id,
        passwd: formData.passwd,
        nickname: formData.nickname,
        profile_img: formData.profile_img ? formData.profile_img.name : null,
      };

      sessionStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data stored in session storage:', userData);

      const response = await axios.post('http://localhost:8080/boogimon/user/userUpload.jsp', userData);

      console.log(response);
      
    } catch (error) {
      console.error(error);
    }
  };
  
  const userDataString = sessionStorage.getItem('userData');
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    // Now you can use userData in your application
    console.log(userData);
  } else {
    console.log("No user data found in session storage");
  }

  return (
    <>
      <Header />
      
      <Wrap>
        <Title>회원가입</Title>
        
        <SignupForm id="signup-form" className="signup-form" encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
          
          <Input type='email' name="user_id" id="user_id" placeholder='가입한 이메일' required value={formData.user_id}
            onChange={handleChange}/>
          <Input type="password" name="passwd" id="passwd" placeholder="비밀번호" required value={formData.passwd}
            onChange={handleChange}/>
          <Input type="password" name="passwdConfirm" id="passwdConfirm" placeholder="비밀번호 확인" required value={formData.passwdConfirm}
            onChange={handleChange}/>
          <Input type="text" name="nickname" id="nickname" placeholder="닉네임" required value={formData.nickname}
            onChange={handleChange}/>
          <Button children={'랜덤 버튼'} style={{position: "absolute", top: "245px", right: "-150px"}}/>
          
          <Label htmlFor="profile_img">
            프로필 이미지
          </Label>
          <ImgBox>
            <ProfileImg>
              <img src={avatar} alt='' /><br/>
              <input type="file"  name="profile_img" id="profile_img" accept="image/*"  onChange={handleImageChange} />
            </ProfileImg>
            <Button children={'업로드 버튼'} id="upload" />
          </ImgBox>

          <ButtonContainer>
            <SignupBtn type="submit" id="signup">
              <p>회원가입 완료</p>
            </SignupBtn>
          </ButtonContainer>
          
        </SignupForm>

      </Wrap>
    </>
  );
};

export default Join;