import { useEffect, useState, useRef } from "react";
import { NewsBox } from "../components";
import axios from "axios";
import { CSpinner } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { genres } from "../constants";
import { search } from "../assets";
const genreList = genres;
import { useSelector } from "react-redux";

const Home = () => {
  const ggg = useSelector((state) => state.article);
  console.log(ggg);
  const [allNewsArticles, setAllNewsArticles] = useState([{}]);
  const [input, setInput] = useState("tech");
  const URL = `https://newsapi.org/v2/everything?q=${input}&sortBy=popularity&pageSize=20&apiKey=ec456bddc67d4fb4aa05a42b63eab7df`;
  const inputRef = useRef();

  const getArticles = async () => {
    const response = await axios.get(URL);
    if (response.data.articles.length > 1) {
      setAllNewsArticles(response.data.articles);
      console.log(response.data.articles);
    } else {
      alert("No articles Found");
    }
  };

  useEffect(() => {
    getArticles(input);
  }, [input]);

  const handleInput = (e) => {
    console.log(inputRef);
    if (e.key === "Enter") {
      setInput(e.target.value);
      e.target.value = "";
    } else if (e.target.nodeName === "IMG") {
      setInput(inputRef.current.value);
    }
  };
  return (
    <>
      <div className="fixed hidden sm:block z-10 h-screen w-60  bg-[rgba(0,0,0,0.6)] mt-16">
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <input
              ref={inputRef}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInput}
              className="w-4/5 rounded-md pl-1 mr-2"
              placeholder="Search News..."
              type="text"
            />
            <button className="" onClick={handleInput}>
              <img className="w-10" src={search} alt="" />
            </button>
          </div>
          <ul className="flex flex-col text-[#a09898] text-2xl   font-medium items-center">
            {genreList.map((genre, index) => (
              <li
                onClick={() => setInput(genre)}
                className="mt-10 w-full cursor-pointer rounded-md p-1 hover:bg-[rgba(36,38,48,0.73)]"
                key={index}
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-row ml-50 pb-10 max-h-screen justify-center z-0 sm:pl-64">
        <div className="pt-16 pr-2 pl-2 -z-1 flex justify-center overflow-y-scroll scrollbar-hide flex-wrap gap-6">
          <div className="flex flex-row justify-center sm:hidden pt-16 w-4/5">
            <input
              ref={inputRef}
              onKeyDown={handleInput}
              className="sm:hidden w-4/5 rounded-md  h-10 text-xl pl-1 mr-2"
              placeholder="Search News..."
              type="text"
            />
            <button className="sm:hidden" onClick={handleInput}>
              <img className="w-10" src={search} alt="" />
            </button>
          </div>
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
export default Home;
