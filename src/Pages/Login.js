import React from 'react';
import Header from '../Components/Header';
import Button from '../Components/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: var(--big);
  font-weight: bold;
  margin: 100px 0 50px;
  text-align: center;
  color: var(--black);
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  > input {
    width: 525px;
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

const Error = styled.div`
  color: var(--magenta);
  padding: 20px;
`

const FindPWLink = styled(Link)`
  color: var(--gray);
`

const Login = () => {
  return (
    <div>
      <Header />

      <Wrap>
        <Title>로그인</Title>
        
        <InputBox>
          <input type='email' name="user_id" id="user_id" placeholder='가입한 이메일' required />
          <input type="password" name="passwd" id="passwd" placeholder="비밀번호" required />
          <Error></Error>
          <Button children={'로그인'} />
          <FindPassword>
          <FindPWLink to="/findPassword">비밀번호를 잊으셨나요</FindPWLink>
          </FindPassword>
        </InputBox>
        
      </Wrap>
    </div>
  );
};

export default Login;