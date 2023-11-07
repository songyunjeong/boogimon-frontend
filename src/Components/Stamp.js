import styled, { css } from 'styled-components';

const StampBox = styled.div`
  width: ${(props) => (props.$small ? '110px' : '150px')};
  margin-right: ${(props) => (props.$small ? '15px' : '45px')};
  margin-bottom: ${(props) => (props.$small ? '15px' : '30px')};
`;

const StampImgBox = styled.div`
  background-color: var(--gray3);
  width: ${(props) => (props.$small ? '110px' : '150px')};
  height: ${(props) => (props.$small ? '110px' : '150px')};
  border-radius: 50%;
  margin-bottom: 10px;
  overflow: hidden;
  > img {
    width: ${(props) => (props.$small ? '150px' : '200px')};
  }
`;

const StampTitle = styled.div`
  text-align: center;
  ${(props) =>
    props.$small &&
    css`
      font-size: var(--small);
    `};
`;

const Stamp = (props) => {
  return (
    <StampBox {...props}>
      <StampImgBox {...props}>
        <img src={props.imgsrc} alt={props.imgalt} />
      </StampImgBox>
      <StampTitle {...props}>
        {props.$small && props.title.length > 8
          ? props.title.slice(0, 6) + '...'
          : props.title}
      </StampTitle>
    </StampBox>
  );
};

export default Stamp;
