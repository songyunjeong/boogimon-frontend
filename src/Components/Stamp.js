import styled from 'styled-components';

const StampBox = styled.div`
  width: 150px;
  margin-right: 45px;
  margin-bottom: 30px;
`;

const StampImgBox = styled.div`
  background-color: var(--gray3);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
  overflow: hidden;
  > img {
    width: 200px;
  }
`;

const StampTitle = styled.div`
  text-align: center;
`;

const Stamp = (props) => {
  return (
    <StampBox>
      <StampImgBox>
        <img src={props.imgSrc} alt={props.imgAlt} />
      </StampImgBox>
      <StampTitle>{props.title}</StampTitle>
    </StampBox>
  );
};

export default Stamp;
