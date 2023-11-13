import React, { useContext, useState } from 'react';
import Header from '../Components/Header';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import boogi from '../boogi';
import { AppContext } from '../App';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1280px;
  height: 100vh;
  margin: auto;
`;
const Title = styled.div`
  font-size: var(--big);
  font-weight: bold;
  margin-top: -120px;
  margin-bottom: 50px;
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
    background-color: var(--magenta);
    box-sizing: border-box;
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
  const { setIsLogin } = useContext(AppContext);

  const handleLogin = async () => {
    if (userId.length < 1 || userId.length > 30) {
      setError('아이디는 30자 이내여야 합니다.');
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/;

    if (passwd === '') {
      setError('비밀번호를 입력해주세요.');
      return false;
    } else if (!passwordRegex.test(passwd)) {
      setError('비밀번호는 4~20자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
      return false;
    } else {
      setError('');
    }

    try {
      const response = await boogi.post('/boogimon/user/user.jsp', null, {
        params: {
          command: 'login',
          userId: userId,
          passwd: SHA256(passwd).toString(),
        },
      });

      if (response.data.resultCode === '00') {
        sessionStorage.setItem('userId', userId);
        navigate('/');
        setIsLogin(true);
      } else {
        setError('비밀번호를 잘못 입력했습니다.');
      }
    } catch (error) {
      setError('로그인 실패');
    }
  };

  return (
    <div>
      <Header />

      <Wrap>
        <div>
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
        </div>
      </Wrap>
    </div>
  );
};
export default Login;
