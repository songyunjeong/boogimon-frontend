import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import likeFullImg from '../images/like_full.png';
import likeImg from '../images/like.png';
import Button from './Button';
import styled from 'styled-components';

const StampBookImg = styled.div`
  height: 500px;
  background-color: var(--gray1);
  &:hover {
    cursor: pointer;
  }
`;

const StampBookTxt = styled.div`
  text-align: center;
  position: relative;
  margin-top: 10px;
`;

const StampBookTitle = styled.button`
  border: none;
  background-color: transparent;
  font-size: var(--regular);
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const StampBookLike = styled.div`
  display: flex;
  position: absolute;
  top: 2px;
  right: 0;
  > div:first-child {
    margin-right: 10px;
  }
`;

const StampBookLikeBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const StampBookBtnBox = styled.div`
  text-align: center;
`;

const StampBook = (props) => {
  const navigate = useNavigate();
  const [likeBtn, setLikeBtn] = useState(false);

  const goToStampDetail = () =>
    navigate('/stampDetail', {
      state: {
        nickname: props.nickname,
        description: props.description,
        regdate: props.regdate,
        likeCount: props.likeCount,
        title: props.title,
      },
    });

  const likeHandler = () => {
    setLikeBtn(!likeBtn);
  };

  return (
    <div>
      <StampBookImg onClick={goToStampDetail} />
      <StampBookTxt>
        <StampBookTitle onClick={goToStampDetail}>{props.title}</StampBookTitle>
        <StampBookLike>
          <StampBookLikeBtn onClick={likeHandler}>
            <img src={likeBtn ? likeFullImg : likeImg} alt='좋아요' />
          </StampBookLikeBtn>
          <div>{likeBtn ? props.like * 1 + 1 : props.like}</div>
        </StampBookLike>
        <StampBookBtnBox>
          <Button children={'담기'} marginright='true' />
          <Button children={'삭제'} />
        </StampBookBtnBox>
      </StampBookTxt>
    </div>
  );
};

export default StampBook;
