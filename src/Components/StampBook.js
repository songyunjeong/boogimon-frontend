import React, { useContext, useEffect, useState } from 'react';
import likeFullImg from '../images/like_full.png';
import likeImg from '../images/like.png';
import Button from './Button';
import styled from 'styled-components';
import StampBoard from './StampBoard';
import boogi from '../boogi';
import { AppContext } from '../App';

const StampBookTxt = styled.div`
  text-align: center;
  position: relative;
  margin-top: 10px;
`;

const StampBookTitle = styled.div`
  border: none;
  background-color: transparent;
  font-size: var(--regular);
  margin-bottom: 10px;
  &:hover {
    cursor: default;
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
  const { isLogin } = useContext(AppContext);
  const [likeBtn, setLikeBtn] = useState(props.islike);
  const [likeCount, setLikeCount] = useState(props.likecount);

  const likeHandler = () => {
    if (isLogin) {
      setLikeBtn(!likeBtn);

      if (likeBtn) {
        boogi.get(`/boogimon/stampbook/stampbook.jsp?command=unlike`, {
          params: {
            stampbookid: props.stampbookid,
            userId: window.sessionStorage.getItem('userId'),
          },
        });
        return setLikeCount(likeCount - 1);
      } else {
        boogi.get(`/boogimon/stampbook/stampbook.jsp?command=like`, {
          params: {
            stampbookid: props.stampbookid,
            userId: window.sessionStorage.getItem('userId'),
          },
        });
        return setLikeCount(likeCount + 1);
      }
    } else {
      console.log('좋아요는 로그인 후 가능합니다.');
    }
  };

  useEffect(() => {
    if (props.isLike === true) {
      setLikeBtn(true);
    }
  }, [likeBtn]);

  return (
    <div>
      <StampBoard stampbookid={props.stampbookid} stamplist={props.stamplist} />
      <StampBookTxt>
        <StampBookTitle>{props.title}</StampBookTitle>
        <StampBookLike>
          <StampBookLikeBtn onClick={likeHandler}>
            <img
              src={isLogin && likeBtn ? likeFullImg : likeImg}
              alt='좋아요'
            />
          </StampBookLikeBtn>
          <div>{likeCount}</div>
        </StampBookLike>
        <StampBookBtnBox>
          <Button children={'삭제'} $marginright />
          <Button children={'담기'} />
        </StampBookBtnBox>
      </StampBookTxt>
    </div>
  );
};

export default StampBook;
