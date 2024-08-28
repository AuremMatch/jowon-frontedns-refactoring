import "./App.css";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Header/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <main>
        <Outlet /> {/* 자식 라우트를 여기서 렌더링 */}
      </main>
    </QueryClientProvider>
  );
}

export default App;
