import { Navbar } from "./components";
import { ArticlePage, NewsPage} from "./pages";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<NewsPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />          
        </Routes>
      </BrowserRouter>

    
    </>
  );
}

export default App;
