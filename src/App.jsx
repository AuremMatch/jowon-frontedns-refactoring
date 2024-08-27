import "./App.css";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Header/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Outlet /> {/* 자식 라우트를 여기서 렌더링 */}
      </main>
    </div>
  );
}

export default App;
