import React, { useState } from 'react';
import Header from '../Components/Header';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      setError('아이디는 30자 이하여야 합니다.');
      return;
    }
    if (passwd.length < 4 || passwd.length > 20) {
      setError('비밀번호는 4자 이상 20자 이하여야 합니다.');
      return;
    }
    try {
      const response = await axios.post('/boogimon/user/user.jsp', null, {
        params: {
          command: 'login',
          userId: userId,
          passwd: passwd,
        },
      });
      if (response.data.resultCode === '00') {
        sessionStorage.setItem('userId', response.data.user.userId);
        navigate('/');
      } else {
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
          <input
            type='email'
            name='user_id'
            id='user_id'
            placeholder='가입한 이메일'
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type='password'
            name='passwd'
            id='passwd'
            placeholder='비밀번호'
            required
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
          />
          <Error>{error}</Error>
          <ButtonContainer>
            <LoginBtn type='submit' id='login' onClick={handleLogin}>
              <p>로그인</p>
            </LoginBtn>
          </ButtonContainer>
          <FindPassword>
            <FindPWLink to='/findPassword'>비밀번호를 잊으셨나요</FindPWLink>
          </FindPassword>
        </InputBox>
      </Wrap>
    </div>
  );
};
export default Login;
