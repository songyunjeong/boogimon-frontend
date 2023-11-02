import StampBook from '../Components/StampBook';
import Header from '../Components/Header';
import styled from 'styled-components';

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
    width: calc(100% / 3);
    padding-right: 25px;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
  > div:nth-child(3n) {
    padding-right: 0;
  }
`;

const Home = () => {
  const stampBookList = [
    {
      title: '스탬프북1',
      like: '30',
    },
    {
      title: '스탬프북2',
      like: '22',
    },
    {
      title: '스탬프북3',
      like: '20',
    },
    {
      title: '스탬프북4',
      like: '13',
    },
    {
      title: '스탬프북5',
      like: '5',
    },
  ];

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
          {stampBookList.map((stampBook, i) => {
            return (
              <StampBook
                title={stampBook.title}
                like={StampBook.like}
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
