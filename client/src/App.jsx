import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat/:user" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
