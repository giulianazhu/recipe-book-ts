const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}rem)`;

export const media = {
  xxs: customMediaQuery(23), // 375px phone
  xs: customMediaQuery(26), // 425px phone
  sm: customMediaQuery(40), // 640px phone
  md: customMediaQuery(52), // 768px tablets
  lg: customMediaQuery(64), // 1024px laptops
  xl: customMediaQuery(90), // 1440px monitors
  xxl: customMediaQuery(160), // 2560px big screens
};
