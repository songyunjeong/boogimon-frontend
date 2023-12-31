import avatar from '../images/avatar.png';
import styled from 'styled-components';

const Talk = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid var(--gray1);
  border-radius: 8px;
  margin: 15px 0;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--gray1);
  margin: 20px 30px;
  overflow: hidden;
`;

const Contents = styled.div`
  width: 75%;
  padding: 20px 0;
`;

const Id = styled.div`
  font-size: var(--small);
  font-weight: bold;
  margin-bottom: 10px;
`;

const Date = styled.div`
  font-size: var(--small);
  color: var(--gray4);
  padding: 10px;
`;

const CreatorMsgBox = (props) => {
  return (
    <Talk>
      <Profile>
        <img
          src={props.profileImg ? props.profileImg : avatar}
          alt={props.nickname}
        />
      </Profile>
      <Contents>
        <Id>{props.nickname}</Id>
        <div className='comment_txt'>{props.description}</div>
      </Contents>
      <Date>{props.stampbookRegdate}</Date>
    </Talk>
  );
};

export default CreatorMsgBox;
