import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --color-smoke-100: #F6F6F4;
    --color-smoke-200: #DADAD2;
    --color-smoke-300: #BFBFB0;
    --color-smoke-400: #A3A38F;
    --color-smoke-500: #87876E;
    --color-smoke-600: #656553;
    --color-smoke-700: #434337;
    --color-smoke-800: #22221C;
    --color-smoke-900: #0B0B09;

    --color-grey-100: #FFFFFF; 
    --color-grey-200: #EBEBEB;
    --color-grey-300: #CCCCCC;
    --color-grey-400: #ADADAD;
    --color-grey-500: #8F8F8F;
    --color-grey-600: #707070;
    --color-grey-700: #525252;
    --color-grey-800: #333333; 
    --color-grey-900: #141414;

    --color-brown-100: #FFFFFF; 
    --color-brown-200: #E0DCD8; 
    --color-brown-300: #C9C2BB;
    --color-brown-400: #ADA399;
    --color-brown-500: #928577;
    --color-brown-600: #71665B;
    --color-brown-700: #4F4740;
    --color-brown-800: #2D2925; 
    --color-brown-900: #0B0A09;

    --color-salmon-100: #F1E9E5; 
    --color-salmon-200: #DBC7BD; 
    --color-salmon-300: #C6A695;
    --color-salmon-400: #B28069;
    --color-salmon-500: #94634C;
    --color-salmon-600: #6C4837;
    --color-salmon-700: #442D22;
    --color-salmon-800: #1B120E; 
    --color-salmon-900: #1B120E;

    --color-red-100: #FFFFFF; 
    --color-red-200: #FDEDED; 
    --color-red-300: #F7B6B6;
    --color-red-400: #F17E7E;
    --color-red-500: #EB4747;
    --color-red-600: #DC1818;
    --color-red-700: #A51212;
    --color-red-800: #6E0C0C;
    --color-red-900: #370606;

    --color-sky-100: #EFF8FF;
    --color-sky-200: #E3F1FF;
    --color-sky-300: #D6E9FF;
    --color-sky-400: #C9E2FF;
    --color-sky-500: #BCDAFF;
    --color-sky-600: #AFD3FF;
    --color-sky-700: #A2CBFF;
    --color-sky-800: #95C4FF;
    --color-sky-900: #88BCFF;

    --color-blue-100: #8F9EE3; 
    --color-blue-200: #7B8DD8;
    --color-blue-300: #687CCD;
    --color-blue-400: #556BC2;
    --color-blue-500: #426ABA;
    --color-blue-600: #3059AF;
    --color-blue-700: #1D48A4;
    --color-blue-800: #0A3799;
    --color-blue-900: #00268F;

    --color-dark-900: #030C2C;   

    --color-grey-100: #E7EDF2;
    --color-grey-200: #DDE5EB;
    --color-grey-300: #D3DDE4;
    --color-grey-400: #BCC9D5; 
    --color-grey-500: #AAB7C3;
    --color-grey-600: #98A5B1;
    --color-grey-700: #86939F;
    --color-grey-800: #747F8D;
    --color-grey-900: #616C7A;

    --color-orange-100: #FFE0B2;
    --color-orange-200: #FFCC80;
    --color-orange-300: #FFB74D;  
    --color-orange-400: #FF9D00;    
    --color-orange-500: #FF9800;
    --color-orange-600: #FB8C00;
    --color-orange-700: #F57C00;
    --color-orange-800: #EF6C00;
    --color-orange-900: #E65100;

    --color-yellow-100: #FFFFF0;   /* Very light yellow */
    --color-yellow-200: #FFFDE7;   /* Light yellow */
    --color-yellow-300: #FFF9C4;   /* Soft yellow */
    --color-yellow-400: #FFF59D;   /* Original color */
    --color-yellow-500: #FFEE58;   /* Main yellow */
    --color-yellow-600: #FFE451;   /* Darker yellow */
    --color-yellow-700: #FFD54F;   /* Deep yellow */
    --color-yellow-800: #FFCA28;   /* Intense yellow */
    --color-yellow-900: #FFC107;   /* Strong yellow */
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Animation for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  font-family: Verdana, Helvetica, sans-serif;
  color: var(--color-dark-100);
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

button, a, span, label {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Standard */
}




`;

export default GlobalStyles;
