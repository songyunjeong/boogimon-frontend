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

const TalkBox = (props) => {
  return (
    <Talk>
      <Profile>
        <img src={props.profileImg} alt={props.id} />
      </Profile>
      <Contents>
        <Id>{props.id}</Id>
        <div className='comment_txt'>{props.txt}</div>
      </Contents>
      <Date>{props.writeDate}</Date>
    </Talk>
  );
};

export default TalkBox;
