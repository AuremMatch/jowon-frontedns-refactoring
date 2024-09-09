import "./App.css";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Header/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./context/LoginContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigation />
        <main>
          <Outlet /> {/* 자식 라우트를 여기서 렌더링 */}
        </main>
        <Footer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
