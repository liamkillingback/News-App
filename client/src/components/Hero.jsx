import { useEffect, useState } from "react";
import { NewsBox } from "./";
import axios from "axios";
import { CSpinner } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

const Hero = () => {
  const [allNewsArticles, setAllNewsArticles] = useState([{}]);
  const URL =
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ec456bddc67d4fb4aa05a42b63eab7df";

  const getArticles = async () => {
    const response = await axios.get(URL);
    setAllNewsArticles(response.data.articles);
  };

  useEffect(() => {
      getArticles();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="w-80 ml-40 bg-[rgba(0,0,0,0.4)] mt-16"></div>
        <div className="pt-16 ml-8 mr-8 h-screen flex flex-wrap gap-20">
          {allNewsArticles.length < 1 ? (
            <CSpinner color="warning" />
          ) : (
            allNewsArticles.map((article, index) => (
              <NewsBox article={article} key={index} />
            ))
          )}
        </div>
      </div>
    </>
  );
};
export default Hero;
