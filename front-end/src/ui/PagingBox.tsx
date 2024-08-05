import styled from "styled-components";
import { FlexBox } from "../styles/BaseStyledComponents/FlexBox";
import { createTheme, Pagination, ThemeProvider } from "@mui/material";
import { buttonShadow } from "../styles/optionStyles";

const Container = styled(FlexBox)`
  justify-content: center;
  align-items: center;
`;

export interface PagingBoxProps {
  page: number;
  totPages: number;
  onClickPage: (_e: React.ChangeEvent<unknown>, page: number) => void;
}

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        ul: {
          display: "flex",
          gap: "0.2em",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        icon: {
          fontSize: "1.1rem",
        },
        root: {
          alignItems: "center",
          fontSize: "1.1rem",
          backgroundColor: "var(--color-grey-100)",
          boxShadow: `${buttonShadow.sm_dark}`,
        },
      },
    },
  },
});

export default function PagingBox({
  page,
  onClickPage,
  totPages,
}: PagingBoxProps) {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Pagination
          count={totPages}
          siblingCount={2}
          boundaryCount={1}
          variant="outlined"
          color="standard"
          size="medium"
          showFirstButton
          showLastButton
          hidePrevButton
          hideNextButton
          page={page}
          onChange={onClickPage}
        />
      </ThemeProvider>
    </Container>
  );
}
