import "./App.css";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Header/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./context/LoginContext";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          {" "}
          {/* ThemeProvider로 감싸기 */}
          <Navigation />
          <main>
            <Outlet /> {/* 자식 라우트를 렌더링 */}
          </main>
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
