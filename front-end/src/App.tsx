import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/globalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./ui/AppLayout";
import AddPage from "./pages/AddPage";
import SearchPage from "./pages/SearchPage";
import RecipePage from "./pages/RecipePage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ResultsPage from "./pages/ResultsPage";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<HomePage />} />
          <Route element={<AppLayout />}>
            <Route path="add" element={<AddPage />} />
            <Route element={<SearchPage />}>
              <Route path="search" element={<ResultsPage />} />
            </Route>
            <Route path="search/:id" element={<RecipePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={10}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "var(--color-red-500)",
              secondary: "var(--color-grey-100)",
            },
          },
          style: {
            fontSize: "1.3rem",
            maxWidth: "300px",
            padding: "1rem 2rem",
            border: "2px solid var(--color-grey-200)",
            backgroundColor: "var(--color-brown-100)",
            color: "var(--color-brown-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
