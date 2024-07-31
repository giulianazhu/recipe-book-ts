import { createGlobalStyle } from "styled-components";
import { media } from "./optionStyles";

const GlobalStyles = createGlobalStyle`
:root {
    --color-grey-100: #FFFFFF; 
    --color-grey-200: #EFEFEF;
    --color-grey-300: #CCCCCC;
    --color-grey-400: #ADADAD;
    --color-grey-500: #8F8F8F;
    --color-grey-600: #707070;
    --color-grey-700: #525252;
    --color-grey-800: #333333; 
    --color-grey-900: #141414;

    --color-accent-100: #E6F7F9; /* Very light teal */
--color-accent-200: #CDEFF2; /* Light teal */
--color-accent-300: #B3E6EB; /* Soft teal */
--color-accent-400: #99DDE4; /* Light blue teal */
--color-accent-500: #80D5DD; /* Medium teal */
--color-accent-600: #66CCD6; /* Rich teal */
--color-accent-700: #4DC3CF; /* Deeper teal */
--color-accent-800: #33BAC8; /* Dark teal */
--color-accent-900: #1AB1C1; /* Very dark teal */

    --color-brown-100: #FFFFFF; 
    --color-brown-200: #E0DCD8; 
    --color-brown-300: #C9C2BB; // like 
    --color-brown-400: #ADA399;
    --color-brown-500: #928577;
    --color-brown-600: #71665B;
    --color-brown-700: #4F4740;
    --color-brown-800: #2D2925; //text color 
    --color-brown-900: #0B0A09;

    --color-golden-100: #FAF8E6;
--color-golden-200: #E9E3B3;
--color-golden-300: #D9CE80; // like
--color-golden-400: #C9B94D;
--color-golden-500: #B9A41A;
--color-golden-600: #A08B00;
--color-golden-700: #7A6A00;
--color-golden-800: #544900; //text color
--color-golden-900: #2E2900;

    --color-beige-000: #fff9f8;
    --color-beige-100: #F9F0E6; /* Very light beige with a hint of warm pink */
    --color-beige-200: #F3E0D1; /* Light beige with a subtle pinkish salmon tone */
    --color-beige-300: #E8C5B4; /* Soft beige with a gentle pink-salmon undertone */
    --color-beige-400: #DDAB9C; /* Warm beige with a balanced pinkish salmon tint */
    --color-beige-500: #D19D8C; /* Medium beige with a muted pinkish warmth */
    --color-beige-600: #B87A6A; /* Richer beige with a more noticeable warm pinkish hue */
    --color-beige-700: #A06652; /* Darker beige with a warm, soft pinkish tone */
    --color-beige-800: #8D4D3B; /* Very dark beige with a warm pinkish undertone */
    --color-beige-900: #8D4D3B; /* Same as 800 for consistency */

    --color-red-100: #FFFFFF; 
    --color-red-200: #FDEDED; 
    --color-red-300: #F7B6B6;
    --color-red-400: #F17E7E;
    --color-red-500: #EB4747;
    --color-red-600: #DC1818;
    --color-red-700: #A51212;
    --color-red-800: #6E0C0C;
    --color-red-900: #370606;
 
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
  color: var(--color-grey-700);
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

button {
  :focus {
    outline: none;
  }
}

nav, main, footer{
 padding-inline: 3rem;
 padding-block: 2rem;
 ${media.md}{
  padding-inline: 2rem;
 }
}

`;

export default GlobalStyles;
