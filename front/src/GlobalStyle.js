import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  * {
    font-family: "Pretendard", sans-serif;
    line-height: 1.5;
  }
`;

export default GlobalStyle;
