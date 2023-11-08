import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    /* color */
    --magenta: #e6007e;
    --blue: #0e4194;
    --yellow: #ffcc03;
    --light-blue: #0188cc;
    --gray1: #eeeeee;
    --gray2: #d9d9d9;
    --gray3: #b5b5b5;
    --gray4: #999999;
    --black: #000000;

    /* font-size */
    --big: 24px;
    --regular: 16px;
    --small: 14px;
  }

  * {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: var(--regular);
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
`;

export default GlobalStyle;
