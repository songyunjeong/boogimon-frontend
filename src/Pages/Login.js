import React, { useState } from 'react';
import Header from '../Components/Header';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SHA256 } from 'crypto-js';

const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
const Title = styled.div`
  font-size: var(--big);
  font-weight: bold;
  margin: 100px 0 50px;
  text-align: center;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  > input {
    width: 438px;
    height: 50px;
    border: 2px solid var(--gray2);
    border-radius: 5px;
    text-align: start;
    padding: 0 20px;
    margin-bottom: 20px;
    &:focus {
      outline: none;
    }
  }
`;

const Error = styled.div`
  color: var(--magenta);
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const LoginBtn = styled.div`
  display: block;
  background-color: var(--black);
  border: 2px solid var(--black);
  border-radius: 4px;
  padding: 20px 100px;
  font-size: var(--regular);
  font-weight: 700;
  color: var(--gray1);
  transform: skew(-20deg);
  > p {
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
const FindPassword = styled.div`
  color: var(--gray4);
  padding: 20px 0;
  text-decoration: underline var(--gray4);
  a {
  color: var(--gray4)
  }
  &:hover,
  &:focus {
    cursor: pointer;
    color: var(--gray4);
  }
`;
const FindPWLink = styled(Link)`
  color: var(--gray);
`;
const Login = () => {
  const [userId, setUserId] = useState(''); 
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
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
    } else {
        setError('');
      }  
      
    try {
      const response = await axios.post('/boogimon/user/user.jsp', null, {
        params: {
          command : 'login',
          userId: userId,
          passwd: SHA256(passwd).toString(),   
        }
      });
      
      if(response.data.resultCode === '00') {
        
        // console.log("json 데이터 출력 = " + JSON.stringify(response.data));

        sessionStorage.setItem('userId', response.data.user.userId);
        
        // let userId = sessionStorage.getItem('userId'); 
        // console.log("userId = ", userId);

        navigate('/');
      }
      else {
        setError('로그인 실패');
      }  
    } catch (error) {
      setError('로그인 실패');
    }
  };

  return (
    <div>
      <Header />
      <Wrap> 
        <Title>로그인</Title>
        <InputBox>
          <input type='email' name="user_id" id="user_id" placeholder='가입한 이메일' required 
                 value={userId} 
                 onChange={(e) => setUserId(e.target.value)}
          />
          <input type="password" name="passwd" id="passwd" placeholder="비밀번호" required
                 value={passwd} 
                 onChange={(e) => setPasswd(e.target.value)}
          />
          <Error>{error}</Error>

          <ButtonContainer>
            <LoginBtn type="submit" id="login" onClick={handleLogin}>
              <p>로그인</p>
            </LoginBtn>
          </ButtonContainer>
          
          <FindPassword>
          <FindPWLink to="/findPassword">비밀번호를 잊으셨나요</FindPWLink>
          </FindPassword>
        </InputBox>
      </Wrap>
    </div>
  );
};
export default Login;
