import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  &:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --danger-color: #ff0000;
    --success-color: #008000;
    --today-color: #ffff00;
    --yesterday-color: #ffffbb;
    --tooltip-color: #ffffff;
    --gray-color: #808080;
    // --font-style: "Comic Sans MS", cursive, sans-serif;
    --font-style: Arial, sans-serif;
  }

  html {
    background-color: var(--secondary-color);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: var(--font-style);
  }

  &:focus {
    outline: none;
  }

  label, li, h1, span, strong, a, p {
    color: var(--primary-color);
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  hr {
    border: 0.0625rem solid var(--primary-color);
    background-color: var(--primary-color);
  }

  ::placeholder {
    color: var(--primary-color);
    opacity: 1;
  }

  body {
    font-size: 1rem;
    line-height: 1.6;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /*#region Google Charts (SVG) */
  .google-visualization-tooltip path {
    fill: var(--tooltip-color);
  }

  .google-visualization-tooltip > g > text {
    fill: #000000;
  }

  svg > rect {
    fill: var(--secondary-color);
  }

  g > text {
    stroke: var(--secondary-color);
    fill: var(--primary-color);
  }

  g > g > rect {
    fill: #999999;
  }

  g > g > circle[r='6.5'] {
    fill: var(--tooltip-color);
  }

  /* #endregion */

  /*#region Calendar */


  /* #endregion */
`;

export default GlobalStyle;
