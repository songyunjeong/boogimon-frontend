import React from 'react';
import Header from '../Components/Header';
import Button from '../Components/Button';
import styled from 'styled-components';
import avatar from '../images/avatar.png';

const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: var(--big);
  font-weight: bold;
  margin: 50px 0 30px;
  text-align: center;
  color: var(--gray4);
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
  width: 600px;
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
  border: 2px solid var(--gray2);
  border-radius: 4px;
  background-color: #fff;
  padding: 20px 100px;
  font-size: var(--regular);
  font-weight: 700;
  color: var(--gray4);
  transform: skew(-20deg)
  
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
  }

`;

const Input = styled.input`
  width: 600px;
  height: 50px;
  border: 2px solid var(--gray2);
  border-radius: 5px;
  text-align: start;
  padding: 0 20px;
  box-sizing: border-box;
  margin-bottom: 20px;

  &:focus {
    outline: none;
  }
`;

const NicknameBox = styled.div`
  display: flex;
  justify-content: space-between;

  > input {
    width: 450px;
  }

  > button {
    box-sizing: border-box;
    height: 50px;
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
  return (
    <>
      <Header />
      
      <Wrap>
        <Title>회원가입</Title>
        
        <SignupForm id="signup-form" className="signup-form" enctype="multipart/form-data" method="POST">
          
          <Input type='email' name="user_id" id="user_id" placeholder='가입한 이메일' required/>
          <Input type="password" name="passwd" id="passwd" placeholder="비밀번호" required />
          <Input type="password" name="passwdConfirm" id="passwdConfirm" placeholder="비밀번호 확인" required />
          
          <NicknameBox>
            <Input type="text" name="nickname" id="nickname" placeholder="닉네임" required />
            <Button children={'랜덤 버튼'} />
          </NicknameBox>
          
          <Label for="profile_img">
            프로필 이미지
          </Label>
          <ImgBox>
            <ProfileImg>
              <img src={avatar} alt='' /><br/>
              <input type="file"  name="profile_img" id="profile_img" accept="image/*" />
            </ProfileImg>
            <Button children={'업로드 버튼'} id="upload"/>
          </ImgBox>

          <ButtonContainer>
            <SignupBtn type="submit" id="signup" className="btn-skew">
              <p>회원가입 완료</p>
            </SignupBtn>
          </ButtonContainer>
          
        </SignupForm>

      </Wrap>
    </>
  );
};

export default Join;