import React, { useState } from 'react';
import Header from '../Components/Header';
import Button from '../Components/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: var(--big);
  font-weight: bold;
  margin-top: -120px;
  margin-bottom: 50px;
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

const FindPassword = () => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleFindPasswd = async () => {
    if (userId.length < 1 || userId.length > 30) {
      setError('아이디는 30자 이내여야 합니다.');
      return;
    } else {
      setError('');
    }

    try {
      const response = await axios.post('/boogimon/user/user.jsp', null, {
        params: {
          command: 'changePasswd',
          userId: userId,
        },
      });

      if (response.data.resultCode === '00') {
        // console.log("json 데이터 출력 = " + JSON.stringify(response.data));

        sessionStorage.setItem('userId', response.data.user.userId);

        // let userId = sessionStorage.getItem('userId');
        // console.log("userId = ", userId);

        navigate('/');
      } else {
        setError('비밀번호 찾기 실패');
      }
    } catch (error) {
      setError('비밀번호 찾기 실패');
    }
  };

  return (
    <div>
      <Header />

      <Wrap>
        <div>
          <Title>비밀번호 찾기</Title>

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
            <Error>{error}</Error>
            <Button
              children={'비밀번호 찾기'}
              id='findPasswd'
              onClick={handleFindPasswd}
            />
          </InputBox>
        </div>
      </Wrap>
    </div>
  );
};

export default FindPassword;
