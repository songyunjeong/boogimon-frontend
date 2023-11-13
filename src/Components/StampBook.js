import React, { useContext, useEffect, useState } from 'react';
import likeFullImg from '../images/like_full.png';
import likeImg from '../images/like.png';
import Button from './Button';
import styled from 'styled-components';
import StampBoard from './StampBoard';
import boogi from '../boogi';
import { AppContext } from '../App';
import { useLocation } from 'react-router-dom';

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
  const { isLogin } = useContext(AppContext);
  const { pathname } = useLocation();
  const [likeBtn, setLikeBtn] = useState(props.islike);
  const [likeCount, setLikeCount] = useState(props.likecount);
  const [data, setData] = useState();

  const likeHandler = () => {
    if (window.sessionStorage.getItem('userId')) {
      setLikeBtn(!likeBtn);
      if (likeBtn) {
        boogi.get(`/boogimon/stampbook/stampbook.jsp?command=unlike`, {
          params: {
            stampbookId: props.stampbookid,
            userId: window.sessionStorage.getItem('userId'),
          },
        });
        setLikeCount(likeCount - 1);
        console.log('좋아요 -1');
      } else {
        boogi.get(`/boogimon/stampbook/stampbook.jsp?command=like`, {
          params: {
            stampbookId: props.stampbookid,
            userId: window.sessionStorage.getItem('userId'),
          },
        });
        setLikeCount(likeCount + 1);
        console.log('좋아요 +1');
      }
    } else {
      console.log('좋아요는 로그인 후 가능합니다.');
    }
  };

  const deleteHandler = () => {
    if (window.sessionStorage.getItem('userId')) {
      // 삭제 요청 보내기
      boogi
        .get(`/boogimon/stampbook/stampbook.jsp?command=unpick`, {
          params: {
            stampbookId: props.stampbookid,
            userId: window.sessionStorage.getItem('userId'),
          },
        })
        .then((response) => {
          console.log('삭제 요청 성공');
          // TODO: 삭제 후에 추가적인 작업을 수행할 수 있습니다.
          window.location.reload();
        })
        .catch((error) => {
          console.error('삭제 요청 실패:', error);
        });
    } else {
      console.log('삭제는 로그인 후 가능합니다.');
    }
  };

  const addToMyListHandler = () => {
    if (window.sessionStorage.getItem('userId')) {
      // 담기 요청 보내기
      boogi
        .post(`/boogimon/stampbook/stampbook.jsp?command=pick`, null, {
          params: {
            stampbookId: props.stampbookid,
            userId: window.sessionStorage.getItem('userId'),
          },
        })
        .then(() => {
          console.log('담기 요청 성공');
          // TODO: 담기 후에 추가적인 작업을 수행할 수 있습니다.
        })
        .catch((error) => {
          console.error('담기 요청 실패:', error);
        });
    } else {
      console.log('담기는 로그인 후 가능합니다.');
    }
  };

  useEffect(() => {
    if (props.islike === 'true') {
      setLikeBtn(true);
    }

    boogi
      .get(
        `/boogimon/stampbook/stampbook.jsp?command=mylist&userId=${window.sessionStorage.getItem(
          'stampbookId'
        )}`
      )
      .then((response) => {
        setData(response.data);
      });
  }, [likeBtn]);

  return (
    <div>
      <StampBoard
        stampbookid={props.stampbookid}
        islike={props.islike}
        likecount={props.likecount}
        title={props.title}
        stamplist={props.stamplist}
      />
      <StampBookTxt>
        <StampBookTitle>{props.title}</StampBookTitle>
        <StampBookLike>
          <StampBookLikeBtn onClick={likeHandler}>
            <img src={likeBtn ? likeFullImg : likeImg} alt='좋아요' />
          </StampBookLikeBtn>
          <div>{likeCount}</div>
        </StampBookLike>
        <StampBookBtnBox>
          {pathname === '/' && (
            <Button children={'담기'} onClick={addToMyListHandler} />
          )}
          {isLogin && pathname === '/my' && (
            <Button children={'삭제'} onClick={deleteHandler} />
          )}
        </StampBookBtnBox>
      </StampBookTxt>
    </div>
  );
};

export default StampBook;
