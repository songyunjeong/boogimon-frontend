import StampBook from '../Components/StampBook';
import Header from '../Components/Header';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import boogi from '../boogi';

const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const Sort = styled.select`
  width: 100px;
  border: 1px solid var(--gray2);
  border-radius: 5px;
  padding: 5px 8px;
  box-sizing: border-box;
  margin-top: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const StampBookBox = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  > div {
    margin-right: 25px;
    margin-bottom: 30px;
  }
  > div:nth-child(3n) {
    margin-right: 0;
  }
`;

const Home = () => {
  const [stampbookData, setStampbookData] = useState();
  const [sort, setSort] = useState();

  useEffect(() => {
    if (window.sessionStorage.getItem('userId')) {
      boogi
        .get(
          `/boogimon/stampbook/stampbook.jsp?command=list&userId=${window.sessionStorage.getItem(
            'userId'
          )}`
        )
        .then((response) => {
          setStampbookData(response.data);
          console.log(
            '로그인한 사용자 Home.js에서 stampbook list 데이터 가져오기 성공'
          );
        });
    } else {
      boogi
        .get(`/boogimon/stampbook/stampbook.jsp?command=list`)
        .then((response) => {
          setStampbookData(response.data);
          console.log(
            '로그인 하지 않은 사용자 Home.js에서 stampbook list 데이터 가져오기 성공'
          );
        });
    }
  }, []);

  return (
    <div>
      <Header />

      <Wrap>
        <Sort
          onChange={(e) => {
            if (e.target.value === 'new') {
              console.log('sort() new');
            } else if (e.target.value === 'popular') {
              console.log('sort() popular');
            } else if (e.target.value === 'abc') {
              console.log('sort() abc');
            }
          }}
        >
          <option value='new' selected>
            최신순
          </option>
          <option value='popular'>인기순</option>
          <option value='abc'>가나다순</option>
        </Sort>

        <StampBookBox>
          {stampbookData?.stampbookList?.map((book, i) => {
            return (
              <StampBook
                stampbookid={book.stampbookId}
                islike={book.isLike}
                likecount={book.likeCount}
                title={book.title}
                stamplist={book.stampList}
                key={i}
              />
            );
          })}
        </StampBookBox>
      </Wrap>
    </div>
  );
};

export default Home;
