import React, { useState } from "react";
import { logo } from "../assets";
import { CSpinner } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setArticle } from "../state";


const NewsBox = ({article}) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const stateArticle = { ...article };

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const openArticle = () => {
    dispatch(setArticle(stateArticle));
    navigate(`/articles/${article.source.id}`);
  };
  return (
    <div
      onClick={openArticle}
      className="w-96 h-60 bg-[#ffffff00] pt-10 cursor-pointer text-black"
    >
      <div className="relative">
        <div className="font-mono z-1 w-full h-full absolute">
          <h4 className="text-white absolute top-0 left-0 bg-[rgba(0,0,0,0.8)]">
            {article.title}
          </h4>
        </div>
        <div>
          <div className="w-full h-full flex justify-center">
            {isLoading && <CSpinner className="mt-20" color="warning" />}
          </div>
          {article.urlToImage === null ? (
            <img
              className="w-full"
              src={logo}
              alt="https://liamkillingback.com/assets/Logo-03562d78.png"
              style={{ display: isLoading ? "none" : "block" }}
              onLoad={handleImageLoad}
            />
          ) : (
            <img
              src={article.urlToImage}
              alt="https://liamkillingback.com/assets/Logo-03562d78.png"
              style={{ display: isLoading ? "none" : "block" }}
              onLoad={handleImageLoad}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsBox;
