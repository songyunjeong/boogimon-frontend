import styled from 'styled-components';
import Stamp from './Stamp';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StampBoardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 410px;
  height: 500px;
  background-color: var(--gray1);
  border-radius: 10px;
  padding: 25px;
  box-sizing: border-box;
  overflow: hidden;
  > div:nth-child(3n) {
    margin-right: 0;
  }
`;

const StampBoard = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/boogimon/stampbook/stampbook.jsp?stampbookId=${props.id}`
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <StampBoardBox>
      {data?.stampbook.stampList.map((stamp, i) => {
        return (
          <Stamp
            imgsrc={stamp.thumbnail}
            imgalt={stamp.placeName + ' 이미지'}
            title={stamp.placeName}
            key={i}
            $small
          />
        );
      })}
    </StampBoardBox>
  );
};

export default StampBoard;
