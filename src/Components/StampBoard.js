import styled from 'styled-components';
import Stamp from './Stamp';
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

  const goToStampDetail = () =>
    navigate(`/stampDetail`, {
      state: {
        stampbookid: props.stampbookid,
        isstamped: props.isstamped,
        ispick: props.ispick,
        islike: props.islike,
        likecount: props.likecount,
        title: props.title,
        stamplist: props.stamplist,
      },
    });

  return (
    <StampBoardBox onClick={goToStampDetail}>
      {props.stamplist.map((stamp, i) => {
        if (i < 9) {
          return (
            <Stamp
              src={stamp.thumbnail}
              alt={stamp.name + ' 이미지'}
              title={stamp.name}
              isstamped={stamp.isStamped}
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
