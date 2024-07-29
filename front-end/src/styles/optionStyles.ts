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

export const boxShadow = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.5)",
  md: "0 4px 6px rgba(0, 0, 0, 0.5)",
  lg: "0 5px 15px rgba(0, 0, 0, 0.5)",
  xl: "0 10px 24px rgba(0, 0, 0, 0.5)",
  xxl: "0 15px 35px rgba(0, 0, 0, 0.5)",
};

export const x2boxShadow = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  md: "0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)",
  lg: "0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)",
  xl: "0 15px 25px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.02)",
  xxl: "0 20px 40px rgba(0, 0, 0, 0.2)",
};

export const buttonShadow = {
  smDark:
    "0 1px 3px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(0, 0, 0, 0.1)",
  smLight:
    "0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
  mdDark:
    "0 2px 0 rgba(255, 255, 255, 0.15), inset 0 2px 2px rgba(0, 0, 0, 0.1)",
  mdLight:
    "0 2px 0 rgba(0, 0, 0, 0.2), inset 0 2px 2px rgba(255, 255, 255, 0.15)",
};
