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
  const [sort, setSort] = useState('new'); // 기본값을 최신순으로 설정

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
        });
    } else {
      boogi
        .get(`/boogimon/stampbook/stampbook.jsp?command=list`)
        .then((response) => {
          setStampbookData(response.data);
        });
    }
  }, []);

  const sortStampBooks = (books, sortBy) => {
    const sortedBooks = [...books]; // 복사본을 만들어 정렬
    if (sortBy === 'new') {
      // 최신순
      sortedBooks.sort(
        (a, b) => new Date(b.stampbookRegdate) - new Date(a.stampbookRegdate)
      );
    } else if (sortBy === 'popular') {
      // 인기순 (예: likeCount를 기준으로 정렬)
      sortedBooks.sort((a, b) => b.likeCount - a.likeCount);
    } else if (sortBy === 'abc') {
      // 가나다순 (예: title을 기준으로 정렬)
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedBooks;
  };

  // 정렬 변경 핸들러
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
  };

  const sortedStampBooks = sortStampBooks(
    stampbookData?.stampbookList || [],
    sort
  );

  return (
    <div>
      <Header />

      <Wrap>
        <Sort onChange={handleSortChange} value={sort}>
          <option value='new'>최신순</option>
          <option value='popular'>인기순</option>
          <option value='abc'>가나다순</option>
        </Sort>

        <StampBookBox>
          {sortedStampBooks.map((book, i) => (
            <StampBook
              stampbookid={book.stampbookId}
              ispick={book.isPick}
              islike={book.isLike}
              likecount={book.likeCount}
              title={book.title}
              stamplist={book.stampList}
              key={i}
            />
          ))}
        </StampBookBox>
      </Wrap>
    </div>
  );
};

export default Home;
