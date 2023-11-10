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
  const [data, setData] = useState();

  useEffect(() => {
    boogi
      .get(`/boogimon/stampbook/stampbook.jsp?stampbookId=${props.id}`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const navigate = useNavigate();

  const goToStampDetail = () =>
    navigate('/stampDetail', {
      state: {
        id: props.id,
        nickname: props.nickname,
        description: props.description,
        stampbookRegdate: props.stampbookRegdate,
        likeCount: props.likeCount,
        title: props.title,
      },
    });

  return (
    <StampBoardBox onClick={goToStampDetail}>
      {data?.stampbook.stampList.map((stamp, i) => {
        return (
          <Stamp
            src={stamp.thumbnail}
            alt={stamp.placeName + ' 이미지'}
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
