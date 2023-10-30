import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

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

  /* header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120px;
    box-shadow: 1px 1px 5px var(--gray1);
    padding: 0 50px;
    box-sizing: border-box;
  }

  .logo {
    width: 200px;
  }

  .gnb {
    font-size: var(--small);
    text-align: right;
    padding-bottom: 10px;
  }

  .lnb {
    display: flex;
  }

  .lnb li {
    margin-right: 30px;
  }

  .lnb li:last-child {
    margin-right: 0;
  }

  /* footer */
  footer {
    height: 100px;
  }
`;

export default GlobalStyle;
