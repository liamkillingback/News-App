import { useEffect, useState, useRef } from "react";
import { NewsBox } from "../components";
import axios from "axios";
import { CSpinner } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { genres } from "../constants";
import { search } from "../assets";
const genreList = genres;

const Home = async () => {
  const newsResponse = await axios.get("https://newsdata.io/api/1/news?apikey=pub_2104437f430272936cafee1920eadc565b78b&q=tech&language=en");
  console.log(newsResponse);
  const [allNewsArticles, setAllNewsArticles] = useState([{}]);
  const URL =
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ec456bddc67d4fb4aa05a42b63eab7df";
  const [input, setInput] = useState("");
  const inputRef = useRef();

  const getArticles = async () => {
    const response = await axios.get(URL);
    console.log(response.data.articles);
    setAllNewsArticles(response.data.articles);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const handleSubmit = async (e) => {
    console.log(input)
    e.preventDefault();
    const URL = `https://newsapi.org/v2/everything?q=${input}&pageSize=20&apiKey=ec456bddc67d4fb4aa05a42b63eab7df`;
    const response = await axios.get(URL);
    if (response.data.articles.length > 1) {
      setAllNewsArticles(response.data.articles);
    } else {
      alert("No articles Found");
    }
  };
  const handleGenre = (e) => {
    setInput(e.target.innerHTML);
    handleSubmit(e);
  }
  return (
    <>
      <div className="fixed hidden sm:block z-10 h-screen w-60  bg-[rgba(0,0,0,0.35)] mt-16">
        <div className="flex flex-col items-center">
          <div className="">
            <form
              onSubmit={handleSubmit}
              className="flex flex-row justify-center items-center"
            >
              <input
                ref={inputRef}
                onChange={(e) => setInput(e.target.value)}
                className="w-4/5 rounded-md pl-1 mr-2"
                placeholder="Search News..."
                type="text"
              />
              <button type="submit">
                <img className="w-5 h-5" src={search} alt="" />
              </button>
            </form>
          </div>
          <ul className="flex flex-col text-[#a09898] text-2xl   font-medium items-center">
            {genreList.map((genre, index) => (
              <li
              onClick={handleGenre}
                className="mt-10 w-full cursor-pointer rounded-md p-1 hover:bg-[rgba(36,38,48,0.73)]"
                key={index}
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-row ml-50 pb-40 justify-center z-0 sm:pl-64">
        <div className="pt-10 pr-2 pl-2 -z-1 flex justify-center flex-wrap gap-6">
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
