import React from 'react';
import { useNavigate } from 'react-router-dom';
import like from '../images/like.png';
import Button from './Button';
import styled from 'styled-components';

const StampBookImg = styled.div`
  height: 500px;
  background-color: var(--gray1);
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

const StampBook = (props) => {
  const navigate = useNavigate();

  const goToStampDetail = () =>
    navigate('/stampDetail', {
      state: { title: props.title, like: props.like },
    });

  return (
    <div>
      <StampBookImg onClick={goToStampDetail} />
      <div className='stamp_book_txt'>
        <StampBookTitle onClick={goToStampDetail}>{props.title}</StampBookTitle>
        <div className='stamp_book_like'>
          <div className='like_btn'>
            <img src={like} alt='좋아요' />
          </div>
          <div>{props.like}</div>
        </div>
        <div className='stamp_book_btn'>
          <Button children={'담기'} marginright='true' />
          <Button children={'삭제'} />
        </div>
      </div>
    </div>
  );
};

export default StampBook;
