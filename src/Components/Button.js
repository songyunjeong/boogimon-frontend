import styled, { css } from 'styled-components';

const BasicButton = styled.button`
  display: inline-block;
  border: 2px solid var(--gray2);
  border-radius: 4px;
  background-color: #ffffff;
  padding: 8px 25px;
  box-sizing: border-box;
  ${(props) =>
    props.marginright &&
    css`
      margin-right: 5px;
    `};
  &:hover {
    cursor: pointer;
    background-color: var(--yellow);
    border: 2px solid var(--light-blue);
  }
`;

const Button = (props) => {
  return <BasicButton {...props}>{props.children}</BasicButton>;
};

export default Button;
