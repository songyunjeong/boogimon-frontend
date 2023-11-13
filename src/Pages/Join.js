import React, { useState, useRef } from 'react';
import Header from '../Components/Header';
import Button from '../Components/Button';
import styled from 'styled-components';
// import avatar from '../images/avatar.png';
import axios from 'axios';
import { SHA256 } from 'crypto-js';
import { useNavigate } from 'react-router-dom';

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
  &:hover {
    cursor: pointer;
  }
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
  justify-content: center;
  align-items: center;

  > img {
    justify-content: left;
  } 
`;

const Label = styled.div`
  color: var(--gray4);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Error = styled.div`
  color: var(--magenta);
  padding: 10px;
  text-align: center;
`

const Join = () => {
  const [userId, setUserId] = useState(''); 
  const [passwd, setPasswd] = useState('');
  const [passwdConfirm, setPasswdConfirm] = useState('');
  const [nickname, setNickname] = useState(sessionStorage.getItem('nickname') || '');
  const [profileImg, setProfileImg] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const randomNickname = () => {
    axios.get('/boogimon/user/user.jsp', {
      params: {
        command: 'randomNickname',
        nickname: nickname,
      },
    })
    .then((response)=> {
      if(response.data.resultCode === '00') {
        const newNickname = response.data.user.nickname;
        sessionStorage.setItem('nickname', newNickname);
        setNickname(newNickname); 
      } else {
        setError('랜덤 닉네임 생성 실패'); 
      }
    })
  };

  const handleImageChange = (e) => {
    console.log(document.getElementById('profileImg'));
    const selectedImage = e.target.files[0];
    if(selectedImage) {
    setProfileImg(selectedImage);
  
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('profileImg', profileImg);
    console.log(profileImg)

    axios.post('/boogimon/user/userUpload.jsp', formData, {
      params: {
        command: 'changeImg',
      },
    })
    .then((response) => {
      if(response.data.resultCode === '00') {
        console.log('New ImageURL:', response.data.newImageURL);
        setProfileImg(response.data.newImageURL);
      } 
      // else {
      //   setError('사진 업로드 실패');
      //   console.log(response.data.resultCode);
      // }
    })

    .catch((error) => {
      setError('사진 업로드 실패'); 
      console.log('Image Upload Error:', error);
      });
    }
  };

  const handleSubmit = async () => {
    
    if (userId.length < 1 || userId.length > 30) {
      setError('아이디는 30자 이내여야 합니다.');
      return;
    }
    const passwordRegex = /^[a-z\d!@*&-_]{4,20}$/;
    if (passwd === '') {
      setError('비밀번호를 입력해주세요.');
      return false;
      
    } else if (!passwordRegex.test(passwd)) {
      setError(
        '비밀번호는 4~20자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.'
      );
      return false;
    } else if (passwd !== passwdConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
        setError('');
      }  

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('passwd', SHA256(passwd).toString());
    formData.append('nickname', nickname);
    formData.append('profileImg', profileImg);
    
    try {
      const response = await axios.post('/boogimon/user/userUpload.jsp', formData, {
        params: {
          command: 'join',
        },
      });
      
      if(response.data.resultCode === '00') {
        navigate('/login');
      } else {
        if (response.data.resultCode === '22'){
          setError('중복된 사용자ID 입니다');
        } else if (response.data.resultCode === '23'){
          setError('중복된 닉네임 입니다');
        } else {
          setError('기타 이유로 회원가입에 실패하셨습니다');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
    const fileInputRef = useRef(null);

    const handleProfileClick = () => {
      console.log(fileInputRef);
      fileInputRef.current.click();
  };

  return (
    <>
      <Header />
      
      <Wrap> 
        <Title>회원가입</Title>
        
        <SignupForm 
          id="signup-form" 
          className="signup-form" 
          encType="multipart/form-data" 
          method="POST"
        >
          <Input type='email' name="user_id" id="user_id" placeholder='가입한 이메일' required value={userId} onChange={(e) => setUserId(e.target.value)}/>
          <Input type="password" name="passwd" id="passwd" placeholder="비밀번호" required value={passwd} onChange={(e) => setPasswd(e.target.value)}/>
          <Input type="password" name="passwdConfirm" id="passwdConfirm" placeholder="비밀번호 확인" required value={passwdConfirm} onChange={(e) => setPasswdConfirm(e.target.value)}/>
          <Input type="text" name="nickname" id="nickname" placeholder="닉네임" required value={sessionStorage.nickname || nickname} onChange={(e) => setNickname(e.target.value)}/>
          <Button children={'랜덤 버튼'} onClick={randomNickname} style={{position: "absolute", top: "245px", right: "-150px"}}/>
          
          <Label htmlFor="profileImg">
            프로필 이미지
          </Label>
          <ImgBox>
            <ProfileImg onClick={handleProfileClick}>
              {profileImg && <img src={URL.createObjectURL(profileImg)} alt='' />}
              <br/>
              <input 
                type="file" 
                name="profileImg" 
                id="profileImg" 
                accept="image/*" 
                onChange={handleImageChange}
                ref={fileInputRef} 
                style={{ display: 'none' }} 
              />
            </ProfileImg>
            
          </ImgBox>
          <Error>{error}</Error>

          <ButtonContainer>
            <SignupBtn type="submit" id="signup" onClick={handleSubmit}>
              <p>회원가입 완료</p>
            </SignupBtn>
          </ButtonContainer>
          
        </SignupForm>

      </Wrap>
    </>
  );
};

export default Join;
