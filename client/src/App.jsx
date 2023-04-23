import { useState } from "react";
import { Navbar } from "./components";
import { Home, ArticlePage } from "./pages";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>

    
    </>
  );
}

export default App;
