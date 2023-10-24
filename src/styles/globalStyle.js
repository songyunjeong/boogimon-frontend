import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

  * {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  li {
    list-style: none;
  }

  a {
    color: black;
    text-decoration: none;
    :hover {
      color: black;
    }
  }

  /* header */
  
  /* footer */ 
`;

export default GlobalStyle;
