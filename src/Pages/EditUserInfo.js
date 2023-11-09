import React, { useState } from 'react';
import Header from '../Components/Header';
import avatar from '../images/avatar.png';
import styled from 'styled-components';

const Warp = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Title = styled.span`
  font-size: var(--big);
  font-weight: bold;
  position: absolute;
  left: 44%;
  top: -14%;
`;

const Button = styled.button`
  border: 2px solid var(--gray2);
  border-radius: 4px;
  background-color: #ffffff;
  padding: 15px 25px;
  width: 138px;
  box-sizing: border-box;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    background-color: var(--yellow);
    border: 2px solid var(--light-blue);
  }
`;

const Form = styled.form.attrs({
  enctype: 'multipart/form-data',
  method: 'POST',
})`
  width: 735px;
  margin: 15% 38%;
`;

const Input = styled.input.attrs({ required: true })`
  width: 438px;
  height: 50px;
  border: 1px solid var(--gray2);
  border-radius: 5px;
  margin-top: 16px;
  box-sizing: border-box;
  padding: 10px;
`;

const Nickname = styled(Input).attrs({
  type: 'text',
  name: 'nickname',
  id: 'nickname',
  placeholder: '닉네임',
  maxlength: '15',
})``;

const Pwd = styled(Input).attrs({
  type: 'password',
  name: 'password',
  id: 'password',
  placeholder: '비밀번호 변경',
  maxlength: '20',
})``;

const PwdConfirm = styled(Input).attrs({
  type: 'password',
  name: 'passwdConfirm',
  id: 'passwdConfirm',
  placeholder: '비밀번호 변경 확인',
  maxlength: '20',
})`
  margin-bottom: 10px;
`;

const Id = styled.div`
  width: 438px;
  height: 50px;
  border: 1px solid var(--gray1);
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
`;

const Profile = styled.div`
  position: absolute;
  top: -10%;
  left: 44%;
`;

const Adiv = styled.div`
  width: 700px;
`;

const Edit = styled.span`
  color: var(--gray2);
  text-decoration-line: underline;
  &:hover,
  &:focus {
    cursor: pointer;
    color: var(--black);
  }
`;

const PopupBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 18%);
`;

const ModelBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0%;
  left: 0%;
`;
const Model = styled.div`
  width: 260px;
  height: 8vh;
  border: 2px solid var(--gray2);
  border-radius: 25px;
  position: fixed;
  top: 43%;
  left: 41%;
  background-color: white;
`;

const DeleteBox = styled.div`
  width: 193px;
  position: relative;
  top: 22%;
  left: 19%;
`;
const DeleteMsg = styled.span`
  font-size: var(--regular);
`;

const DeleteButton = styled.button`
  border: 2px solid var(--gray2);
  border-radius: 4px;
  background-color: #ffffff;
  padding: 5px 15px;
  box-sizing: border-box;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    background-color: var(--yellow);
    border: 2px solid var(--light-blue);
  }
`;

const ErrMsg = styled.div`
  color: red;
`;

const EditUserInfo = () => {
  const [popupOn, setPopupOn] = useState(false);
  const onOpenPopup = () => {
    setPopupOn(!popupOn);
  };

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const passwordCheckHandler = (password, confirm) => {
    //정규표현식
    const passwordRegex = /^[a-z\d!@*&-_]{4,20}$/;
    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
      //정규표현식 메서드(test)
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        '비밀번호는 4~20자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.'
      );
      return false;
    } else if (confirm !== password) {
      setPasswordError('');
      setConfirmError('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      setPasswordError('');
      setConfirmError('');
      return true;
    }
  };

  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
      passwordCheckHandler(value, confirm);
    } else {
      setConfirm(value);
      passwordCheckHandler(password, value);
    }
  };

  const Popup = () => {
    return (
      <ModelBox>
        <PopupBg />
        <Model>
          <DeleteBox>
            <DeleteMsg>정말 탈퇴하시겠습니까?</DeleteMsg>
            <DeleteButton>예</DeleteButton>
            <DeleteButton onClick={onOpenPopup}>아니요</DeleteButton>
          </DeleteBox>
        </Model>
      </ModelBox>
    );
  };
  return (
    <>
      <Header />

      <Warp>
        <Title>회원정보수정</Title>

        <Form>
          <Profile>
            <label for='profile_img' hidden>
              프로필 이미지
            </label>
            <br />
            <img src={avatar} alt='' />
            <br />
            {/* <input type="file"  name="profile_img" id="profile_img" accept="image/*" /> */}
          </Profile>
          <Id>boogi@boogimon.com</Id>

          <Nickname />
          <Button>랜덤 버튼</Button>
          <Button>닉네임 변경</Button>

          <Pwd onChange={onChangePasswordHandler} value={password} />
          <ErrMsg>{passwordError && <small>{passwordError}</small>}</ErrMsg>

          <PwdConfirm onChange={onChangePasswordHandler} value={confirm} />
          <Button>비밀번호 변경</Button>
          <ErrMsg>{confirmError && <small>{confirmError}</small>}</ErrMsg>

          <Adiv>
            <Edit onClick={onOpenPopup}>회원을 탈퇴하시겠습니까?</Edit>
            {popupOn ? <Popup /> : ''}
          </Adiv>
        </Form>
      </Warp>
    </>
  );
};

export default EditUserInfo;
