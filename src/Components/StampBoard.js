import styled from 'styled-components';
import Stamp from './Stamp';
import { useEffect, useState } from 'react';
import boogi from '../boogi';
import { useNavigate } from 'react-router-dom';

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
  cursor: pointer;
  > div:nth-child(3n) {
    margin-right: 0;
  }
`;

const StampBoard = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const goToStampDetail = () =>
    navigate(`/stampDetail/${props.stampbookId}`, {
      state: { stampbookId: props.stampbookId, userpick: props.userpick },
    });

  useEffect(() => {
    boogi
      .get(`/boogimon/stampbook/stampbook.jsp?stampbookId=${props.stampbookId}`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <StampBoardBox onClick={goToStampDetail}>
      {data?.stampbook.stampList.map((stamp, i) => {
        if (i < 9) {
          return (
            <Stamp
              src={stamp.thumbnail}
              alt={stamp.placeName + ' 이미지'}
              title={stamp.placeName}
              key={i}
              $small
            />
          );
        }
      })}
    </StampBoardBox>
  );
};

export default StampBoard;
