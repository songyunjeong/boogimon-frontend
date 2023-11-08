import styled from 'styled-components';
import Header from '../Components/Header';
import Stamp from '../Components/Stamp';
import { useEffect, useState } from 'react';
import boogi from '../boogi';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1280px;
  background-color: var(--gray1);
  border-radius: 12px;
  padding: 60px 0 20px 75px;
  box-sizing: border-box;
  margin: 50px auto;
  > div:nth-child(6n) {
    margin-right: 0px;
  }
`;

const BoogiBook = () => {
  const [data, setData] = useState();

  useEffect(() => {
    boogi
      .get(`/boogimon/place.jsp?command=boogibook&userId=red@google.com`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <div>
      <Header />

      <Wrap>
        {data?.boogiBook.map((stamp, i) => {
          return (
            <Stamp
              src={stamp.thumbnail}
              alt={stamp.name + ' 이미지'}
              title={stamp.name}
              lastvisitdate={stamp.lastVisitDate}
              key={i}
            />
          );
        })}
      </Wrap>
    </div>
  );
};

export default BoogiBook;
