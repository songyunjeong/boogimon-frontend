import StampBook from '../Components/StampBook';
import Header from '../Components/Header';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(
        'http://localhost:8080/boogimon/stampbook/stampbook.jsp?command=list'
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <div>
      <Header />

      <Wrap>
        <Sort>
          <option>인기순</option>
          <option>최신순</option>
          <option>가나다순</option>
        </Sort>

        <StampBookBox>
          {data?.stampbookList.map((book, i) => {
            return (
              <StampBook
                id={book.stampbookId}
                nickname={book.nickname}
                description={book.description}
                regdate={book.stampbookRegdate}
                likeCount={book.likeCount}
                title={book.title}
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
